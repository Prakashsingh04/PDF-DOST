// src/services/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000";

// Upload PDF
export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Extract chunks
export const extractChunks = async (filename) => {
  const res = await axios.post(`${API_BASE}/extract`, { filename });
  return res.data;
};

// Ask a question
export const askQuestion = async (filename, question) => {
  const res = await axios.post(`${API_BASE}/ask`, { filename, question });
  return res.data;
};
