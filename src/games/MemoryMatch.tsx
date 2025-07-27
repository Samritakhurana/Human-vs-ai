import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, Star, Clock } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchProps {
  onBack: () => void;
}

const MemoryMatch: React.FC<MemoryMatchProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const emojis = ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '🌿', '🍀', '🌱', '🌲', '🌳', '🌴'];

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 6); // Use 6 pairs for 12 cards
    const gameCards = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!isPlaying || gameWon) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
        
        // Check if game is won
        setTimeout(() => {
          const allMatched = cards.every(card => card.isMatched || card.id === firstId || card.id === secondId);
          if (allMatched) {
            setGameWon(true);
            setIsPlaying(false);
            const finalScore = Math.max(1000 - (moves * 10) - (time * 2), 100);
            setBestScore(prev => Math.max(prev, finalScore));
          }
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      // Flip the card
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, isFlipped: true } : card
      ));
    }
  };

  // Timer
  useEffect(() => {
    if (!isPlaying || gameWon) return;

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameWon]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
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
              <span className="font-bold">Best: {bestScore}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <span className="font-bold">Moves: {moves}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-bold">{formatTime(time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={initializeGame}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Play className="w-4 h-4" />
          New Game
        </button>
        
        <button
          onClick={initializeGame}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Restart
        </button>
      </div>

      {/* Game Instructions */}
      {!isPlaying && !gameWon && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Memory Match Zen</h2>
            <p className="text-gray-600 mb-6">
              Find matching pairs of beautiful flowers. 
              Train your memory while relaxing with calming visuals.
            </p>
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Board */}
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <div className="grid grid-cols-4 gap-4 p-8">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-20 h-20 rounded-xl cursor-pointer transition-all duration-500 transform ${
                card.isFlipped || card.isMatched 
                  ? 'rotate-y-180 bg-white shadow-lg' 
                  : 'bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm hover:scale-105'
              } ${card.isMatched ? 'opacity-50' : ''}`}
              style={{
                transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-3xl">
                {(card.isFlipped || card.isMatched) ? card.emoji : '🌿'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Victory Modal */}
      {gameWon && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations! 🎉</h2>
            <div className="text-lg text-gray-600 mb-6 space-y-2">
              <p>You completed the game in {formatTime(time)}</p>
              <p>Total moves: {moves}</p>
              <p className="font-bold text-green-600">
                Score: {Math.max(1000 - (moves * 10) - (time * 2), 100)}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={initializeGame}
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

      {/* CSS for card flip animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `
      }} />
    </div>
  );
};

export default MemoryMatch; 