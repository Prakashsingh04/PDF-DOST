import React from "react";
import ChatHeader from "./sub_components/ChatHeader";
import ChatOutput from "./sub_components/ChatOutput";

const ChatMessage = ({ messages = [] }) => (
  <div className="flex flex-col w-full md:w-1/2 h-full border border-gray-300 rounded-md shadow-sm bg-white">
    <ChatHeader title="Ask questions about your PDF" />
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length > 0 ? (
        <ChatOutput messages={messages} />
      ) : (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      )}
    </div>
  </div>
);

export default ChatMessage;
