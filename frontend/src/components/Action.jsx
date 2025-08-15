import React from "react";
import Upload from "./sub_components/Upload";
import Chat from "./sub_components/Chat";
import Preview from "./sub_components/Preview";

const Action = ({ onFileSelect, onFilename, onSendMessage, onPreviewToggle }) => {
  return (
    <div className="w-full bg-gray-900 bg-opacity-90 backdrop-blur-md border-t border-gray-700 p-3 flex justify-center items-center sticky bottom-0 z-50 shadow-inner">
      <div className="flex items-center gap-3 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <Upload onFileSelect={onFileSelect} onFilename={onFilename} compact />
        </div>
        <div className="flex-grow">
          <Chat onSendMessage={onSendMessage} />
        </div>
        <div className="flex-shrink-0 ml-4">
          <Preview onPreviewToggle={onPreviewToggle} />
        </div>
      </div>
    </div>
  );
};

export default Action;
