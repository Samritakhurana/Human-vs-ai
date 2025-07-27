import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  Heart,
  Palette,
  MessageCircle,
  Vote,
  GalleryVertical as Gallery,
  Home,
} from "lucide-react";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DrawingCanvas from "./components/DrawingCanvas";
import TextInput from "./components/TextInput";
import VotingSystem from "./components/VotingSystem";
import ResultsGallery from "./components/ResultsGallery";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  saveSubmission,
  getSubmissions,
  voteSubmission,
  Submission as BackendSubmission,
} from "./services/api";

type Page = "landing" | "home" | "draw" | "text" | "vote" | "gallery";

interface Submission {
  id: string;
  type: "drawing" | "text";
  human: string;
  ai: string;
  votes: number;
  timestamp: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load submissions from backend on mount
  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const backendSubmissions = await getSubmissions();
        // Convert backend format to frontend format
        const convertedSubmissions: Submission[] = backendSubmissions.map(
          (sub) => ({
            id: sub.id.toString(),
            type: sub.type as "drawing" | "text",
            human: sub.user_content,
            ai: sub.ai_response,
            votes: sub.votes,
            timestamp: Date.now(), // Backend doesn't have timestamp, so use current time
          })
        );
        setSubmissions(convertedSubmissions);
      } catch (error) {
        console.error("Failed to load submissions from backend:", error);
      }
    };

    loadSubmissions();
  }, []);

  const handleSubmission = async (submission: {
    type: "drawing" | "text";
    human: string;
    ai: string;
  }) => {
    try {
      // Save to backend
      const backendSubmission: Omit<BackendSubmission, "id"> = {
        type: submission.type,
        user_content: submission.human,
        ai_response: submission.ai,
        votes: 0,
      };

      const savedSubmission = await saveSubmission(backendSubmission);

      // Convert to frontend format and add to state
      const newSubmission: Submission = {
        id: savedSubmission.id.toString(),
        type: savedSubmission.type as "drawing" | "text",
        human: savedSubmission.user_content,
        ai: savedSubmission.ai_response,
        votes: savedSubmission.votes,
        timestamp: Date.now(),
      };

      setSubmissions((prev) => [newSubmission, ...prev]);
    } catch (error) {
      console.error("Failed to save submission:", error);
      // Fallback to local storage if backend fails
      const newSubmission: Submission = {
        id: Date.now().toString(),
        ...submission,
        votes: 0,
        timestamp: Date.now(),
      };
      setSubmissions((prev) => [newSubmission, ...prev]);
    }
  };

  const handleVote = async (submissionId: string) => {
    try {
      // Vote on backend
      const updatedSubmission = await voteSubmission(parseInt(submissionId));

      // Update local state
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === submissionId
            ? { ...sub, votes: updatedSubmission.votes }
            : sub
        )
      );
    } catch (error) {
      console.error("Failed to vote on submission:", error);
      // Fallback to local update if backend fails
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === submissionId ? { ...sub, votes: sub.votes + 1 } : sub
        )
      );
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onEnterApp={() => setCurrentPage("home")} />;
      case "draw":
        return (
          <DrawingCanvas
            onBack={() => setCurrentPage("home")}
            onSubmit={handleSubmission}
          />
        );
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "text":
        return (
          <TextInput
            onBack={() => setCurrentPage("home")}
            onSubmit={handleSubmission}
          />
        );
      case "vote":
        return (
          <VotingSystem
            onBack={() => setCurrentPage("home")}
            submissions={submissions}
            onVote={handleVote}
          />
        );
      case "gallery":
        return (
          <ResultsGallery
            onBack={() => setCurrentPage("home")}
            submissions={submissions}
            onNavigate={setCurrentPage}
          />
        );
      default:
        return <h2>Page not found</h2>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col">
      <Header onNavigate={setCurrentPage} />
      <div className="flex-1 max-w-7xl mx-auto p-4 w-full">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default App;
