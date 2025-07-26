import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Palette,
  MessageSquare,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Award,
  Trophy,
  Medal,
  Crown,
} from "lucide-react";

interface Submission {
  id: string;
  type: "drawing" | "text";
  human: string;
  ai: string;
  votes: number;
  timestamp: number;
}

interface VotingSystemProps {
  onBack: () => void;
  submissions: Submission[];
  onVote: (submissionId: string) => void;
}

const VotingSystem: React.FC<VotingSystemProps> = ({
  onBack,
  submissions,
  onVote,
}) => {
  const [votedSubmissions, setVotedSubmissions] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("voted-submissions") || "[]"))
  );

  const handleVote = (submissionId: string) => {
    if (!votedSubmissions.has(submissionId)) {
      onVote(submissionId);
      const newVoted = new Set(votedSubmissions).add(submissionId);
      setVotedSubmissions(newVoted);
      localStorage.setItem("voted-submissions", JSON.stringify([...newVoted]));
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const getRankIcon = (votes: number, index: number) => {
    if (votes === 0) return null;

    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-purple-500" />;
    }
  };

  const sortedSubmissions = [...submissions].sort((a, b) => b.votes - a.votes);

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
          Vote & View Submissions
        </h2>

        <div className="text-sm text-gray-500">
          {submissions.length} submissions
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600">
            {submissions.length}
          </div>
          <div className="text-gray-600">Total Submissions</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600">
            {submissions.reduce((sum, sub) => sum + sub.votes, 0)}
          </div>
          <div className="text-gray-600">Total Votes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600">
            {votedSubmissions.size}
          </div>
          <div className="text-gray-600">Your Votes</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600">
            {Math.round(
              (submissions.filter((s) => s.votes > 0).length /
                Math.max(submissions.length, 1)) *
                100
            )}
            %
          </div>
          <div className="text-gray-600">Voted On</div>
        </div>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-6">
          {sortedSubmissions.map((submission, index) => (
            <div
              key={submission.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
            >
              {/* Rank Badge */}
              {submission.votes > 0 && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                    {getRankIcon(submission.votes, index)}#{index + 1}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-4 pr-20">
                <div className="flex items-center gap-3">
                  {submission.type === "drawing" ? (
                    <Palette className="w-6 h-6 text-purple-500" />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      {submission.type} Expression
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTimeAgo(submission.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        {submission.votes} votes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vote Button */}
                <button
                  onClick={() => handleVote(submission.id)}
                  disabled={votedSubmissions.has(submission.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    votedSubmissions.has(submission.id)
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-purple-500 text-white hover:bg-purple-600 hover:scale-105"
                  }`}
                >
                  {votedSubmissions.has(submission.id) ? (
                    <>
                      <ThumbsUp className="w-4 h-4" />
                      Voted
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      Vote for Human
                    </>
                  )}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Human Expression
                  </h4>
                  {submission.type === "drawing" ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-2 bg-gray-50">
                      <img
                        src={submission.human}
                        alt="Human drawing"
                        className="w-full h-auto rounded-lg max-h-48 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <p className="text-gray-700 font-handwriting leading-relaxed">
                        "{submission.human}"
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-green-600 font-medium">
                    ✨ Authentic & Raw
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    AI Interpretation
                  </h4>
                  <div className="p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {submission.ai}
                    </p>
                  </div>
                  <p className="text-xs text-blue-600 font-medium">
                    🤖 Clinical & Sanitized
                  </p>
                </div>
              </div>

              {/* Vote Status */}
              {votedSubmissions.has(submission.id) && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                    <ThumbsUp className="w-4 h-4" />
                    You voted for the human expression!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <div className="text-8xl mb-6">🗳️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No submissions to vote on yet!
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Create some submissions first, then come back to vote on them.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onBack()}
              className="px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold text-lg"
            >
              Go Create Something
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingSystem;
