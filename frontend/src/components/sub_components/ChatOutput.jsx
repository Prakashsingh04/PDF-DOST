import React from "react";

const ChatOutput = ({ messages }) => (
  <div className="flex flex-col gap-3">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`max-w-[80%] p-2 rounded-md text-sm ${
          msg.sender === "user"
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-200 text-gray-800 self-start"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

export default ChatOutput;
