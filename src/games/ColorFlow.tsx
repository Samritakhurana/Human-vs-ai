import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Palette } from 'lucide-react';

interface ColorFlowProps {
  onBack: () => void;
}

const ColorFlow: React.FC<ColorFlowProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColor, setCurrentColor] = useState(0);
  const [flowSpeed, setFlowSpeed] = useState(1);
  const [sessionTime, setSessionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    'from-pink-400 to-indigo-600',
    'from-purple-400 to-pink-600',
    'from-indigo-400 to-purple-600',
    'from-blue-400 to-indigo-600',
    'from-cyan-400 to-blue-600',
    'from-teal-400 to-cyan-600',
    'from-green-400 to-teal-600',
    'from-emerald-400 to-green-600',
  ];

  const startFlow = () => {
    setIsPlaying(true);
    setSessionTime(0);
    setCurrentColor(0);
    
    // Color transition timer
    gameInterval.current = setInterval(() => {
      setCurrentColor(prev => (prev + 1) % colors.length);
    }, 3000 / flowSpeed);

    // Session timer
    timerInterval.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
  };

  const pauseFlow = () => {
    setIsPlaying(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  const resetFlow = () => {
    setIsPlaying(false);
    setSessionTime(0);
    setCurrentColor(0);
    setFlowSpeed(1);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  const changeSpeed = (newSpeed: number) => {
    setFlowSpeed(newSpeed);
    if (isPlaying) {
      if (gameInterval.current) clearInterval(gameInterval.current);
      gameInterval.current = setInterval(() => {
        setCurrentColor(prev => (prev + 1) % colors.length);
      }, 3000 / newSpeed);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors[currentColor]} relative overflow-hidden transition-all duration-2000`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between text-white">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Palette className="w-4 h-4" />
              <span className="font-bold">Color {currentColor + 1}/{colors.length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Time: {formatTime(sessionTime)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Speed: {flowSpeed}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        {!isPlaying && (
          <button
            onClick={startFlow}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Start Flow
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={pauseFlow}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}
        
        <button
          onClick={resetFlow}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Speed Controls */}
      <div className="absolute top-20 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Flow Speed</h3>
        <div className="flex flex-col gap-2">
          {[0.5, 1, 1.5, 2].map(speed => (
            <button
              key={speed}
              onClick={() => changeSpeed(speed)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                flowSpeed === speed 
                  ? 'bg-white text-gray-800' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Game Instructions */}
      {!isPlaying && sessionTime === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Color Flow Meditation</h2>
            <p className="text-gray-600 mb-6">
              Watch the colors flow and change. Let your mind wander as the beautiful 
              gradients shift and blend. Adjust the speed to your preference.
            </p>
            <button
              onClick={startFlow}
              className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Start Flowing
            </button>
          </div>
        </div>
      )}

      {/* Flowing Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          />
        ))}
      </div>

      {/* Central Meditation Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 animate-spin" style={{animationDuration: '20s'}} />
          
          {/* Middle Ring */}
          <div className="absolute inset-8 w-48 h-48 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
          
          {/* Inner Circle */}
          <div className="absolute inset-16 w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-4xl font-bold">🧘‍♀️</div>
          </div>
        </div>
      </div>

      {/* Session Stats */}
      {isPlaying && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="text-white text-center">
              <div className="text-lg font-semibold">Meditation Session</div>
              <div className="text-sm opacity-80">Let the colors guide your thoughts</div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {!isPlaying && sessionTime > 0 && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Peaceful Session 🌸</h2>
            <p className="text-xl text-gray-600 mb-6">
              You've been flowing with colors for {formatTime(sessionTime)}. 
              Take a moment to notice how you feel.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startFlow}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Flowing
              </button>
              <button
                onClick={onBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorFlow; 