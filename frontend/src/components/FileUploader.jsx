import React, { useRef } from "react";

const FileUploader = ({ onFileSelect }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div className="p-4 border rounded">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload PDF
      </button>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
