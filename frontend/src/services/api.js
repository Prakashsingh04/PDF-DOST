// src/services/api.js
import axios from "axios";

// Vite uses import.meta.env and requires VITE_ prefix for custom vars
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5137";

// Upload PDF
export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const extractChunks = async (filename) => {
  const res = await axios.post(`${API_BASE}/extract`, { filename });
  return res.data;
};

export const askQuestion = async (filename, question) => {
  const res = await axios.post(`${API_BASE}/ask`, { filename, question });
  return res.data;
};
