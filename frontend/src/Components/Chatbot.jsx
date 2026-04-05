import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Languages, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const baseUrl = import.meta.env.VITE_CHATBOT_URL || "https://farmer-chatbot-python-server.vercel.app";
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [voice, setVoice] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(baseUrl + "/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: input,
          language: language,
          voice: voice
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      
      // Update: Using 'text' and 'audio' fields as per backend response
      const botMessage = data.text || data.response || "I'm not sure how to respond.";
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
      
      if (voice) {
        if (data.audio) {
          // Attempt to play backend audio if provided (Base64 or URL)
          const audioUrl = (data.audio.startsWith("http") || data.audio.startsWith("data:")) 
            ? data.audio 
            : `${baseUrl}/${data.audio}`;
          const audio = new Audio(audioUrl);
          audio.play().catch(e => {
            console.warn("Backend audio failed, falling back to Browser TTS:", e);
            speakText(botMessage, language);
          });
        } else {
          // Fallback to Browser-side TTS (Web Speech API)
          speakText(botMessage, language);
        }
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([
        ...newMessages,
        { text: "Connection error. Please check your backend.", sender: "bot" },
      ]);
    }
    setLoading(false);
  };

  // Helper for Browser TTS (Web Speech API)
  const speakText = (text, lang) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to match the language
    if (lang === "hi") utterance.lang = "hi-IN";
    else if (lang === "ml") utterance.lang = "ml-IN";
    else utterance.lang = "en-US";
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      {/* Floating Icon */}
      <button
        className={`fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center w-14 h-14 ${
          !isOpen ? "animate-pulse" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-28 right-6 z-50 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md border border-transparent"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <span className="font-semibold text-lg">Chat Assistant</span>
              <button
                className="text-white hover:scale-110 transition"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 bg-white">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[80%] text-sm ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white ml-auto text-right"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-gray-400 text-sm animate-pulse">
                  Typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Settings */}
            <div className="p-3 bg-white border-t">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-gray-500" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-1 py-0.5 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="ml">Malayalam (മലയാളം)</option>
                  </select>
                </div>
                <button
                  onClick={() => setVoice(!voice)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
                    voice ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {voice ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                  {voice ? "Voice On" : "Voice Off"}
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-gray-100 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                  placeholder="Type a message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white p-2 px-3 rounded-xl shadow-md hover:bg-green-700 transition text-sm"
                  disabled={loading}
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
