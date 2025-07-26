import React from "react";
import { X, Bot, User, Sparkles } from "lucide-react";

interface AIResponsePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userText: string;
  aiResponse: string;
}

const AIResponsePopup: React.FC<AIResponsePopupProps> = ({
  isOpen,
  onClose,
  userText,
  aiResponse,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Analysis Complete</h2>
                <p className="text-purple-100 text-sm">
                  Here's how the AI interpreted your emotions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User's Text */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Your Words</h3>
            </div>
            <p className="text-gray-700 leading-relaxed italic">"{userText}"</p>
          </div>

          {/* AI Response */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">AI Interpretation</h3>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">
                  🤖 This is how a machine processes human emotions
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Note */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">
                  Notice the Difference?
                </h4>
                <p className="text-yellow-700 text-sm">
                  Your raw, authentic expression vs. AI's clinical, sanitized
                  interpretation. This shows how machines miss the subtlety of
                  human emotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIResponsePopup;
