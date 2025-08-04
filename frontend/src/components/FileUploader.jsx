// frontend/src/components/FileUploader.jsx
import { useState } from 'react';
import api from '../utils/api.js';

function FileUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await api.post('/upload', formData);
      await api.get('/extract');
      await api.get('/embed');
      alert("File processed successfully!");
      onUploadSuccess(); // trigger QA display
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to process PDF.");
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Process</button>
    </div>
  );
}

export default FileUploader;
