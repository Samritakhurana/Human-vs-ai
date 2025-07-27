import React, { useState } from "react";
import { ArrowLeft, Send, Sparkles, Loader2 } from "lucide-react";
import AIResponsePopup from "./AIResponsePopup";
import { analyzeText } from "../services/api";

interface TextInputProps {
  onBack: () => void;
  onSubmit?: (submission: { type: "text"; human: string; ai: string }) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onBack, onSubmit }) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const analyzeTextWithAI = async (input: string): Promise<string> => {
    try {
      // Call the real AI API
      const response = await analyzeText(input);
      return response;
    } catch (error) {
      console.error("Error calling AI API:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (text.length < 5) return;

    setIsAnalyzing(true);

    try {
      const analysis = await analyzeTextWithAI(text);
      setAiResponse(analysis);
      setSubmitted(true);
      setShowPopup(true); // Show the popup

      if (onSubmit) {
        onSubmit({
          type: "text",
          human: text,
          ai: analysis,
        });
      }

      // Reset after popup is closed
      setTimeout(() => {
        setSubmitted(false);
        setAiResponse("");
      }, 50000);
    } catch (error) {
      console.error("Error analyzing text:", error);
      setAiResponse(
        "Sorry, there was an error analyzing your text. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          Express Through Text
        </h2>
        <div className="w-24"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Write Your Emotions</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Type how you're feeling... be honest, be raw, be human."
            />
            <div className="mt-2 text-sm text-gray-500">
              {text.length} characters{" "}
              {text.length < 5 && "(minimum 5 characters)"}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={handleSubmit}
              disabled={submitted || text.length < 5 || isAnalyzing}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all ${
                submitted
                  ? "bg-green-100 text-green-600"
                  : text.length < 5 || isAnalyzing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  AI Analyzing...
                </>
              ) : submitted ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Submitted!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">Express Yourself</h3>
            <p className="text-sm text-gray-600 mb-4">
              Write freely about your emotions. The AI will analyze and
              interpret them using a real NLP model.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Don't censor yourself</li>
              <li>• Use descriptive language</li>
              <li>• Be authentic and raw</li>
              <li>• Watch AI "understand" your feelings</li>
            </ul>
          </div>

          {/* Remove the old inline AI response display */}
        </div>
      </div>

      {/* AI Response Popup */}
      <AIResponsePopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        userText={text}
        aiResponse={aiResponse}
      />
    </div>
  );
};

export default TextInput;
