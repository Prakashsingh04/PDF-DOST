import React, { useState } from "react";
import { uploadPDF, extractChunks } from "../../services/api";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid"; // needs @heroicons/react

const Upload = ({ onFilename, onFileSelect, compact = false }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const { filename } = await uploadPDF(file);
      onFilename(filename);
      onFileSelect(`http://localhost:5000/static/uploads/${filename}`);
      await extractChunks(filename);
    } catch {
      console.error("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <label
        className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md cursor-pointer flex items-center justify-center"
        title="Upload PDF"
      >
        <ArrowUpTrayIcon className="w-5 h-5 text-white" />
        <input
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
      <label className="block text-sm font-medium">Upload PDF</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={loading}
        className="block w-full border rounded-md p-2 text-sm"
      />
    </div>
  );
};

export default Upload;
