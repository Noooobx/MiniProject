import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Plus, User } from "lucide-react"; // Icons
import axios from "axios"; // To send requests to the backend
import { checkAuth } from "../utils/authUtils"; // Import auth check function

export default function Navbar() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status
  const navigate = useNavigate();
let authStatus;
  useEffect(() => {
    const verifyAuth = async () => {
       authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    };
    verifyAuth();
  }, [authStatus]);

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "/api/auth/logout", {}, { withCredentials: true });

      alert("Logged out successfully");

      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; sameSite=Lax;";

      navigate("/");
      setIsAuthenticated(false); // Update auth state after logout
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred while logging out.");
    } finally {
      setProfileOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md opacity-80 fixed w-full shadow-md py-4 px-6 flex justify-between items-center z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-700 tracking-wide">
          Farm Direct
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/buy" className="hover:text-green-700 transition font-medium">Home</Link>
          <Link to="/news" className="hover:text-green-700 transition font-medium">News</Link>
          <Link to="/price" className="hover:text-green-700 transition font-medium">Price</Link>
          <Link to="/benefits" className="hover:text-green-700 transition font-medium">Benefits</Link>

          {/* Show Dashboard only if authenticated */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition"
            >
              Dashboard
            </Link>
          )}

          {/* Profile Icon (Only if authenticated) */}
          {isAuthenticated && (
            <div className="relative">
              <button
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:ring-2 ring-green-500 transition"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <User size={22} className="text-gray-800" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(true)}>
          <Menu size={32} />
        </button>
      </nav>

      {/* Close dropdown on outside click */}
      {profileOpen && <div className="fixed inset-0" onClick={() => setProfileOpen(false)}></div>}

      {/* Overlay Background */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/80 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-50 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-800" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center gap-6 mt-16 px-6 text-lg font-medium">
          <Link to="/" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/news" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>
            News
          </Link>
          <Link to="/price" className="hover:text-green-700 transition" onClick={() => setMenuOpen(false)}>
            Price
          </Link>

          {/* Show Dashboard only if authenticated */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white font-semibold rounded-full shadow-md hover:bg-green-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Plus size={20} /> Dashboard
            </Link>
          )}

          {/* Show Profile Icon only if authenticated */}
          {isAuthenticated && (
            <button className="flex items-center gap-2 hover:text-green-700 transition" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={22} className="text-gray-800" />
              </div>
              My Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
}
