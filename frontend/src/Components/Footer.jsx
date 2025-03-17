import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Social icons

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section - Brand & Links */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wide">Farm Direct</h2>
          <p className="text-gray-200 text-sm mt-1">
            Connecting farmers and buyers directly.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/news" className="hover:text-gray-300 transition">News</Link>
          <Link to="/price" className="hover:text-gray-300 transition">Price</Link>
          <Link to="/sell" className="hover:text-gray-300 transition">Sell</Link>
          <Link to="/profile" className="hover:text-gray-300 transition">My Profile</Link>
        </div>

        {/* Right Section - Social Media Links */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-300 transition"><Facebook size={24} /></a>
          <a href="#" className="hover:text-gray-300 transition"><Twitter size={24} /></a>
          <a href="#" className="hover:text-gray-300 transition"><Instagram size={24} /></a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-gray-300 text-sm mt-6 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Farm Direct. All rights reserved.
      </div>
    </footer>
  );
}
