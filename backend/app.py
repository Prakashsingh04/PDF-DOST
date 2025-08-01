from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pdfplumber

from utils.retriever import Retriever
from utils.text_splitter import split_text
from utils.embedder import Embedder
from utils.llm_helper import AnswerGenerator

app = Flask(__name__)
CORS(app)

# Folder to store uploaded PDFs
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ----------- Utility: Extract text from PDF ------------
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

# ----------- Upload Route ------------
@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully', 'filename': file.filename}), 200

    return jsonify({'error': 'Invalid file format (PDF only)'}), 400

# ----------- Extract & Chunk Route ------------
@app.route('/extract', methods=['POST'])
def extract_and_chunk():
    try:
        data = request.get_json()
        filename = data.get("filename")
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        text = extract_text_from_pdf(file_path)
        chunks = split_text(text)

        return jsonify({"chunks": chunks})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------- Embedding Route ------------
@app.route('/embed', methods=['POST'])
def generate_embeddings():
    try:
        data = request.get_json()
        chunks = data.get("chunks", [])

        if not chunks:
            return jsonify({"error": "Chunks not provided"}), 400

        embedder = Embedder()
        embeddings = embedder.get_embeddings(chunks)

        return jsonify({"embeddings": embeddings.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------------------
#-------ask route---------------
@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        filename = data.get("filename")
        question = data.get("question")

        if not filename or not question:
            return jsonify({"error": "Filename and question are required"}), 400

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        # Extract, chunk, embed
        text = extract_text_from_pdf(file_path)
        chunks = split_text(text)
        embedder = Embedder()
        embeddings = embedder.get_embeddings(chunks)

        # Retrieve top relevant chunks
        retriever = Retriever(embedder, chunks, embeddings)
        top_chunks = retriever.retrieve(question, top_k=3)

        # Generate final answer using LLM
        context = "\n".join(top_chunks)
        answer_generator = AnswerGenerator()
        final_answer = answer_generator.generate_answer(question, context)

        return jsonify({
            "question": question,
            "relevant_chunks": top_chunks,
            "answer": final_answer
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
