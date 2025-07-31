from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pdfplumber

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Path to store uploaded PDFs
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

@app.route('/extract', methods=['POST'])
def extract_text():
    data = request.get_json()
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'Filename not provided'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    text = ''
    try:
        with pdfplumber.open(filepath) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'
    except Exception as e:
        return jsonify({'error': f'Failed to read PDF: {str(e)}'}), 500

    return jsonify({'text': text.strip()})


if __name__ == '__main__':
    app.run(debug=True)