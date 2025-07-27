import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Heart } from 'lucide-react';

interface BreathingBubblesProps {
  onBack: () => void;
}

const BreathingBubbles: React.FC<BreathingBubblesProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(5);
  const [bubbleSize, setBubbleSize] = useState(100);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const breathingPattern = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    hold2: 2
  };

  const startBreathing = () => {
    setIsPlaying(true);
    setCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(breathingPattern.inhale);
    setBubbleSize(100);
    
    gameInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Move to next phase
          switch (currentPhase) {
            case 'inhale':
              setCurrentPhase('hold');
              setTimeLeft(breathingPattern.hold);
              setBubbleSize(150);
              break;
            case 'hold':
              setCurrentPhase('exhale');
              setTimeLeft(breathingPattern.exhale);
              setBubbleSize(200);
              break;
            case 'exhale':
              setCurrentPhase('hold2');
              setTimeLeft(breathingPattern.hold2);
              setBubbleSize(80);
              break;
            case 'hold2':
              if (cycle >= totalCycles) {
                setIsPlaying(false);
                return 0;
              }
              setCycle(prev => prev + 1);
              setCurrentPhase('inhale');
              setTimeLeft(breathingPattern.inhale);
              setBubbleSize(100);
              break;
          }
          return breathingPattern[currentPhase as keyof typeof breathingPattern];
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseBreathing = () => {
    setIsPlaying(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
  };

  const resetBreathing = () => {
    setIsPlaying(false);
    setCurrentPhase('inhale');
    setTimeLeft(4);
    setCycle(1);
    setBubbleSize(100);
    if (gameInterval.current) clearInterval(gameInterval.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, []);

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-green-400 to-blue-500';
      case 'hold': return 'from-blue-500 to-purple-500';
      case 'exhale': return 'from-purple-500 to-pink-500';
      case 'hold2': return 'from-pink-500 to-red-400';
      default: return 'from-green-400 to-blue-500';
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold2': return 'Hold';
      default: return 'Inhale';
    }
  };

  const getPhaseEmoji = () => {
    switch (currentPhase) {
      case 'inhale': return '🫁';
      case 'hold': return '⏸️';
      case 'exhale': return '💨';
      case 'hold2': return '⏸️';
      default: return '🫁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 relative overflow-hidden">
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
              <Heart className="w-4 h-4" />
              <span className="font-bold">Cycle {cycle}/{totalCycles}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">{timeLeft}s</span>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        {!isPlaying && (
          <button
            onClick={startBreathing}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Start Breathing
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={pauseBreathing}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}
        
        <button
          onClick={resetBreathing}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Breathing Instructions */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Breathing Bubbles</h2>
            <p className="text-gray-600 mb-6">
              Follow the rhythm of the breathing bubbles. 
              Inhale, hold, exhale, and hold again in a relaxing pattern.
            </p>
            <div className="text-sm text-gray-500 mb-6">
              <p>Pattern: Inhale (4s) → Hold (4s) → Exhale (6s) → Hold (2s)</p>
              <p>Complete {totalCycles} cycles for a full session.</p>
            </div>
            <button
              onClick={startBreathing}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Start Breathing
            </button>
          </div>
        </div>
      )}

      {/* Breathing Bubble */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative transition-all duration-1000 ease-in-out ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: bubbleSize,
            height: bubbleSize,
          }}
        >
          {/* Main Bubble */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${getPhaseColor()} shadow-2xl flex items-center justify-center text-white font-bold text-2xl transition-all duration-1000`}
            style={{
              boxShadow: `0 0 ${bubbleSize * 0.3}px rgba(255, 255, 255, 0.3)`,
            }}
          >
            {getPhaseEmoji()}
          </div>
          
          {/* Phase Text */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-white text-3xl font-bold mb-2">{getPhaseText()}</div>
            <div className="text-white/80 text-lg">{timeLeft}s</div>
          </div>
        </div>
      </div>

      {/* Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      {isPlaying && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex items-center gap-4 text-white">
              <span className="font-semibold">Progress:</span>
              <div className="flex gap-1">
                {[...Array(totalCycles)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i < cycle ? 'bg-green-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {!isPlaying && cycle > totalCycles && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Great Job! 🎉</h2>
            <p className="text-xl text-gray-600 mb-6">
              You've completed {totalCycles} breathing cycles. 
              Take a moment to notice how you feel.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startBreathing}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Do Another Session
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

export default BreathingBubbles; 