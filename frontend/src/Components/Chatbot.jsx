import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Languages, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

export default function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [voiceEnabled, setVoiceEnabled] = useState(false); // ✅ added
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Text-to-Speech function
  const speakText = (text) => {
    if (!voiceEnabled) return;

    const speech = new SpeechSynthesisUtterance(text);

    if (language === "hi") speech.lang = "hi-IN";
    else if (language === "ml") speech.lang = "ml-IN";
    else speech.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      await fetchMessage(newMessages, input);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([
        ...newMessages,
        { text: "Connection error. Please check your backend.", sender: "bot" },
      ]);
    }
    setLoading(false);
  };

  const fetchMessage = async (newMessages, prompt, retry = true) => {
    const langInstruction =
      language === "hi" ? "Reply in Hindi (हिन्दी)." :
      language === "ml" ? "Reply in Malayalam (മലയാളം)." :
      "Reply in English.";

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an agricultural assistant for FarmDirect, helping farmers with crops, soil, fertilizers, pests, yield, and market advice. ${langInstruction}\n\nUser: ${prompt}`
                }
              ]
            }
          ]
        }),
      });

      if (!response.ok) {
        if (retry && (response.status === 500 || response.status === 429)) {
          console.warn(`Gemini error ${response.status}, retrying in 2s...`);
          await new Promise(r => setTimeout(r, 2000));
          return fetchMessage(newMessages, prompt, false);
        }
        throw new Error(`Gemini error ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
      
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);

      speakText(botMessage); // ✅ added

    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([...newMessages, { text: "⚠️ AI service is temporarily unavailable. Please try again in a moment.", sender: "bot" }]);
    }
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
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    voiceEnabled 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-gray-100 text-gray-500 border border-transparent"
                  }`}
                  title={voiceEnabled ? "Turn off voice" : "Turn on voice"}
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{voiceEnabled ? "Voice On" : "Voice Off"}</span>
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