import React from "react";

const Preview = ({ onPreviewToggle }) => {
  return (
    <button
      onClick={onPreviewToggle}
      className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 text-sm whitespace-nowrap"
    >
      Toggle Preview
    </button>
  );
};

export default Preview;
