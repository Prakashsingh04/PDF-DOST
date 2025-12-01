import React, { useState } from "react";
import { uploadPDF, extractChunks } from "../../services/api";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

// Support either VITE_API_BASE (current) or VITE_API_URL (fallback)
const API_BASE =
  import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || "http://localhost:5000";
const Upload = ({ onFilename, onFileSelect, compact = false }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const { filename, url } = await uploadPDF(file);
      onFilename(filename);
      // Prefer URL from backend, else construct from API base
      onFileSelect(url || `${API_BASE}/uploads/${filename}`);
      await extractChunks(filename);
    } catch (err) {
      console.error("❌ Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <label
        htmlFor="fileUpload"
        className="bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 p-2 rounded-lg cursor-pointer flex items-center justify-center shadow-lg transition-colors duration-200"
        title="Upload PDF"
      >
        <ArrowUpTrayIcon className="w-6 h-6 text-white" />
        <input
          id="fileUpload"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          disabled={loading}
          className="hidden"
        />
      </label>
    );
  }

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-1 text-gray-300">Upload PDF</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={loading}
        className="block w-full border border-gray-700 rounded-md p-2 text-sm bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-yellow-400"
      />
      {loading && (
        <p className="text-xs text-yellow-400 mt-1 animate-pulse">Uploading...</p>
      )}
    </div>
  );
};

export default Upload;
