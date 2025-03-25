
import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Chatbot visibility state

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm just a bot! How can I assist you today?", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
          onClick={() => setIsOpen(true)}
        >
          Open Chat
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col border border-gray-200 animate-slide-in">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <span className="font-bold">Farm Fresh Chatbot</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              Close
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
