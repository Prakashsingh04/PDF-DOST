import React from "react";
import Upload from "./sub_components/Upload";
import Chat from "./sub_components/Chat";
import Preview from "./sub_components/Preview";

const Action = ({ onFileSelect, onFilename, onSendMessage, onPreviewToggle }) => {
  return (
    <div className="w-full border-t border-gray-300 p-4 flex items-center gap-4 bg-white shadow-inner">
      {/* Chat bar wide: 75% */}
      <div className="flex-[3]">
        <Chat onSendMessage={onSendMessage} />
      </div>

      {/* Upload icon/button small: 10% */}
      <div className="flex-[0.4] flex justify-center">
        <Upload onFileSelect={onFileSelect} onFilename={onFilename} compact />
      </div>

      {/* Preview small: 10% */}
      <div className="flex-[0.4] flex justify-center">
        <Preview onPreviewToggle={onPreviewToggle} />
      </div>

      {/* Empty space ~5% */}
      <div className="flex-[0.2]" />
    </div>
  );
};

export default Action;
