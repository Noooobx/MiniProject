import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Social icons

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Section - Brand & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-wide text-green-300">Farm Direct</h2>
          <p className="text-gray-300 text-sm mt-2 max-w-xs">
            Bridging the gap between farmers and buyers with trust and transparency.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "News", path: "/news" },
            { name: "Price", path: "/price" },
            { name: "Sell", path: "/sell" },
            { name: "My Profile", path: "/profile" },
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="hover:text-green-300 transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Section - Social Media Links */}
        <div className="flex gap-5">
          {[
            { icon: <Facebook size={28} />, href: "#" },
            { icon: <Twitter size={28} />, href: "#" },
            { icon: <Instagram size={28} />, href: "#" },
          ].map((social, index) => (
            <a 
              key={index} 
              href={social.href} 
              className="hover:text-green-300 transition-all duration-300 transform hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} <span className="text-green-300 font-semibold">Farm Direct</span>. All rights reserved.
      </div>
    </footer>
  );
}
