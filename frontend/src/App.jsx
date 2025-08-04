import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF first!");

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      const uploadRes = await axios.post('http://localhost:5000/upload', formData);
      const fname = uploadRes.data.filename;
      setFilename(fname);

      setStatus('Extracting...');
      await axios.post('http://localhost:5000/extract', { filename: fname });

      setStatus('PDF embedded successfully!');
    } catch (err) {
      setStatus('Upload/Extract failed.');
      console.error(err);
    }
  };

  const askQuestion = async () => {
    if (!filename) return alert("Upload a PDF first!");
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/ask', { filename, question });
      setAnswer(response.data.answer);
    } catch (err) {
      setAnswer('Error: Could not get a response from backend.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="heading">PDF-Dost 📄🤝</h1>

      <div className="upload-section">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload & Extract</button>
        <p className="status">{status}</p>
      </div>

      {filename && (
        <div className="question-section">
          <input
            type="text"
            placeholder="Ask your PDF something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      )}

      {loading && <p className="loading">Loading...</p>}

      {answer && (
        <div className="answer-section">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
