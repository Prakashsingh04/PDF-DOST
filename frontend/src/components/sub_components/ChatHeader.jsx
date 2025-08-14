import React from "react";
const ChatHeader = ({ title }) => (
  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
  </div>
);
export default ChatHeader;
