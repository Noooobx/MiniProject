import { useState, useEffect } from "react";

export default function FarmerNews() {
  const defaultApiKey = "0ea76615ae684dd3bd5bcafaacb4ca37"; // Pre-filled API Key
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [newsData, setNewsData] = useState([]);
  const [apiKey, setApiKey] = useState(localStorage.getItem("newsApiKey") || defaultApiKey);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem("newsApiKey")); // Show input if no API key is saved

  // Save API Key to localStorage
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const saveApiKey = () => {
    localStorage.setItem("newsApiKey", apiKey);
    setShowApiInput(false);
  };

  const changeApiKey = () => {
    setShowApiInput(true);
  };

  const fetchNews = async () => {
    if (!apiKey) {
      setError("❌ Please enter a valid API Key.");
      return;
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=agriculture&language=${selectedLanguage}&apiKey=${apiKey}`;
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data.articles) {
        setNewsData(data.articles);
      } else {
        setError("No news articles found.");
        setNewsData([]);
      }
    } catch (error) {
      setError(error.message);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) fetchNews();
  }, [selectedLanguage, apiKey]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌾 Farmer News</h2>

      {/* API Key Input */}
      {showApiInput ? (
        <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
          <input
            type="password"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={handleApiKeyChange}
            className="flex-1 p-2 border rounded w-full md:w-auto"
          />
          <button
            onClick={saveApiKey}
            className="p-2 bg-green-500 text-white rounded"
          >
            Save API Key
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-4">
          <p className="text-gray-600">✅ API Key Saved</p>
          <button
            onClick={changeApiKey}
            className="p-2 bg-yellow-500 text-white rounded"
          >
            Change API Key
          </button>
        </div>
      )}

      {/* Language Selection */}
      <div className="flex items-center gap-3 mb-4">
        <select
          onChange={(e) => setSelectedLanguage(e.target.value)}
          value={selectedLanguage}
          className="p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
        </select>
        <button
          onClick={fetchNews}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Refresh News
        </button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p className="text-blue-500 mt-4">Loading news...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* News List */}
      <div className="grid gap-4 mt-4">
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <div key={index} className="p-4 border rounded shadow">
              <h3 className="font-semibold">{news.title}</h3>
              <p>{news.description}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available.</p>
        )}
      </div>
    </div>
  );
}

