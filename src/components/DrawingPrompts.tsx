import React, { useState } from "react";
import { Sparkles, Heart, Zap, Cloud, Sun, Moon } from "lucide-react";

interface DrawingPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const DrawingPrompts: React.FC<DrawingPromptsProps> = ({ onSelectPrompt }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const emotionPrompts = {
    sad: [
      "Draw your sadness as a weather pattern",
      "Sketch what loneliness looks like to you",
      "Create a landscape of your heartbreak",
      "Draw the weight of your emotions",
      "Sketch your tears as something beautiful",
    ],
    happy: [
      "Draw your joy as a burst of energy",
      "Sketch what pure happiness looks like",
      "Create a celebration of your good mood",
      "Draw your smile as a force of nature",
      "Sketch the colors of your happiness",
    ],
    angry: [
      "Draw your anger as a storm",
      "Sketch what frustration looks like",
      "Create a visual representation of rage",
      "Draw the fire inside you",
      "Sketch your anger as a monster",
    ],
    anxious: [
      "Draw your anxiety as a maze",
      "Sketch what worry looks like",
      "Create a visual of your racing thoughts",
      "Draw your nervous energy",
      "Sketch your anxiety as a creature",
    ],
    confused: [
      "Draw your confusion as a puzzle",
      "Sketch what uncertainty feels like",
      "Create a visual of mixed emotions",
      "Draw your lost thoughts",
      "Sketch confusion as a fog",
    ],
    peaceful: [
      "Draw your calm as a gentle wave",
      "Sketch what serenity looks like",
      "Create a peaceful landscape",
      "Draw your inner peace",
      "Sketch tranquility as nature",
    ],
  };

  const emotionIcons = {
    sad: <Cloud className="w-6 h-6" />,
    happy: <Sun className="w-6 h-6" />,
    angry: <Zap className="w-6 h-6" />,
    anxious: <Sparkles className="w-6 h-6" />,
    confused: <Moon className="w-6 h-6" />,
    peaceful: <Heart className="w-6 h-6" />,
  };

  const emotionColors = {
    sad: "from-blue-400 to-blue-600",
    happy: "from-yellow-400 to-orange-500",
    angry: "from-red-400 to-red-600",
    anxious: "from-purple-400 to-purple-600",
    confused: "from-gray-400 to-gray-600",
    peaceful: "from-green-400 to-green-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
        Drawing Prompts
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Choose an emotion and get inspired by these prompts:
      </p>

      {/* Emotion Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {Object.entries(emotionPrompts).map(([emotion, prompts]) => (
          <button
            key={emotion}
            onClick={() =>
              setSelectedEmotion(selectedEmotion === emotion ? null : emotion)
            }
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedEmotion === emotion
                ? `bg-gradient-to-r ${
                    emotionColors[emotion as keyof typeof emotionColors]
                  } text-white shadow-lg`
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              {emotionIcons[emotion as keyof typeof emotionIcons]}
            </div>
            <span className="capitalize">{emotion}</span>
          </button>
        ))}
      </div>

      {/* Selected Emotion Prompts */}
      {selectedEmotion && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800 capitalize">
            {selectedEmotion} Prompts:
          </h4>
          <div className="space-y-2">
            {emotionPrompts[selectedEmotion as keyof typeof emotionPrompts].map(
              (prompt, index) => (
                <button
                  key={index}
                  onClick={() => onSelectPrompt(prompt)}
                  className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all text-sm text-gray-700 hover:text-gray-900"
                >
                  {prompt}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingPrompts;
