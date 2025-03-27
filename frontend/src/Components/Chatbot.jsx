import { useState } from "react";

export default function Chatbot() {
  const baseUrl = import.meta.env.VITE_CHATBOT_URL;
  console.log(baseUrl)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(baseUrl+"/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      console.log(response);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { text: "Oops! Something went wrong.", sender: "bot" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition flex items-center justify-center w-14 h-14"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white shadow-2xl rounded-xl overflow-hidden border border-green-400">
          {/* Chat Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Chat Assistant</span>
            <button className="text-white text-xl" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-2/3 ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white ml-auto text-right"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-500">Typing...</div>}
          </div>

          {/* Chat Input */}
          <div className="p-4 flex border-t bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}