import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 py-20 
                 bg-green-50 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Agriculture-budget.png')" }}
    >
      <div className="relative z-10 max-w-2xl text-white backdrop-blur-xs p-6 sm:p-10 rounded-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
          Welcome to <span className="text-white">FarmDirect</span>
        </h1>
        <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl mx-auto mb-6">
          Connecting farmers and buyers directly for fresh, high-quality produce at fair prices.
        </p>

        <Link
          to="/login"
          className="px-6 sm:px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow-md 
                     hover:bg-green-700 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}