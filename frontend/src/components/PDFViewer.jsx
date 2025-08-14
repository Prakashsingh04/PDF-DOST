import React from "react";

const PDFViewer = ({ file }) => {
  if (!file) {
    return <div className="p-4">No PDF selected</div>;
  }

  const fileURL = URL.createObjectURL(file);

  return (
    <iframe
      src={fileURL}
      title="PDF Viewer"
      width="100%"
      height="100%"
      style={{ border: "none" }}
    />
  );
};

export default PDFViewer;
