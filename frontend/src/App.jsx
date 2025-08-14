import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatMessage from "./components/ChatMessage";
import PreviewPdf from "./components/PreviewPdf";
import Action from "./components/Action";
import Heros from "./pages/Heros";
import { askQuestion } from "./services/api";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [currentFilename, setCurrentFilename] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (question) => {
    if (!currentFilename) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: question }]);
    try {
      const res = await askQuestion(currentFilename, question);
      setChatHistory((prev) => [...prev, { sender: "bot", text: res.answer }]);
    } catch {
      setChatHistory((prev) => [...prev, { sender: "bot", text: "Error" }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Heros
        onGetStarted={() =>
          document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <div id="tool-section" className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        <ChatMessage messages={chatHistory} />
        {showPreview && (
          <div className="flex-1">
            <PreviewPdf file={pdfFile} />
          </div>
        )}
      </div>
      <Action
        onFileSelect={setPdfFile}
        onFilename={setCurrentFilename}
        onSendMessage={handleSendMessage}
        onPreviewToggle={() => setShowPreview((prev) => !prev)}
      />
    </div>
  );
}

export default App;
