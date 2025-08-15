import React from "react";
import ChatHeader from "./sub_components/ChatHeader";
import ChatOutput from "./sub_components/ChatOutput";

const ChatMessage = ({ messages = [] }) => (
  <div className="flex flex-col flex-1 h-[350px] md:h-[500px] min-w-[260px] bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 overflow-hidden">
    <ChatHeader title="Ask questions about your PDF" />
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length > 0 ? (
        <ChatOutput messages={messages} />
      ) : (
        <p className="text-gray-400 text-sm">No messages yet.</p>
      )}
    </div>
  </div>
);

export default ChatMessage;
