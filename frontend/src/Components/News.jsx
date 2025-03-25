import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // Import spinner

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${BASE_URL}/api/news/view`);
        setNews(response.data.articles);
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-4 text-center">Latest Agriculture News</h1>
      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="text-center text-gray-600">No news articles available.</p>
        ) : (
          news.map((article, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.source.name} | {new Date(article.publishedAt).toLocaleDateString()}</p>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="News"
                  className="w-full h-52 object-cover mt-2 rounded-md"
                />
              )}
              <p className="mt-2 text-gray-700">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 inline-block"
              >
                Read more →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
