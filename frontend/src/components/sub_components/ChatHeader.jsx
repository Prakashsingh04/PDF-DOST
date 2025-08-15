import React from "react";

const ChatHeader = ({ title }) => (
  <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-4 py-2 border-b border-gray-700">
    <h2 className="text-lg font-bold text-yellow-300 drop-shadow select-none tracking-wide">
      {title}
    </h2>
  </div>
);

export default ChatHeader;
