"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  question: string;
  options: { label: string; score: Record<string, number> }[];
};

const questions: Question[] = [
  {
    id: "q1",
    question: "What is your primary goal?",
    options: [
      { label: "Build what users see and interact with", score: { frontend: 3, mobile: 2 } },
      { label: "Handle data, servers, and business logic", score: { backend: 3, data: 1 } },
      { label: "Build mobile apps for iOS and Android", score: { mobile: 3, frontend: 1 } },
      { label: "Automate deployments, scale infrastructure", score: { devops: 3, backend: 1 } },
    ],
  },
  {
    id: "q2",
    question: "How do you prefer to solve problems?",
    options: [
      { label: "Visually – I like seeing my changes instantly", score: { frontend: 2, mobile: 2 } },
      { label: "Logically – I prefer structuring data and APIs", score: { backend: 2, data: 2 } },
      { label: "Systematically – I like connecting and securing systems", score: { devops: 2, backend: 1 } },
    ],
  },
  {
    id: "q3",
    question: "How much coding experience do you have?",
    options: [
      { label: "Complete beginner (Start with HTML/CSS or Python)", score: { frontend: 1, python: 3 } },
      { label: "I know basic syntax, ready to build", score: { frontend: 1, backend: 1, mobile: 1 } },
      { label: "I have some experience, want to specialize", score: { devops: 1, data: 1 } },
    ],
  },
];

const roadmaps = {
  frontend: { title: "Frontend Developer", href: "/roadmaps/frontend-developer", detail: "HTML, CSS, React, Next.js" },
  backend: { title: "Backend Developer", href: "/roadmaps/backend-developer", detail: "Node.js, APIs, Databases" },
  devops: { title: "DevOps Engineer", href: "/roadmaps/devops-engineer", detail: "Linux, Docker, CI/CD" },
  mobile: { title: "Mobile Developer", href: "/roadmaps/mobile-developer", detail: "React Native, Flutter, Swift" },
  data: { title: "Data Scientist", href: "/roadmaps/data-scientist", detail: "Python, ML, Data Analysis" },
  python: { title: "Python Developer", href: "/roadmaps/python", detail: "Python basics to advanced" },
};

export default function RoadmapQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<keyof typeof roadmaps | null>(null);

  const handleSelect = (optionScore: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(optionScore).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      let maxScore = -1;
      let topRoadmap = "frontend";
      Object.entries(newScores).forEach(([key, value]) => {
        if (value > maxScore) {
          maxScore = value;
          topRoadmap = key;
        }
      });
      setResult(topRoadmap as keyof typeof roadmaps);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setResult(null);
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-[#090909] p-8 max-w-2xl mx-auto shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-white">Which roadmap is right for me?</h2>
        <p className="mt-2 text-sm text-zinc-400">Take this 3-question quiz to find your perfect starting point.</p>
      </div>

      {!result ? (
        <div>
          <div className="mb-4 flex justify-between items-center text-xs font-bold text-zinc-500 uppercase">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full mb-6">
            <div 
              className="h-full bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-xl font-bold text-white mb-6">
            {questions[currentStep].question}
          </h3>

          <div className="grid gap-3">
            {questions[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.score)}
                className="text-left w-full rounded-md border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-red-500 hover:bg-red-950/20 text-sm font-medium text-zinc-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="text-xl font-medium text-zinc-300 mb-2">We recommend:</h3>
          <h2 className="text-3xl font-black text-white mb-3">
            {roadmaps[result].title}
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            Based on your answers, this roadmap matches your goals and experience. It covers {roadmaps[result].detail}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href={roadmaps[result].href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-red-500 px-6 text-sm font-black text-white transition hover:bg-red-400"
            >
              Start {roadmaps[result].title}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
            <button
              onClick={resetQuiz}
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-700 bg-transparent px-6 text-sm font-black text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
