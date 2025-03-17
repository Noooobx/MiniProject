import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plus, User } from "lucide-react"; // Icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md opacity-80 fixed w-full shadow-md py-4 px-6 flex justify-between items-center z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-700 tracking-wide">
          Farm Direct
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-green-700 transition font-medium">Home</Link>
          <Link to="/news" className="hover:text-green-700 transition font-medium">News</Link>
          <Link to="/price" className="hover:text-green-700 transition font-medium">Price</Link>
          <Link
            to="/sell"
            className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition"
          >
            <Plus size={18} /> Sell
          </Link>
          {/* Profile Icon */}
          <Link to="/profile" className="flex items-center gap-2 hover:text-green-700 transition">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={22} className="text-gray-800" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} />
        </button>
      </nav>

      {/* Overlay Background */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu (Slide-in from Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/80 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
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
        <div className="flex flex-col items-center gap-6 mt-16 px-6 text-lg font-medium">
          <Link to="/" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/news" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>News</Link>
          <Link to="/price" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>Price</Link>
          <Link
            to="/sell"
            className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Plus size={20} /> Sell
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={22} className="text-gray-800" />
            </div>
            My Profile
          </Link>
        </div>
      </div>
    </>
  );
}
