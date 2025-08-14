// src/components/sub_components/Chat.jsx
import React, { useState } from "react";

const Chat = ({ onSendMessage }) => {
  const [question, setQuestion] = useState("");

  const send = () => {
    if (question.trim()) {
      onSendMessage(question);
      setQuestion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="flex w-full border border-gray-300 rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 outline-none text-sm"
      />
      <button
        onClick={send}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 text-sm"
      >
        Ask
      </button>
    </div>
  );
};

export default Chat;
