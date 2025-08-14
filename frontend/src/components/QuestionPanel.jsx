import React, { useState } from "react";

const QuestionPanel = ({ setPdfFile, setUploadedFilename }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilenameLocal, setUploadedFilenameLocal] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setAnswer(""); // clear previous answer
    setUploadedFilenameLocal("");
  };

  // Upload & Preview button
  const handleUploadAndPreview = async () => {
    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedFilenameLocal(data.filename);
        setUploadedFilename(data.filename); // pass to App
        setPdfFile(selectedFile); // update PDFViewer
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error.");
    } finally {
      setLoading(false);
    }
  };

  // Handle question submission
  const handleAsk = async () => {
    if (!uploadedFilenameLocal) {
      alert("Please upload a PDF first.");
      return;
    }
    if (!question) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: uploadedFilenameLocal, question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No answer found.");
    } catch (err) {
      console.error(err);
      setAnswer("Error while processing request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* File selection */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
        className="mb-2"
      />

      {/* Upload & Preview button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        onClick={handleUploadAndPreview}
        disabled={loading || !selectedFile}
      >
        {loading ? "Uploading..." : "Upload & Preview"}
      </button>

      {/* Show uploaded filename */}
      {uploadedFilenameLocal && (
        <div className="mb-2 text-sm text-gray-700">
          Uploaded: <strong>{uploadedFilenameLocal}</strong>
        </div>
      )}

      {/* Question textarea */}
      <textarea
        className="border p-2 mb-2 w-full"
        rows="3"
        placeholder="Ask a question about the PDF..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Ask button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAsk}
        disabled={loading || !uploadedFilenameLocal}
      >
        {loading ? "Processing..." : "Ask"}
      </button>

      {/* Show answer */}
      {answer && (
        <div className="mt-4 border-t pt-2">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
