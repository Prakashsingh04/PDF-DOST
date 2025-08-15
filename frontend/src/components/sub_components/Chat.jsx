import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Chat = ({ onSendMessage }) => {
  const [question, setQuestion] = useState("");

  const send = () => {
    if (!question.trim()) return;
    onSendMessage(question.trim());
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="flex w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-inner">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Ask a question..."
        className="flex-1 px-3 py-2 text-gray-100 bg-transparent focus:outline-yellow-400 placeholder-gray-400"
        autoComplete="off"
      />
      <button
        onClick={send}
        className="flex items-center justify-center p-3 bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 transition-colors duration-200"
        title="Send Question"
      >
        <PaperAirplaneIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default Chat;
