import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("hello")

  useEffect(() => {
    console.log("first")
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) navigate("/sell");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      navigate("/sell");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Agriculture-budget.png')" }}
    >
      <div className="absolute inset-0 bg-opacity-30"></div>
      <div className="w-full max-w-md bg-white opacity-90 shadow-2xl border border-gray-200 rounded-xl p-8 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          {isLogin ? "Login to FarmDirect" : "Join FarmDirect"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Enter your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Enter your email"
            required
          />

          {!isLogin && (
            <>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter your phone number"
                required
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Enter your location"
                required
              />
            </>
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          {isLogin ? "New to FarmDirect?" : "Already have an account?"}{" "}
          <button
            className="text-green-700 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
