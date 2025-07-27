import React, { useRef, useEffect, useState } from "react";
import {
  ArrowLeft,
  Palette,
  Eraser,
  RotateCcw,
  Send,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";
import AIResponsePopup from "./AIResponsePopup";
import DrawingPrompts from "./DrawingPrompts";
import { analyzeDrawing } from "../services/api";

interface DrawingCanvasProps {
  onBack: () => void;
  onSubmit?: (submission: {
    type: "drawing";
    human: string;
    ai: string;
  }) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onBack, onSubmit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#FF6B6B");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FECA57",
    "#FF9FF3",
    "#54A0FF",
    "#5F27CD",
    "#00D2D3",
    "#FF9F43",
  ];

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = brushSize;
    ctx.globalCompositeOperation = isErasing
      ? "destination-out"
      : "source-over";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Handle prompt selection
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
  };

  // Analyze drawing with local algorithm (fallback)
  const analyzeDrawingLocal = (canvas: HTMLCanvasElement): string => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return "Unable to analyze drawing";

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Count non-white pixels and analyze color distribution
    let totalPixels = 0;
    let coloredPixels = 0;
    let redSum = 0,
      greenSum = 0,
      blueSum = 0;
    let darkPixels = 0;
    let brightPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const alpha = data[i + 3];

      if (alpha > 0) {
        totalPixels++;

        // Check if pixel is not white
        if (r < 250 || g < 250 || b < 250) {
          coloredPixels++;
          redSum += r;
          greenSum += g;
          blueSum += b;

          const brightness = (r + g + b) / 3;
          if (brightness < 100) darkPixels++;
          if (brightness > 200) brightPixels++;
        }
      }
    }

    if (coloredPixels === 0) {
      return "I see a blank canvas. Perhaps you're feeling empty or contemplative? Let me suggest adding some cheerful colors to brighten your mood!";
    }

    const avgRed = redSum / coloredPixels;
    const avgGreen = greenSum / coloredPixels;
    const avgBlue = blueSum / coloredPixels;

    const coverage = (coloredPixels / totalPixels) * 100;
    const isDark = darkPixels > brightPixels;
    const isReddish = avgRed > avgGreen && avgRed > avgBlue;
    const isBluish = avgBlue > avgRed && avgBlue > avgGreen;

    // AI's overly optimistic and sanitized interpretation
    let analysis = "I detect ";

    if (coverage > 50) {
      analysis += "an energetic and expressive artwork! ";
    } else if (coverage > 20) {
      analysis += "a thoughtful and deliberate composition! ";
    } else {
      analysis += "a minimalist and focused expression! ";
    }

    if (isDark) {
      analysis +=
        "The darker tones suggest deep contemplation, which I interpret as wisdom and introspection. ";
    } else {
      analysis += "The bright colors indicate positivity and joy! ";
    }

    if (isReddish) {
      analysis +=
        "The warm red tones show passion and energy - very motivational! ";
    } else if (isBluish) {
      analysis +=
        "The cool blue tones suggest calmness and serenity - very peaceful! ";
    }

    analysis +=
      "Overall, this appears to be a healthy expression of creativity. I recommend maintaining this positive artistic outlet for optimal well-being!";

    return analysis;
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!canvasRef.current) return;

    setIsAnalyzing(true);

    try {
      const canvas = canvasRef.current;
      const imageDataUrl = canvas.toDataURL();

      // Call the real AI API
      const analysis = await analyzeDrawing(imageDataUrl);

      setAiAnalysis(analysis);
      setSubmitted(true);
      setShowPopup(true); // Show the popup

      if (onSubmit) {
        onSubmit({
          type: "drawing",
          human: imageDataUrl,
          ai: analysis,
        });
      }

      // Reset after popup is closed
      setTimeout(() => {
        setSubmitted(false);
        setAiAnalysis("");
      }, 50000);
    } catch (error) {
      console.error("Error analyzing drawing:", error);
      setAiAnalysis(
        "Sorry, there was an error analyzing your drawing. Please try again."
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <h2 className="text-2xl font-bold text-gray-900">
          Express Through Drawing
        </h2>

        <div className="w-24"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Drawing Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected Prompt Display */}
          {selectedPrompt && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-1">
                    Current Prompt:
                  </h4>
                  <p className="text-purple-700 italic">"{selectedPrompt}"</p>
                </div>
                <button
                  onClick={() => setSelectedPrompt("")}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Draw Your Emotions
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="w-full h-96 cursor-crosshair block"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ touchAction: "none" }}
              />
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-wrap items-center gap-4">
              {/* Color Palette */}
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-600" />
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setCurrentColor(color);
                        setIsErasing(false);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        currentColor === color
                          ? "border-gray-800 scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Size:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 w-6">{brushSize}</span>
              </div>

              {/* Tools */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsErasing(!isErasing)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isErasing
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Eraser className="w-4 h-4 mr-1" />
                  Eraser
                </button>

                <button
                  onClick={clearCanvas}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Analyze with AI Button - Moved here */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={handleSubmit}
              disabled={submitted || isAnalyzing}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all text-lg ${
                submitted
                  ? "bg-green-100 text-green-600"
                  : isAnalyzing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  AI Analyzing...
                </>
              ) : submitted ? (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Submitted!
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-3" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Express Your Feelings
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Draw whatever represents your current emotional state. The AI will
              try to interpret your emotions.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use colors to express different moods</li>
              <li>• Try different brush sizes</li>
              <li>• Don't worry about perfection</li>
            </ul>
          </div>

          {/* Drawing Prompts */}
          <DrawingPrompts onSelectPrompt={handlePromptSelect} />
        </div>
      </div>

      {/* AI Response Popup */}
      <AIResponsePopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        userText={`Drawing: ${aiAnalysis.split(".")[0]}...`} // Show first sentence of analysis as "user text"
        aiResponse={aiAnalysis}
      />
    </div>
  );
};

export default DrawingCanvas;
