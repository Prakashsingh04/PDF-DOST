import React, { useState } from "react";
import QuestionPanel from "./components/QuestionPanel";
import PDFViewer from "./components/PDFViewer";

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState("");

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">
      {/* Left side: Q&A panel */}
      <div className="w-1/2 flex flex-col bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          PDF Q&A
        </h1>
        <QuestionPanel
          setPdfFile={setPdfFile}
          setUploadedFilename={setUploadedFilename}
        />
      </div>

      {/* Right side: PDF Viewer */}
      <div className="w-1/2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b text-gray-700">
          PDF Preview
        </h2>
        <div className="flex-1 overflow-auto p-4">
          {pdfFile ? (
            <PDFViewer file={pdfFile} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No PDF selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
