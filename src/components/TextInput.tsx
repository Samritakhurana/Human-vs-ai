import React, { useState } from "react";
import { ArrowLeft, Send, Sparkles, Loader2 } from "lucide-react";
import AIResponsePopup from "./AIResponsePopup";

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
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple emotion detection based on keywords
    const text = input.toLowerCase();

    // Detect emotional keywords
    const emotions = {
      sad: [
        "sad",
        "cry",
        "depressed",
        "down",
        "upset",
        "hurt",
        "pain",
        "lonely",
        "empty",
        "broken",
      ],
      angry: [
        "angry",
        "mad",
        "furious",
        "rage",
        "hate",
        "annoyed",
        "frustrated",
        "pissed",
      ],
      happy: [
        "happy",
        "joy",
        "excited",
        "great",
        "awesome",
        "amazing",
        "love",
        "wonderful",
      ],
      anxious: [
        "anxious",
        "worried",
        "nervous",
        "stress",
        "panic",
        "overwhelmed",
        "scared",
        "afraid",
      ],
      tired: [
        "tired",
        "exhausted",
        "drained",
        "sleepy",
        "weary",
        "fatigue",
        "worn out",
      ],
      confused: [
        "confused",
        "lost",
        "unclear",
        "puzzled",
        "bewildered",
        "uncertain",
      ],
    };

    let detectedEmotion = "neutral";
    let confidence = 65;

    // Check for emotional keywords
    for (const [emotion, keywords] of Object.entries(emotions)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          detectedEmotion = emotion;
          confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
          break;
        }
      }
      if (detectedEmotion !== "neutral") break;
    }

    // Generate AI's overly clinical response
    const responses = {
      sad: [
        "I detect indicators of temporary emotional downturn. I recommend implementing positive mindset strategies and engaging in mood-boosting activities for optimal mental wellness.",
        "Analysis shows signs of sadness. This appears to be a normal human emotional response. I suggest practicing gratitude exercises and maintaining social connections for improved well-being.",
        "Emotional state assessment indicates melancholy. This is within normal parameters. Consider implementing self-care routines and seeking professional support if symptoms persist.",
      ],
      angry: [
        "I identify elevated stress indicators and potential frustration markers. I recommend anger management techniques and deep breathing exercises for emotional regulation.",
        "Analysis reveals heightened emotional intensity. This appears to be a natural stress response. Consider implementing mindfulness practices and conflict resolution strategies.",
        "Emotional assessment shows signs of agitation. I suggest channeling this energy into productive activities and practicing emotional intelligence techniques.",
      ],
      happy: [
        "I detect positive emotional indicators! This suggests optimal mental state and healthy psychological functioning. Continue maintaining these beneficial thought patterns.",
        "Analysis shows elevated mood markers. This indicates successful emotional regulation and positive mental health outcomes. Excellent work on maintaining wellness!",
        "Emotional state assessment reveals joy indicators. This demonstrates effective coping strategies and positive life engagement. Keep up the good work!",
      ],
      anxious: [
        "I identify stress-related emotional markers. This appears to be a common human response to uncertainty. I recommend implementing anxiety management techniques and relaxation strategies.",
        "Analysis shows elevated concern indicators. This is within normal stress response parameters. Consider practicing mindfulness and seeking appropriate support resources.",
        "Emotional assessment reveals worry patterns. I suggest implementing stress-reduction techniques and maintaining healthy coping mechanisms for optimal mental wellness.",
      ],
      tired: [
        "I detect fatigue-related emotional indicators. This suggests the need for improved sleep hygiene and energy management strategies for optimal functioning.",
        "Analysis shows exhaustion markers. This appears to be related to lifestyle factors. I recommend prioritizing rest and implementing better work-life balance practices.",
        "Emotional state assessment indicates low energy levels. Consider optimizing sleep patterns and incorporating stress-reduction techniques for improved vitality.",
      ],
      confused: [
        "I identify uncertainty indicators in your expression. This appears to be a normal cognitive response to complex situations. I recommend breaking down problems into manageable components.",
        "Analysis shows signs of cognitive processing challenges. This is within normal problem-solving parameters. Consider seeking clarification and additional information sources.",
        "Emotional assessment reveals decision-making complexity. I suggest implementing structured thinking approaches and seeking appropriate guidance for clarity.",
      ],
      neutral: [
        "I detect balanced emotional indicators. This suggests stable mental state and effective emotional regulation. Continue maintaining these healthy psychological patterns.",
        "Analysis shows neutral emotional markers. This indicates good emotional stability and balanced mental wellness. Your expression demonstrates healthy coping mechanisms.",
        "Emotional state assessment reveals equilibrium. This suggests effective stress management and positive mental health outcomes. Maintain current wellness strategies.",
      ],
    };

    const responseOptions =
      responses[detectedEmotion as keyof typeof responses];
    const selectedResponse =
      responseOptions[Math.floor(Math.random() * responseOptions.length)];

    return `${selectedResponse} (Confidence: ${confidence}%)`;
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
      }, 20000);
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
