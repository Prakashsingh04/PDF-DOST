import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Vite-safe worker import
const workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PreviewPdf = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No PDF selected
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full border border-gray-300 rounded-md shadow-sm p-2 overflow-y-auto bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">PDF Preview</h2>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p className="text-gray-400">Loading PDF...</p>}
        error={<p className="text-red-500">Failed to load PDF</p>}
      >
        {Array.from(new Array(numPages), (_, idx) => (
          <Page
            key={`page_${idx + 1}`}
            pageNumber={idx + 1}
            width={500}
            className="mb-4 shadow-md"
          />
        ))}
      </Document>
    </div>
  );
};

export default PreviewPdf;
