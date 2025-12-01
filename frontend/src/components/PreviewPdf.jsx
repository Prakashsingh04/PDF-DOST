import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PreviewPdf = ({ file, filename }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.3);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  if (!file) {
    return (
      <div className="flex flex-col flex-1 h-[350px] md:h-[500px] min-w-[260px] bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 items-center justify-center text-gray-400">
        No PDF selected
      </div>
    );
  }

  // Truncate filename if too long
  const displayName =
    filename
      ? filename.length > 40
        ? filename.slice(0, 38) + "..."
        : filename
      : "PDF Preview";

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 2));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  return (
    <div className="flex flex-col flex-1 h-[350px] md:h-[500px] min-w-[260px] bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 p-2 overflow-y-auto relative">
      <div className="flex items-center justify-between mb-2">
        <h2
          className="text-lg font-semibold text-gray-100 truncate"
          title={filename || "PDF Preview"}
        >
          {displayName}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="bg-gray-800 hover:bg-gray-700 text-white px-2 rounded shadow text-lg"
            title="Zoom Out"
          >
            &minus;
          </button>
          <button
            onClick={handleZoomIn}
            className="bg-gray-800 hover:bg-gray-700 text-white px-2 rounded shadow text-lg"
            title="Zoom In"
          >
            +
          </button>
        </div>
      </div>
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
            scale={scale}
            className="mb-4 shadow"
          />
        ))}
      </Document>
    </div>
  );
};

export default PreviewPdf;
