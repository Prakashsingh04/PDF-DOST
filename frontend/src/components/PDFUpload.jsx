import React, { useState } from 'react';
import axios from 'axios';

function PDFUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      const uploadRes = await axios.post('http://localhost:5000/upload', formData);
      const filename = uploadRes.data.filename;

      setStatus('Extracting...');
      await axios.post('http://localhost:5000/extract', { filename });

      setStatus('Embedded successfully!');
      onUploadSuccess(filename);
    } catch (err) {
      setStatus('Failed to upload or extract.');
      console.error(err);
    }
  };

  return (
    <div className="upload-box">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Extract</button>
      <p>{status}</p>
    </div>
  );
}

export default PDFUpload;
