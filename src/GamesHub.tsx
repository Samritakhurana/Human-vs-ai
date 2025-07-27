import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Trophy, Users, Gamepad2, Zap, Target, Sparkles, ChevronRight, Search, Filter, ArrowLeft, Heart, Award, Crown, Medal } from 'lucide-react';
import FruitCatcher from './games/FruitCatcher';
import BubblePop from './games/BubblePop';
import MemoryMatch from './games/MemoryMatch';
import BreathingBubbles from './games/BreathingBubbles';
import ColorFlow from './games/ColorFlow';

// Game Data with stress relief focus
const GAMES_DATA = [
  {
    id: 'fruit-catcher',
    title: 'Fruit Catcher Deluxe',
    description: 'Catch falling fruits in this relaxing arcade game. Perfect for stress relief with smooth animations and satisfying combos!',
    category: 'Relaxation',
    difficulty: 'Easy',
    players: '1 Player',
    rating: 4.8,
    plays: 15420,
    tags: ['Relaxation', 'Casual', 'High Score', 'Stress Relief'],
    gradient: 'from-orange-400 to-red-500',
    icon: '🍎',
    route: '/fruit',
    features: ['Zen Mode', 'Combo System', 'Particle Effects', 'Smooth Controls'],
    screenshots: ['🍎🍊🍋', '🎯⭐💫', '🏆🎮🔥'],
    isNew: false,
    isPopular: true,
    stressRelief: 'High',
    levels: 10,
    awards: ['Speed Demon', 'Combo Master', 'Zen Master']
  },
  
  {
    id: 'bubble-pop',
    title: 'Bubble Pop Therapy',
    description: 'Pop colorful bubbles in this therapeutic game. Watch them burst with satisfying effects and feel your stress melt away!',
    category: 'Therapy',
    difficulty: 'Easy',
    players: '1 Player',
    rating: 4.9,
    plays: 18932,
    tags: ['Therapy', 'Relaxation', 'Visual', 'Satisfying'],
    gradient: 'from-blue-400 to-purple-600',
    icon: '🫧',
    route: '/bubble',
    features: ['Multiple Bubble Types', 'Chain Reactions', 'Relaxing Sounds', 'Visual Effects'],
    screenshots: ['🫧💙💜', '✨🎆🌟', '🎵🎶🎵'],
    isNew: true,
    isPopular: true,
    stressRelief: 'Very High',
    levels: 15,
    awards: ['Bubble Master', 'Chain Reaction', 'Zen Popper']
  },

  {
    id: 'memory-match',
    title: 'Memory Match Zen',
    description: 'Train your brain while relaxing with beautiful memory matching cards. Perfect for mental clarity and stress reduction.',
    category: 'Brain Training',
    difficulty: 'Medium',
    players: '1 Player',
    rating: 4.7,
    plays: 12543,
    tags: ['Brain Training', 'Memory', 'Focus', 'Calming'],
    gradient: 'from-green-400 to-emerald-600',
    icon: '🧩',
    route: '/memory',
    features: ['Beautiful Cards', 'Progressive Difficulty', 'Time Tracking', 'Achievement System'],
    screenshots: ['🧩🌸🌺', '🧠💡⚡', '🎯🏆📊'],
    isNew: false,
    isPopular: false,
    stressRelief: 'Medium',
    levels: 20,
    awards: ['Memory Master', 'Speed Thinker', 'Focus Champion']
  },

  {
    id: 'color-flow',
    title: 'Color Flow Meditation',
    description: 'Flow through beautiful color patterns in this meditative game. Let your mind wander as colors blend and flow.',
    category: 'Meditation',
    difficulty: 'Easy',
    players: '1 Player',
    rating: 4.6,
    plays: 9876,
    tags: ['Meditation', 'Visual', 'Flow', 'Mindfulness'],
    gradient: 'from-pink-400 to-indigo-600',
    icon: '🌈',
    route: '/colorflow',
    features: ['Smooth Animations', 'Color Therapy', 'Breathing Guide', 'Zen Mode'],
    screenshots: ['🌈🎨✨', '🧘‍♀️🌊💫', '🎵🎶🎵'],
    isNew: true,
    isPopular: false,
    stressRelief: 'Very High',
    levels: 12,
    awards: ['Color Master', 'Flow Artist', 'Zen Walker']
  },

  {
    id: 'breathing-game',
    title: 'Breathing Bubbles',
    description: 'Follow the rhythm of breathing bubbles. Inhale and exhale with the game for ultimate relaxation.',
    category: 'Breathing',
    difficulty: 'Easy',
    players: '1 Player',
    rating: 4.8,
    plays: 8754,
    tags: ['Breathing', 'Meditation', 'Health', 'Relaxation'],
    gradient: 'from-teal-400 to-cyan-600',
    icon: '🫁',
    route: '/breathing',
    features: ['Breathing Guide', 'Heart Rate Sync', 'Calming Sounds', 'Progress Tracking'],
    screenshots: ['🫁💨🌊', '💙💚💙', '🎵🎶🎵'],
    isNew: true,
    isPopular: true,
    stressRelief: 'Maximum',
    levels: 8,
    awards: ['Breathing Master', 'Zen Breather', 'Calm Soul']
  }
];

const CATEGORIES = ['All', 'Relaxation', 'Therapy', 'Brain Training', 'Meditation', 'Breathing'];

interface GamesHubProps {
  onBack: () => void;
}

const GamesHub: React.FC<GamesHubProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredGame, setFeaturedGame] = useState(GAMES_DATA[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [userStats, setUserStats] = useState({
    totalPlayTime: 0,
    gamesPlayed: 0,
    achievements: 0,
    stressLevel: 'High'
  });
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  // Rotate featured game between available games
  useEffect(() => {
    const availableGames = GAMES_DATA.filter(game => game.route);
    const interval = setInterval(() => {
      setFeaturedGame(prev => {
        const currentIndex = availableGames.findIndex(game => game.id === prev.id);
        const nextIndex = (currentIndex + 1) % availableGames.length;
        return availableGames[nextIndex];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredGames = GAMES_DATA.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'plays':
        return b.plays - a.plays;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'stress-relief':
        const stressLevels: { [key: string]: number } = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return stressLevels[b.stressRelief] - stressLevels[a.stressRelief];
      default: // popular
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  const playGame = (game: any) => {
    if (game.route) {
      setCurrentGame(game.id);
    } else {
      alert(`${game.title} is coming soon! Stay tuned for updates.`);
    }
  };

  const backToGames = () => {
    setCurrentGame(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStressReliefColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'text-purple-400 bg-purple-400/20';
      case 'High': return 'text-blue-400 bg-blue-400/20';
      case 'Medium': return 'text-green-400 bg-green-400/20';
      case 'Low': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  // Render current game or games list
  if (currentGame) {
    switch (currentGame) {
      case 'fruit-catcher':
        return <FruitCatcher onBack={backToGames} />;
      case 'bubble-pop':
        return <BubblePop onBack={backToGames} />;
      case 'memory-match':
        return <MemoryMatch onBack={backToGames} />;
      case 'breathing-game':
        return <BreathingBubbles onBack={backToGames} />;
      case 'color-flow':
        return <ColorFlow onBack={backToGames} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Game Coming Soon!</h2>
              <p className="text-lg mb-6">This game is under development. Stay tuned for updates!</p>
              <button
                onClick={backToGames}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Header */}
      <header className="relative bg-black/30 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              <div className="relative">
                <Gamepad2 className="w-10 h-10 text-yellow-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Stress Relief Hub
                </h1>
                <p className="text-sm text-gray-300">Take a break and relax with therapeutic games</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-xs font-bold animate-bounce">
                  RELAX
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full text-xs font-bold">
                  THERAPY
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="font-semibold">Stress Level: {userStats.stressLevel}</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">{userStats.achievements} Achievements</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        {/* Featured Game Hero Section */}
        <div className={`relative rounded-3xl p-8 mb-12 overflow-hidden bg-gradient-to-r ${featuredGame.gradient} shadow-2xl`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          
          <div className="relative z-10 flex items-center justify-between text-white">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{animationDuration: '3s'}} />
                <span className="text-lg font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  🌟 Featured Stress Relief
                </span>
                {featuredGame.isNew && (
                  <span className="text-sm font-bold bg-green-500 px-2 py-1 rounded-full animate-pulse">NEW!</span>
                )}
              </div>
              
              <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">{featuredGame.title}</h2>
              <p className="text-xl mb-6 opacity-90 leading-relaxed">{featuredGame.description}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <span className="font-semibold">{featuredGame.rating}/5</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{featuredGame.plays.toLocaleString()} plays</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">{featuredGame.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-red-300" />
                  <span className="font-semibold">{featuredGame.stressRelief} Relief</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {featuredGame.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                    ✨ {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">{featuredGame.levels} Levels</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Award className="w-4 h-4 text-purple-300" />
                  <span className="text-sm">{featuredGame.awards.length} Awards</span>
                </div>
              </div>
              
              <button
                onClick={() => playGame(featuredGame)}
                className={`px-10 py-4 bg-white text-black rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group shadow-2xl ${
                  !featuredGame.route ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-3xl'
                }`}
                disabled={!featuredGame.route}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform fill-current" />
                {featuredGame.route ? 'Start Relaxing' : 'Coming Soon'}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="text-[12rem] opacity-20 animate-bounce" style={{animationDuration: '3s'}}>
              {featuredGame.icon}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stress relief games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 border border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
                <option value="plays">Most Played</option>
                <option value="stress-relief">Stress Relief</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map(game => (
            <div
              key={game.id}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Game Status Badges */}
              <div className="absolute top-4 right-4 flex gap-2">
                {game.isNew && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                    NEW
                  </span>
                )}
                {game.isPopular && (
                  <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    HOT
                  </span>
                )}
                {!game.route && (
                  <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded-full">
                    SOON
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStressReliefColor(game.stressRelief)}`}>
                  {game.stressRelief}
                </span>
              </div>

              {/* Game Icon */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {game.icon}
              </div>

              {/* Game Info */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                {game.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                {game.description}
              </p>

              {/* Game Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">{game.plays.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm">{game.levels}</span>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {game.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Awards Preview */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Awards:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {game.awards.slice(0, 2).map((award, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {award}
                    </span>
                  ))}
                  {game.awards.length > 2 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                      +{game.awards.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => playGame(game)}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  game.route
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
                disabled={!game.route}
              >
                <Play className="w-5 h-5" />
                {game.route ? 'Start Relaxing' : 'Coming Soon'}
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <h3 className="text-2xl font-bold text-white mb-2">No stress relief games found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">{GAMES_DATA.length}</div>
              <div className="text-gray-300">Total Games</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{GAMES_DATA.filter(g => g.route).length}</div>
              <div className="text-gray-300">Available Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">
                {GAMES_DATA.reduce((sum, game) => sum + game.plays, 0).toLocaleString()}
              </div>
              <div className="text-gray-300">Total Plays</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {GAMES_DATA.reduce((sum, game) => sum + game.levels, 0)}
              </div>
              <div className="text-gray-300">Total Levels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">
                {GAMES_DATA.reduce((sum, game) => sum + game.awards.length, 0)}
              </div>
              <div className="text-gray-300">Total Awards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesHub; 