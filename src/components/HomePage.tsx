import React from "react";
import {
  Palette,
  MessageSquare,
  Vote,
  Trophy,
  ArrowRight,
  Pencil,
  Gamepad2,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: "draw" | "text" | "vote" | "gallery" | "games") => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Human vs AI
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-purple-700 mb-4">
            Can machines feel what we feel?
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Express your emotions through drawing or writing, then watch AI try
            to interpret and "improve" them. See how artificial intelligence
            sanitizes human feelings into corporate speak.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={() => onNavigate("draw")}
            className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <Palette className="w-7 h-7 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-800">
                Drawing Challenge
              </h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
              Draw your emotions freely. Watch AI turn your raw, authentic
              expression into something "optimized" and soulless.
            </p>
            <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
              Start Drawing <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
          <div
            onClick={() => onNavigate("text")}
            className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-100 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <MessageSquare className="w-7 h-7 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-800">
                Text Challenge
              </h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
              Write about your feelings honestly. See how AI transforms your
              human emotions into clinical, sanitized analysis.
            </p>
            <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
              Start Writing <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Stress Relief Games Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 shadow-lg border border-indigo-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">
            🎮 Stress Relief Games
          </h2>
          <p className="text-indigo-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Take a break from the AI challenges and relax with our therapeutic
            games. Perfect for stress relief and mental wellness.
          </p>
        </div>
        <div
          onClick={() => onNavigate("games")}
          className="group bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-xl border border-indigo-200 cursor-pointer hover:shadow-xl transition-all hover:scale-105 text-white"
        >
          <div className="flex items-center mb-4">
            <Gamepad2 className="w-8 h-8 text-white mr-4" />
            <h3 className="text-xl font-bold text-white">Stress Relief Hub</h3>
          </div>
          <p className="text-indigo-100 mb-6 leading-relaxed text-lg">
            Explore our collection of therapeutic games including bubble
            popping, memory matching, breathing exercises, and more. Designed to
            help you relax and reduce stress.
          </p>
          <div className="flex items-center text-white font-bold text-lg group-hover:translate-x-2 transition-transform">
            Start Relaxing <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => onNavigate("vote")}
          className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
        >
          <div className="flex items-center mb-4">
            <Vote className="w-7 h-7 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Vote on Submissions
            </h3>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
            Compare human expressions with AI interpretations. Vote for which
            feels more authentic and human.
          </p>
          <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
            View & Vote <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
        <div
          onClick={() => onNavigate("gallery")}
          className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
        >
          <div className="flex items-center mb-4">
            <Trophy className="w-7 h-7 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Top Submissions
            </h3>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
            See the most popular human expressions and how AI completely missed
            the point.
          </p>
          <div className="flex items-center text-yellow-600 font-medium group-hover:translate-x-2 transition-transform">
            View Gallery <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-10 border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pencil className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">1. You Create</h3>
            <p className="text-gray-600 text-base">
              Draw your feelings or write your thoughts.
            </p>
            <p className="text-purple-500 italic font-medium mt-2">
              Raw, real, human.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              2. AI "Improves" It
            </h3>
            <p className="text-gray-600 text-sm">
              Watch AI sanitize your emotions into corporate wellness speak.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              3. Community Votes
            </h3>
            <p className="text-gray-600 text-sm">
              Others vote on which version feels more human. Guess who wins?
            </p>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center py-6">{/* Footer message removed */}</div>
    </div>
  );
};

export default HomePage;
