import React from "react";

const Preview = ({ onPreviewToggle }) => (
  <button
    onClick={onPreviewToggle}
    className="bg-green-600 hover:bg-green-500 active:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-colors duration-200"
    title="Toggle PDF Preview"
  >
    Preview
  </button>
);

export default Preview;
