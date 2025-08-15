import React from "react";

const ChatOutput = ({ messages }) => (
  <div className="flex flex-col gap-3 py-1">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`max-w-[80%] break-words p-3 rounded-xl text-sm shadow
          ${
            msg.sender === "user"
              ? "bg-blue-700/80 text-white self-end"
              : "bg-gray-700/70 text-yellow-100 self-start border border-yellow-800"
          }
        `}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

export default ChatOutput;
