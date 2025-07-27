import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Github,
  Heart,
  Sparkles,
  Zap,
  Brain,
  Palette,
  MessageSquare,
} from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const FloatingDoodle = ({
    children,
    className = "",
    delay = 0,
  }: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) => (
    <div
      className={`absolute animate-bounce ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Emotion Bubbles */}
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-25 animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}
        ></div>

        {/* Neural Network Connections */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10">
          <div
            className="absolute top-0 left-0 w-2 h-2 bg-purple-400 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
          <div
            className="absolute top-8 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping"
            style={{ animationDuration: "1.8s", animationDelay: "1s" }}
          ></div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
            <path
              d="M8 8 L32 32 L64 16 L96 48 L120 24"
              stroke="url(#gradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              className="animate-pulse"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </path>
          </svg>
        </div>

        {/* Mood Wave Patterns */}
        <div className="absolute bottom-20 right-10 w-40 h-20 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 160 80">
            <path
              d="M0 40 Q20 20 40 40 T80 40 T120 40 T160 40"
              stroke="url(#moodGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            >
              <defs>
                <linearGradient
                  id="moodGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </path>
          </svg>
        </div>

        {/* AI Processing Dots */}
        <div className="absolute top-1/3 left-1/2 w-24 h-8 opacity-20">
          <div className="flex space-x-2">
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDuration: "1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDuration: "1s", animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDuration: "1s", animationDelay: "0.4s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
              style={{ animationDuration: "1s", animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>

        {/* Floating Icons with Enhanced Animation */}
        <FloatingDoodle className="top-20 left-10 text-6xl" delay={0}>
          🎨
        </FloatingDoodle>
        <FloatingDoodle className="top-32 right-20 text-4xl" delay={1}>
          ✨
        </FloatingDoodle>
        <FloatingDoodle className="top-60 left-1/3 text-3xl" delay={0.5}>
          💭
        </FloatingDoodle>

        {/* New Mood-Related Icons */}
        <FloatingDoodle className="top-1/2 left-1/4 text-2xl" delay={2}>
          🧠
        </FloatingDoodle>
        <FloatingDoodle className="bottom-1/3 left-1/2 text-2xl" delay={0.8}>
          🤖
        </FloatingDoodle>
        <div
          className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/25 to-orange-400/25 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        ></div>

        {/* Floating cursor trail with enhanced animation */}
        <div
          className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 transition-all duration-300 ease-out pointer-events-none shadow-lg"
          style={{
            transform: `translate(${mousePosition.x - 8}px, ${
              mousePosition.y - 8
            }px)`,
            filter: "blur(1px)",
          }}
        />

        {/* Cursor trail particles */}
        <div
          className="w-2 h-2 bg-blue-400 rounded-full opacity-30 transition-all duration-500 ease-out pointer-events-none absolute"
          style={{
            transform: `translate(${mousePosition.x - 4}px, ${
              mousePosition.y - 4
            }px)`,
            animationDelay: "0.1s",
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Hero Section */}
        <section
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 bg-clip-text text-transparent leading-tight">
              Mood Trace
            </h1>
            <p className="text-xl md:text-2xl text-pink-600 font-medium mb-4">
              Draw what you feel.
            </p>
                        <p className="text-xl md:text-2xl text-purple-600 font-medium mb-4">
              Write what you mean.
            </p>
                        <p className="text-xl md:text-2xl text-pink-600 font-medium mb-4">
             Then let AI guess 
            </p>
                                    <p className="text-xl md:text-2xl text-purple-600 font-medium mb-4">
            but here's the twist:
            </p>
                        <p className="text-xl md:text-2xl text-pink-600 font-medium mb-4">
              It never really know!!
            </p>

            <div className="relative mb-8">
              <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
                Tell your story💓💓. See how AI misreads your heart💔💔
                <br />
                <span className="font-handwriting text-purple-600 text-2xl">
                  Spoiler: It can't!!! 😁😁😁😁
                </span>
              </p>

              {/* Hand-drawn arrow */}
              <div className="absolute -right-10 top-0 text-purple-400 text-4xl rotate-12 hidden md:block">
                ↗️
              </div>
            </div>

            <button
              onClick={onEnterApp}
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-400 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-300 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center">
                Begin Tracing!
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20 max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 text-gray-800">
            How It Works
            <span className="block text-lg font-handwriting text-purple-600 mt-2">
              (It's beautifully broken)
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border-4 border-dashed border-purple-200">
                <div className="text-6xl mb-4">✏️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  1. You Create
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Draw your feelings or write your thoughts.
                  <span className="block font-handwriting text-purple-600 mt-2">
                    Raw, real, human.
                  </span>
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border-4 border-dashed border-blue-200">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  2. AI "Improves"
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Watch AI sanitize your emotions into corporate speak.
                  <span className="block font-handwriting text-blue-600 mt-2">
                    Polished, but soulless.
                  </span>
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border-4 border-dashed border-pink-200">
                <div className="text-6xl mb-4">😃</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  3. You Decide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vote on which feels more human.
                  <span className="block font-handwriting text-pink-600 mt-2">
                    Spoiler: It's always GOING TO be YOU!!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demos */}
        <section className="mb-20 max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 text-gray-800">
            Just Look At the Difference!
            <span className="block text-lg font-handwriting text-purple-600 mt-2">
              (Humans win every time)
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Drawing Example */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-dashed border-purple-200">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Drawing Challenge
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-bold text-purple-600 mb-2">
                    Human Drew:
                  </h4>
                  <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-4xl">😢</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-handwriting">
                    "Messy, emotional, real"
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-blue-600 mb-2">
                    AI "Fixed" It:
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 h-32 flex items-center justify-center border-2 border-dashed border-blue-300">
                    <span className="text-4xl">😊</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    "Optimized for positivity"
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Obviously, we prefer the human version😉
                </span>
              </div>
            </div>

            {/* Text Example */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-dashed border-pink-200">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Text Challenge
              </h3>

              <div className="space-y-4 mb-4">
                <div>
                  <h4 className="font-bold text-purple-600 mb-2">
                    Human Wrote:
                  </h4>
                  <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                    <p className="text-sm font-handwriting text-gray-700">
                      "I'm drowning in deadlines and my coffee tastes like
                      sadness..."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-blue-600 mb-2">
                    AI "Improved" It:
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-300">
                    <p className="text-sm text-gray-700">
                      "I am experiencing a high workload and would benefit from
                      better time management strategies."
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Obviously, we prefer the human version again😉
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-800">
           With lines of code… and a whole lot of heart.
            <span className="block text-lg font-handwriting text-purple-600 mt-2">
              (And obviously a lot of caffeine!!🥹)
            </span>
          </h2>

          {/* <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-dashed border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  R
                </div>
                <p className="text-sm font-medium text-gray-700">React</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-gray-700">p5.js</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-gray-700">Firebase</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-gray-700">OpenAI</p>
              </div>
            </div>
          </div> */}
        </section>

        {/* Footer */}
        <footer className="text-center max-w-2xl mx-auto">
          {/* Footer content removed */}
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
