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
// import VotingSystem from "./components/VotingSystem";
import ResultsGallery from "./components/ResultsGallery";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("humanvsai-submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load submissions:", e);
      }
    }
  }, []);

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("humanvsai-submissions", JSON.stringify(submissions));
  }, [submissions]);

  const handleSubmission = (submission: {
    type: "drawing" | "text";
    human: string;
    ai: string;
  }) => {
    const newSubmission: Submission = {
      id: Date.now().toString(),
      ...submission,
      votes: 0,
      timestamp: Date.now(),
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const handleVote = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId ? { ...sub, votes: sub.votes + 1 } : sub
      )
    );
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
