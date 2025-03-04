import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex flex-col items-center h-screen justify-center text-center py-20 px-6 bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Welcome to FarmDirect
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        A simple and direct platform for farmers to sell their crops and buyers
        to purchase fresh produce.
      </p>

      <Link
        to="/login"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
      >
        Get Started
      </Link>
    </section>
  );
}
