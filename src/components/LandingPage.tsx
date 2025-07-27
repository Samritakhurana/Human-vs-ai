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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingDoodle className="top-20 left-10 text-6xl" delay={0}>
          🎨
        </FloatingDoodle>
        <FloatingDoodle className="top-32 right-20 text-4xl" delay={1}>
          ✨
        </FloatingDoodle>
        <FloatingDoodle className="top-60 left-1/3 text-3xl" delay={0.5}>
          💭
        </FloatingDoodle>

        {/* Floating cursor trail */}
        <div
          className="w-4 h-4 bg-purple-400 rounded-full opacity-30 transition-all duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x - 8}px, ${
              mousePosition.y - 8
            }px)`,
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
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">
              Mood Trace
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-4">
              Where human emotions meet AI interpretation
            </p>

            <div className="relative mb-8">
              <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
                Draw your emotions. Watch AI try to copy them.
                <br />
                <span className="font-handwriting text-purple-600 text-xl">
                  Spoiler: It can't. 🎭
                </span>
              </p>

              {/* Hand-drawn arrow */}
              <div className="absolute -right-10 top-0 text-purple-400 text-4xl rotate-12 hidden md:block">
                ↗️
              </div>
            </div>

            <button
              onClick={onEnterApp}
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-300 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center">
                Start Tracing Moods
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
                <div className="text-6xl mb-4">🗳️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  3. You Decide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vote on which feels more human.
                  <span className="block font-handwriting text-pink-600 mt-2">
                    Spoiler: It's always you.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demos */}
        <section className="mb-20 max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 text-gray-800">
            See The Difference
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
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  87% prefer the human version
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
                <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                  92% prefer the human version
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-800">
            Built With Love & Code
            <span className="block text-lg font-handwriting text-purple-600 mt-2">
              (And a lot of caffeine)
            </span>
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-dashed border-gray-200">
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
          </div>
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
