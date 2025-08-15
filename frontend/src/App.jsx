import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatMessage from "./components/ChatMessage";
import PreviewPdf from "./components/PreviewPdf";
import Action from "./components/Action";
import { askQuestion } from "./services/api";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [currentFilename, setCurrentFilename] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);

  const handleFileSelect = (fileUrl) => setPdfFile(fileUrl);
  const handleFilenameUpdate = (filename) => setCurrentFilename(filename);

  const handleSendMessage = async (question) => {
    if (!currentFilename) return;
    setChatHistory((prev) => [...prev, { sender: "user", text: question }]);
    try {
      const res = await askQuestion(currentFilename, question);
      setChatHistory((prev) => [...prev, { sender: "bot", text: res.answer }]);
    } catch {
      setChatHistory((prev) => [...prev, { sender: "bot", text: "❌ Error getting answer" }]);
    }
  };

  return (
  
    
    <div className="min-h-screen relative">

      
      {/* background image layer still not working */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('/leaf-background-vector.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.20,
          zIndex: 0,
        }}
      />

      {/* Main content over background */}
      <div className="relative z-10 flex flex-col bg-gray-950 bg-opacity-90 min-h-screen pt-16 md:pt-20">
        <Navbar />

        <div className="flex-1 w-full flex flex-col md:flex-row items-stretch px-2 md:px-[5%] gap-4 pb-4 mt-4 md:mt-8 transition-all">
          <div
            className={`flex w-full ${
              showPreview ? "md:w-[45%]" : "md:w-[50%] mx-auto justify-center"
            } min-w-[220px]`}
          >
            <ChatMessage messages={chatHistory} />
          </div>
          {showPreview && (
            <div className="w-full md:w-[45%] min-w-[220px] flex">
              {/* Passing filename as prop */}
              <PreviewPdf file={pdfFile} filename={currentFilename} />
            </div>
          )}
        </div>

        <Action
          onFileSelect={handleFileSelect}
          onFilename={handleFilenameUpdate}
          onSendMessage={handleSendMessage}
          onPreviewToggle={() => setShowPreview((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default App;
