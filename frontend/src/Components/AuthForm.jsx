import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

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

        <form className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white cursor-pointer py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          {isLogin ? "New to FarmDirect?" : "Already have an account?"}{" "}
          <button
            className="text-green-700 cursor-pointer font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
