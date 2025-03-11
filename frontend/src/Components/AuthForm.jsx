import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center"
      style={{ backgroundImage: "url('./Agriculture-budget.png')" }}

    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 bg-opacity-90 relative z-10">
        <h2 className="text-2xl font-bold text-center text-green-600">
          {isLogin ? "Login to FarmDirect" : "Create an Account"}
        </h2>

        <form className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-green-400 focus:border-green-400"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-400 focus:border-green-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-green-400 focus:border-green-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-green-600 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
