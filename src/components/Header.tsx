import React from "react";
import { Palette, Github, ArrowRight } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: "home" | "draw" | "text" | "vote" | "gallery") => void;
}

const navLinks = [
  { name: "Home", page: "home" },
  { name: "Drawing", page: "draw" },
  { name: "Text", page: "text" },
  { name: "Vote", page: "vote" },
  { name: "Gallery", page: "gallery" },
  { name: "How It Works", page: "home" }, // You can update this if you have a separate page for How It Works
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm py-2 flex justify-center items-center">
        <span className="font-medium flex items-center">
          <span className="mr-2">⚡</span>
          Experience the future of human and AI creativity!
        </span>
      </div>
      {/* Main Nav */}
      <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Palette className="w-7 h-7 text-purple-700" />
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Mood Trace
          </span>
        </div>
        {/* Nav Links */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.page as any)}
                className="text-base font-semibold text-gray-800 hover:text-purple-700 transition-colors focus:outline-none bg-transparent border-none"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/Samritakhurana/Human-vs-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-pink-500 to-pink-400 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-500 transition-all"
          >
            <Github className="w-5 h-5 mr-2" /> GitHub
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
