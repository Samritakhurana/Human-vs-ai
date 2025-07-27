import React from "react";
import { Github, Mail, Instagram, Twitter, Facebook } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding/Description */}
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-white mb-2">
            <span className="text-purple-200">Human</span> vs{" "}
            <span className="text-pink-200">AI</span>
          </div>
          <div className="text-sm text-purple-100 mb-4">
            Exploring the beautiful gap between human expression and machine
            logic.
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <div className="font-bold text-lg mb-3 text-white">Quick Links</div>
          <nav className="flex flex-col gap-2 text-purple-50">
            <a href="#" className="hover:text-pink-200 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-pink-200 transition-colors">
              How It Works
            </a>
            <a href="#" className="hover:text-pink-200 transition-colors">
              Gallery
            </a>
            <a href="#" className="hover:text-pink-200 transition-colors">
              Vote
            </a>
          </nav>
        </div>
        {/* Contact */}
        <div>
          <div className="font-bold text-lg mb-3 text-white">Contact</div>
          <div className="text-purple-50 text-sm mb-1">
            Email:{" "}
            <a href="mailto:team@humanvsai.com" className="hover:text-pink-200">
              team@humanvsai.com
            </a>
          </div>
          <div className="text-purple-50 text-sm">Phone: (555) 123-4567</div>
        </div>
        {/* Socials */}
        <div>
          <div className="font-bold text-lg mb-3 text-white">Follow Us</div>
          <div className="flex gap-4 mt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-200 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:team@humanvsai.com"
              className="hover:text-pink-200 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-200 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-200 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-200 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-pink-200 mt-10 pt-6 text-center text-xs text-purple-100">
        © {new Date().getFullYear()} Human vs AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
