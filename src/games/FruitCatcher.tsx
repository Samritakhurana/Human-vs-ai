import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Star } from 'lucide-react';

interface Fruit {
  id: number;
  x: number;
  y: number;
  type: string;
  emoji: string;
  speed: number;
  caught: boolean;
}

interface FruitCatcherProps {
  onBack: () => void;
}

const FruitCatcher: React.FC<FruitCatcherProps> = ({ onBack }) => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const fruitInterval = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const fruitTypes = [
    { emoji: '🍎', points: 10 },
    { emoji: '🍊', points: 15 },
    { emoji: '🍌', points: 20 },
    { emoji: '🍓', points: 25 },
    { emoji: '🍇', points: 30 },
  ];

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    setFruits([]);
    setBasketX(50);
    
    // Create fruits every 2 seconds
    fruitInterval.current = setInterval(() => {
      const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
      const newFruit: Fruit = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: -50,
        type: randomFruit.emoji,
        emoji: randomFruit.emoji,
        speed: Math.random() * 2 + 1 + (level * 0.5),
        caught: false,
      };
      setFruits(prev => [...prev, newFruit]);
    }, 2000 - (level * 100)); // Faster as level increases

    // Game loop
    gameInterval.current = setInterval(() => {
      setFruits(prev => {
        const updatedFruits = prev.map(fruit => ({
          ...fruit,
          y: fruit.y + fruit.speed,
        })).filter(fruit => {
          // Check if fruit is caught by basket
          if (fruit.y >= 80 && fruit.y <= 90 && !fruit.caught) {
            const basketLeft = basketX - 5;
            const basketRight = basketX + 5;
                         if (fruit.x >= basketLeft && fruit.x <= basketRight) {
               // Fruit caught!
               const fruitType = fruitTypes.find(f => f.emoji === fruit.type);
               setScore(prev => prev + (fruitType?.points || 10));
               return false;
             }
          }
          
          // Check if fruit is missed (fell below screen)
          if (fruit.y > 100 && !fruit.caught) {
            setLives(prev => {
              if (prev <= 1) {
                setGameOver(true);
                setIsPlaying(false);
                return 0;
              }
              return prev - 1;
            });
            return false;
          }
          
          return fruit.y < 100;
        });
        
        return updatedFruits;
      });
    }, 50);
  };

  const pauseGame = () => {
    setIsPlaying(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (fruitInterval.current) clearInterval(fruitInterval.current);
  };

  const resumeGame = () => {
    setIsPlaying(true);
    fruitInterval.current = setInterval(() => {
      const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
      const newFruit: Fruit = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: -50,
        type: randomFruit.emoji,
        emoji: randomFruit.emoji,
        speed: Math.random() * 2 + 1 + (level * 0.5),
        caught: false,
      };
      setFruits(prev => [...prev, newFruit]);
    }, 2000 - (level * 100));

    gameInterval.current = setInterval(() => {
      setFruits(prev => {
        const updatedFruits = prev.map(fruit => ({
          ...fruit,
          y: fruit.y + fruit.speed,
        })).filter(fruit => {
          if (fruit.y >= 80 && fruit.y <= 90 && !fruit.caught) {
            const basketLeft = basketX - 5;
            const basketRight = basketX + 5;
                         if (fruit.x >= basketLeft && fruit.x <= basketRight) {
               const fruitType = fruitTypes.find(f => f.emoji === fruit.type);
               setScore(prev => prev + (fruitType?.points || 10));
               return false;
             }
          }
          
          if (fruit.y > 100 && !fruit.caught) {
            setLives(prev => {
              if (prev <= 1) {
                setGameOver(true);
                setIsPlaying(false);
                return 0;
              }
              return prev - 1;
            });
            return false;
          }
          
          return fruit.y < 100;
        });
        
        return updatedFruits;
      });
    }, 50);
  };

  // Handle mouse/touch movement
  useEffect(() => {
    if (!isPlaying) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(5, Math.min(95, x)));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(5, Math.min(95, x)));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlaying]);

  // Level up every 100 points
  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setLevel(prev => prev + 1);
    }
  }, [score]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      if (fruitInterval.current) clearInterval(fruitInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 relative overflow-hidden">
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
              <Star className="w-4 h-4" />
              <span className="font-bold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Level: {level}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Lives: {'❤️'.repeat(lives)}</span>
            </div>
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
        
        {!isPlaying && !gameOver && score > 0 && (
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
            setFruits([]);
            setScore(0);
            setLives(3);
            setLevel(1);
            setGameOver(false);
            setIsPlaying(false);
            setBasketX(50);
            if (gameInterval.current) clearInterval(gameInterval.current);
            if (fruitInterval.current) clearInterval(fruitInterval.current);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Game Instructions */}
      {!isPlaying && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fruit Catcher Deluxe</h2>
            <p className="text-gray-600 mb-6">
              Move your basket to catch falling fruits! 
              Don't let them fall to the ground.
            </p>
            <div className="text-sm text-gray-500 mb-6">
              <p>🍎 = 10 points | 🍊 = 15 points | 🍌 = 20 points</p>
              <p>🍓 = 25 points | 🍇 = 30 points</p>
            </div>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Start Catching
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
        {/* Falling Fruits */}
        {fruits.map(fruit => (
          <div
            key={fruit.id}
            className="absolute text-4xl transition-all duration-100"
            style={{
              left: `${fruit.x}%`,
              top: `${fruit.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {fruit.emoji}
          </div>
        ))}

        {/* Basket */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-6xl transition-all duration-100"
          style={{
            left: `${basketX}%`,
          }}
        >
          🧺
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl text-gray-600 mb-6">Final Score: {score}</p>
            <p className="text-lg text-gray-600 mb-6">Level Reached: {level}</p>
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
    </div>
  );
};

export default FruitCatcher; 