import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plus, User } from "lucide-react"; // Icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed w-full shadow-md py-4 px-6 flex justify-between items-center z-50">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-600">
          Farm Direct
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/news" className="hover:text-green-600 transition">News</Link>
          <Link to="/price" className="hover:text-green-600 transition">Price</Link>
          <Link
            to="/sell"
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            <Plus size={18} /> Sell
          </Link>
          {/* Profile Icon */}
          <Link to="/profile" className="flex items-center gap-2 hover:text-green-600 transition">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-700" />
            </div>
            My Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Overlay Background */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu (Slide-in from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-800"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center gap-6 mt-16 px-6">
          <Link to="/" className="text-lg hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/news" className="text-lg hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>News</Link>
          <Link to="/price" className="text-lg hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>Price</Link>
          <Link
            to="/sell"
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Plus size={18} /> Sell
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-700" />
            </div>
            My Profile
          </Link>
        </div>
      </div>
    </>
  );
}
