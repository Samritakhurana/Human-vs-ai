import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  popped: boolean;
}

interface BubblePopProps {
  onBack: () => void;
}

const BubblePop: React.FC<BubblePopProps> = ({ onBack }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const bubbleInterval = useRef<NodeJS.Timeout | null>(null);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

  const createBubble = (): Bubble => ({
    id: Date.now() + Math.random(),
    x: Math.random() * (window.innerWidth - 100),
    y: window.innerHeight + 50,
    size: Math.random() * 40 + 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 2 + 1,
    popped: false,
  });

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setBubbles([]);
    
    // Create new bubbles every 1.5 seconds
    bubbleInterval.current = setInterval(() => {
      setBubbles(prev => [...prev, createBubble()]);
    }, 1500);

    // Game timer
    gameInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (bubbleInterval.current) clearInterval(bubbleInterval.current);
  };

  const pauseGame = () => {
    setIsPlaying(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (bubbleInterval.current) clearInterval(bubbleInterval.current);
  };

  const resumeGame = () => {
    setIsPlaying(true);
    bubbleInterval.current = setInterval(() => {
      setBubbles(prev => [...prev, createBubble()]);
    }, 1500);
    gameInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === bubbleId 
          ? { ...bubble, popped: true }
          : bubble
      )
    );
    setScore(prev => prev + 10);
    
    // Play pop sound effect (if not muted)
    if (!isMuted) {
      // Create a simple pop sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  // Update bubble positions
  useEffect(() => {
    if (!isPlaying) return;

    const updateBubbles = () => {
      setBubbles(prev => 
        prev
          .map(bubble => ({
            ...bubble,
            y: bubble.y - bubble.speed,
          }))
          .filter(bubble => bubble.y > -50 && !bubble.popped)
      );
    };

    const animationInterval = setInterval(updateBubbles, 50);
    return () => clearInterval(animationInterval);
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      if (bubbleInterval.current) clearInterval(bubbleInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
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
              <span className="font-bold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Time: {timeLeft}s</span>
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
        {!isPlaying && !gameOver && (
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Start Game
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={pauseGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}
        
        {!isPlaying && !gameOver && timeLeft < 60 && (
          <button
            onClick={resumeGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
        )}
        
        <button
          onClick={() => {
            setBubbles([]);
            setScore(0);
            setTimeLeft(60);
            setGameOver(false);
            setIsPlaying(false);
            if (gameInterval.current) clearInterval(gameInterval.current);
            if (bubbleInterval.current) clearInterval(bubbleInterval.current);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl text-gray-600 mb-6">Final Score: {score}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Play Again
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

      {/* Game Instructions */}
      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bubble Pop Therapy</h2>
            <p className="text-gray-600 mb-6">
              Click on the bubbles to pop them and score points! 
              Relax and enjoy the satisfying popping sounds.
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Start Relaxing
            </button>
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <div 
        ref={canvasRef}
        className="w-full h-full relative"
        style={{ paddingTop: '80px' }}
      >
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              borderRadius: '50%',
              boxShadow: `0 0 20px ${bubble.color}40`,
              animation: bubble.popped ? 'pop 0.3s ease-out' : 'float 3s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pop {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `
      }} />
    </div>
  );
};

export default BubblePop; 