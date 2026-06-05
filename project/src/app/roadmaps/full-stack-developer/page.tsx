"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official Docs" | "Video" | "Practice" | "Community";

type Resource = {
  label: string;
  href: string;
  category: ResourceCategory;
};

type RoadmapNode = {
  id: string;
  title: string;
  stage: Stage;
  difficulty: Difficulty;
  duration: string;
  description: string;
  prerequisites: string[];
  topics: string[];
  skillsGained: string[];
  learningOutcomes: string[];
  resources: Resource[];
  practiceExercises: string[];
  miniProject: string;
  realWorldApplications: string[];
  quiz: string;
};

type StageSummary = {
  stage: Stage;
  duration: string;
  outcome: string;
};

type ProjectTrack = {
  stage: Stage;
  projects: string[];
};

const storageKeys = {
  completed: "demontech-full-stack-roadmap-completed",
  bookmarked: "demontech-full-stack-roadmap-bookmarked",
  notes: "demontech-full-stack-roadmap-notes",
};

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "16-20 weeks",
    outcome: "Build accessible pages, style responsive UIs, write JavaScript and TypeScript, and collaborate with Git.",
  },
  {
    stage: "Intermediate",
    duration: "26-34 weeks",
    outcome: "Ship React and Next.js apps with backend APIs, databases, authentication, and typed data access.",
  },
  {
    stage: "Advanced",
    duration: "20-28 weeks",
    outcome: "Improve state, testing, performance, CI/CD, Docker, cloud deployments, observability, and architecture.",
  },
  {
    stage: "Expert",
    duration: "18-26 weeks",
    outcome: "Design distributed platforms, advanced frontend/backend systems, production engineering, and leadership paths.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    "id": "internet-fundamentals",
    "title": "Internet Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "2 weeks",
    "description": "Internet Fundamentals connects How the Web Works, DNS, HTTP/HTTPS into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Basic computer literacy"
    ],
    "topics": [
      "How the Web Works",
      "DNS",
      "HTTP/HTTPS",
      "Browsers",
      "Client vs Server",
      "TCP/IP Basics",
      "Hosting & Domains"
    ],
    "skillsGained": [
      "Apply How the Web Works in production-style work",
      "Connect DNS with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Internet Fundamentals fits in a full-stack product",
      "Choose appropriate tools and patterns for How the Web Works",
      "Ship a small feature using How the Web Works and DNS"
    ],
    "resources": [
      {
        "label": "MDN web mechanics",
        "href": "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics",
        "category": "Official Docs"
      },
      {
        "label": "Cloudflare Learning Center",
        "href": "https://www.cloudflare.com/learning/",
        "category": "Official Docs"
      },
      {
        "label": "HTTP Status practice",
        "href": "https://http.cat/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for How the Web Works.",
      "Write notes comparing How the Web Works vs DNS.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a internet fundamentals module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Internet Fundamentals to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "html5",
    "title": "HTML5",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "2 weeks",
    "description": "HTML5 connects Semantic HTML, Forms, Accessibility Basics into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Internet Fundamentals"
    ],
    "topics": [
      "Semantic HTML",
      "Forms",
      "Accessibility Basics",
      "SEO Fundamentals"
    ],
    "skillsGained": [
      "Apply Semantic HTML in production-style work",
      "Connect Forms with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where HTML5 fits in a full-stack product",
      "Choose appropriate tools and patterns for Semantic HTML",
      "Ship a small feature using Semantic HTML and Forms"
    ],
    "resources": [
      {
        "label": "MDN HTML",
        "href": "https://developer.mozilla.org/en-US/docs/Web/HTML",
        "category": "Official Docs"
      },
      {
        "label": "web.dev Learn HTML",
        "href": "https://web.dev/learn/html",
        "category": "Practice"
      },
      {
        "label": "WAI forms tutorial",
        "href": "https://www.w3.org/WAI/tutorials/forms/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Semantic HTML.",
      "Write notes comparing Semantic HTML vs Forms.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a html5 module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain HTML5 to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "css3",
    "title": "CSS3",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "3 weeks",
    "description": "CSS3 connects Selectors, Responsive Design, Flexbox into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "HTML5"
    ],
    "topics": [
      "Selectors",
      "Responsive Design",
      "Flexbox",
      "CSS Grid",
      "Animations"
    ],
    "skillsGained": [
      "Apply Selectors in production-style work",
      "Connect Responsive Design with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where CSS3 fits in a full-stack product",
      "Choose appropriate tools and patterns for Selectors",
      "Ship a small feature using Selectors and Responsive Design"
    ],
    "resources": [
      {
        "label": "MDN CSS",
        "href": "https://developer.mozilla.org/en-US/docs/Web/CSS",
        "category": "Official Docs"
      },
      {
        "label": "CSS Tricks guides",
        "href": "https://css-tricks.com/guides/",
        "category": "Community"
      },
      {
        "label": "Flexbox Froggy",
        "href": "https://flexboxfroggy.com/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Selectors.",
      "Write notes comparing Selectors vs Responsive Design.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a css3 module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain CSS3 to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "styling-tools",
    "title": "Styling Tools",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Styling Tools connects Sass/SCSS, Tailwind CSS into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "CSS3"
    ],
    "topics": [
      "Sass/SCSS",
      "Tailwind CSS"
    ],
    "skillsGained": [
      "Apply Sass/SCSS in production-style work",
      "Connect Tailwind CSS with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Styling Tools fits in a full-stack product",
      "Choose appropriate tools and patterns for Sass/SCSS",
      "Ship a small feature using Sass/SCSS and Tailwind CSS"
    ],
    "resources": [
      {
        "label": "Tailwind CSS docs",
        "href": "https://tailwindcss.com/docs",
        "category": "Official Docs"
      },
      {
        "label": "Sass docs",
        "href": "https://sass-lang.com/documentation/",
        "category": "Official Docs"
      },
      {
        "label": "shadcn/ui",
        "href": "https://ui.shadcn.com/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Sass/SCSS.",
      "Write notes comparing Sass/SCSS vs Tailwind CSS.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a styling tools module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Styling Tools to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "javascript",
    "title": "JavaScript",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "5 weeks",
    "description": "JavaScript connects Variables, Functions, Arrays into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Styling Tools"
    ],
    "topics": [
      "Variables",
      "Functions",
      "Arrays",
      "Objects",
      "DOM Manipulation",
      "ES6+",
      "Async/Await",
      "Fetch API"
    ],
    "skillsGained": [
      "Apply Variables in production-style work",
      "Connect Functions with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where JavaScript fits in a full-stack product",
      "Choose appropriate tools and patterns for Variables",
      "Ship a small feature using Variables and Functions"
    ],
    "resources": [
      {
        "label": "MDN JavaScript",
        "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        "category": "Official Docs"
      },
      {
        "label": "JavaScript.info",
        "href": "https://javascript.info/",
        "category": "Community"
      },
      {
        "label": "freeCodeCamp JavaScript",
        "href": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Variables.",
      "Write notes comparing Variables vs Functions.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a javascript module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain JavaScript to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "typescript",
    "title": "TypeScript",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "TypeScript connects Types, Interfaces, Generics into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "JavaScript"
    ],
    "topics": [
      "Types",
      "Interfaces",
      "Generics",
      "Type Safety"
    ],
    "skillsGained": [
      "Apply Types in production-style work",
      "Connect Interfaces with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where TypeScript fits in a full-stack product",
      "Choose appropriate tools and patterns for Types",
      "Ship a small feature using Types and Interfaces"
    ],
    "resources": [
      {
        "label": "TypeScript handbook",
        "href": "https://www.typescriptlang.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Type Challenges",
        "href": "https://github.com/type-challenges/type-challenges",
        "category": "Practice"
      },
      {
        "label": "Total TypeScript",
        "href": "https://www.totaltypescript.com/",
        "category": "Video"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Types.",
      "Write notes comparing Types vs Interfaces.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a typescript module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain TypeScript to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "git-and-github",
    "title": "Git & GitHub",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Git & GitHub connects Version Control, Branching, Pull Requests into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "TypeScript"
    ],
    "topics": [
      "Version Control",
      "Branching",
      "Pull Requests",
      "Collaboration Workflow"
    ],
    "skillsGained": [
      "Apply Version Control in production-style work",
      "Connect Branching with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Git & GitHub fits in a full-stack product",
      "Choose appropriate tools and patterns for Version Control",
      "Ship a small feature using Version Control and Branching"
    ],
    "resources": [
      {
        "label": "Git docs",
        "href": "https://git-scm.com/doc",
        "category": "Official Docs"
      },
      {
        "label": "GitHub Skills",
        "href": "https://skills.github.com/",
        "category": "Practice"
      },
      {
        "label": "DemonTech Git roadmap",
        "href": "/roadmaps/git",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Version Control.",
      "Write notes comparing Version Control vs Branching.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a git & github module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Git & GitHub to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "package-managers",
    "title": "Package Managers",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Package Managers connects npm, pnpm, yarn into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Git & GitHub"
    ],
    "topics": [
      "npm",
      "pnpm",
      "yarn"
    ],
    "skillsGained": [
      "Apply npm in production-style work",
      "Connect pnpm with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Package Managers fits in a full-stack product",
      "Choose appropriate tools and patterns for npm",
      "Ship a small feature using npm and pnpm"
    ],
    "resources": [
      {
        "label": "npm docs",
        "href": "https://docs.npmjs.com/",
        "category": "Official Docs"
      },
      {
        "label": "pnpm docs",
        "href": "https://pnpm.io/motivation",
        "category": "Official Docs"
      },
      {
        "label": "Yarn docs",
        "href": "https://yarnpkg.com/getting-started",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for npm.",
      "Write notes comparing npm vs pnpm.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a package managers module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Package Managers to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "react-js",
    "title": "React.js",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "React.js connects Components, Hooks, State Management into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Package Managers"
    ],
    "topics": [
      "Components",
      "Hooks",
      "State Management",
      "Context API"
    ],
    "skillsGained": [
      "Apply Components in production-style work",
      "Connect Hooks with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where React.js fits in a full-stack product",
      "Choose appropriate tools and patterns for Components",
      "Ship a small feature using Components and Hooks"
    ],
    "resources": [
      {
        "label": "React docs",
        "href": "https://react.dev/learn",
        "category": "Official Docs"
      },
      {
        "label": "React patterns",
        "href": "https://www.patterns.dev/react",
        "category": "Community"
      },
      {
        "label": "Epic React",
        "href": "https://www.epicreact.dev/",
        "category": "Video"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Components.",
      "Write notes comparing Components vs Hooks.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a react.js module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain React.js to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "next-js",
    "title": "Next.js",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "Next.js connects App Router, Server Components, API Routes into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "React.js"
    ],
    "topics": [
      "App Router",
      "Server Components",
      "API Routes",
      "Middleware",
      "Deployment"
    ],
    "skillsGained": [
      "Apply App Router in production-style work",
      "Connect Server Components with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Next.js fits in a full-stack product",
      "Choose appropriate tools and patterns for App Router",
      "Ship a small feature using App Router and Server Components"
    ],
    "resources": [
      {
        "label": "Next.js docs",
        "href": "https://nextjs.org/docs",
        "category": "Official Docs"
      },
      {
        "label": "Vercel templates",
        "href": "https://vercel.com/templates/next.js",
        "category": "Practice"
      },
      {
        "label": "Next.js Learn",
        "href": "https://nextjs.org/learn",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for App Router.",
      "Write notes comparing App Router vs Server Components.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a next.js module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Next.js to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "frontend-architecture",
    "title": "Frontend Architecture",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Frontend Architecture connects Folder Structure, Component Design, Reusability into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Next.js"
    ],
    "topics": [
      "Folder Structure",
      "Component Design",
      "Reusability",
      "Performance Optimization"
    ],
    "skillsGained": [
      "Apply Folder Structure in production-style work",
      "Connect Component Design with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Frontend Architecture fits in a full-stack product",
      "Choose appropriate tools and patterns for Folder Structure",
      "Ship a small feature using Folder Structure and Component Design"
    ],
    "resources": [
      {
        "label": "Patterns.dev",
        "href": "https://www.patterns.dev/",
        "category": "Community"
      },
      {
        "label": "web.dev performance",
        "href": "https://web.dev/performance/",
        "category": "Official Docs"
      },
      {
        "label": "Frontend checklist",
        "href": "https://frontendchecklist.io/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Folder Structure.",
      "Write notes comparing Folder Structure vs Component Design.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a frontend architecture module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Frontend Architecture to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "backend-fundamentals",
    "title": "Backend Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Backend Fundamentals connects Node.js, Runtime Environment, Event Loop into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Frontend Architecture"
    ],
    "topics": [
      "Node.js",
      "Runtime Environment",
      "Event Loop",
      "Modules"
    ],
    "skillsGained": [
      "Apply Node.js in production-style work",
      "Connect Runtime Environment with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Backend Fundamentals fits in a full-stack product",
      "Choose appropriate tools and patterns for Node.js",
      "Ship a small feature using Node.js and Runtime Environment"
    ],
    "resources": [
      {
        "label": "Node.js docs",
        "href": "https://nodejs.org/en/docs",
        "category": "Official Docs"
      },
      {
        "label": "Node best practices",
        "href": "https://github.com/goldbergyoni/nodebestpractices",
        "category": "Community"
      },
      {
        "label": "NodeSchool",
        "href": "https://nodeschool.io/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Node.js.",
      "Write notes comparing Node.js vs Runtime Environment.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a backend fundamentals module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Backend Fundamentals to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "express-js-nestjs",
    "title": "Express.js / NestJS",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "Express.js / NestJS connects Routing, Middleware, Controllers into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Backend Fundamentals"
    ],
    "topics": [
      "Routing",
      "Middleware",
      "Controllers",
      "Services"
    ],
    "skillsGained": [
      "Apply Routing in production-style work",
      "Connect Middleware with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Express.js / NestJS fits in a full-stack product",
      "Choose appropriate tools and patterns for Routing",
      "Ship a small feature using Routing and Middleware"
    ],
    "resources": [
      {
        "label": "Express docs",
        "href": "https://expressjs.com/",
        "category": "Official Docs"
      },
      {
        "label": "NestJS docs",
        "href": "https://docs.nestjs.com/",
        "category": "Official Docs"
      },
      {
        "label": "NestJS courses",
        "href": "https://courses.nestjs.com/",
        "category": "Video"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Routing.",
      "Write notes comparing Routing vs Middleware.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a express.js / nestjs module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Express.js / NestJS to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "databases",
    "title": "Databases",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Databases connects SQL, PostgreSQL, MySQL into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Express.js / NestJS"
    ],
    "topics": [
      "SQL",
      "PostgreSQL",
      "MySQL",
      "Database Design",
      "Indexing"
    ],
    "skillsGained": [
      "Apply SQL in production-style work",
      "Connect PostgreSQL with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Databases fits in a full-stack product",
      "Choose appropriate tools and patterns for SQL",
      "Ship a small feature using SQL and PostgreSQL"
    ],
    "resources": [
      {
        "label": "PostgreSQL docs",
        "href": "https://www.postgresql.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "SQLBolt",
        "href": "https://sqlbolt.com/",
        "category": "Practice"
      },
      {
        "label": "Use The Index, Luke",
        "href": "https://use-the-index-luke.com/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for SQL.",
      "Write notes comparing SQL vs PostgreSQL.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a databases module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Databases to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "nosql-databases",
    "title": "NoSQL Databases",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "NoSQL Databases connects MongoDB, Redis into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Databases"
    ],
    "topics": [
      "MongoDB",
      "Redis"
    ],
    "skillsGained": [
      "Apply MongoDB in production-style work",
      "Connect Redis with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where NoSQL Databases fits in a full-stack product",
      "Choose appropriate tools and patterns for MongoDB",
      "Ship a small feature using MongoDB and Redis"
    ],
    "resources": [
      {
        "label": "MongoDB docs",
        "href": "https://www.mongodb.com/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Redis docs",
        "href": "https://redis.io/docs/latest/",
        "category": "Official Docs"
      },
      {
        "label": "MongoDB University",
        "href": "https://learn.mongodb.com/",
        "category": "Video"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for MongoDB.",
      "Write notes comparing MongoDB vs Redis.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a nosql databases module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain NoSQL Databases to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "apis",
    "title": "APIs",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "APIs connects REST, GraphQL, API Documentation into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "NoSQL Databases"
    ],
    "topics": [
      "REST",
      "GraphQL",
      "API Documentation",
      "API Versioning"
    ],
    "skillsGained": [
      "Apply REST in production-style work",
      "Connect GraphQL with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where APIs fits in a full-stack product",
      "Choose appropriate tools and patterns for REST",
      "Ship a small feature using REST and GraphQL"
    ],
    "resources": [
      {
        "label": "OpenAPI specification",
        "href": "https://spec.openapis.org/oas/latest.html",
        "category": "Official Docs"
      },
      {
        "label": "GraphQL Learn",
        "href": "https://graphql.org/learn/",
        "category": "Official Docs"
      },
      {
        "label": "Postman Learning Center",
        "href": "https://learning.postman.com/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for REST.",
      "Write notes comparing REST vs GraphQL.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a apis module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain APIs to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "authentication-and-security",
    "title": "Authentication & Security",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Authentication & Security connects JWT, OAuth, Sessions into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "APIs"
    ],
    "topics": [
      "JWT",
      "OAuth",
      "Sessions",
      "RBAC",
      "Security Best Practices"
    ],
    "skillsGained": [
      "Apply JWT in production-style work",
      "Connect OAuth with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Authentication & Security fits in a full-stack product",
      "Choose appropriate tools and patterns for JWT",
      "Ship a small feature using JWT and OAuth"
    ],
    "resources": [
      {
        "label": "OWASP Top 10",
        "href": "https://owasp.org/www-project-top-ten/",
        "category": "Official Docs"
      },
      {
        "label": "Auth0 docs",
        "href": "https://auth0.com/docs",
        "category": "Official Docs"
      },
      {
        "label": "PortSwigger Academy",
        "href": "https://portswigger.net/web-security",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for JWT.",
      "Write notes comparing JWT vs OAuth.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a authentication & security module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Authentication & Security to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "orms-and-data-access",
    "title": "ORMs & Data Access",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "2 weeks",
    "description": "ORMs & Data Access connects Prisma, Drizzle ORM, TypeORM into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Authentication & Security"
    ],
    "topics": [
      "Prisma",
      "Drizzle ORM",
      "TypeORM"
    ],
    "skillsGained": [
      "Apply Prisma in production-style work",
      "Connect Drizzle ORM with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where ORMs & Data Access fits in a full-stack product",
      "Choose appropriate tools and patterns for Prisma",
      "Ship a small feature using Prisma and Drizzle ORM"
    ],
    "resources": [
      {
        "label": "Prisma docs",
        "href": "https://www.prisma.io/docs",
        "category": "Official Docs"
      },
      {
        "label": "Drizzle docs",
        "href": "https://orm.drizzle.team/docs/overview",
        "category": "Official Docs"
      },
      {
        "label": "TypeORM docs",
        "href": "https://typeorm.io/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Prisma.",
      "Write notes comparing Prisma vs Drizzle ORM.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a orms & data access module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain ORMs & Data Access to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "state-management",
    "title": "State Management",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "State Management connects Redux Toolkit, Zustand, TanStack Query into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "ORMs & Data Access"
    ],
    "topics": [
      "Redux Toolkit",
      "Zustand",
      "TanStack Query"
    ],
    "skillsGained": [
      "Apply Redux Toolkit in production-style work",
      "Connect Zustand with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where State Management fits in a full-stack product",
      "Choose appropriate tools and patterns for Redux Toolkit",
      "Ship a small feature using Redux Toolkit and Zustand"
    ],
    "resources": [
      {
        "label": "Redux Toolkit docs",
        "href": "https://redux-toolkit.js.org/",
        "category": "Official Docs"
      },
      {
        "label": "Zustand docs",
        "href": "https://zustand.docs.pmnd.rs/",
        "category": "Official Docs"
      },
      {
        "label": "TanStack Query docs",
        "href": "https://tanstack.com/query/latest",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Redux Toolkit.",
      "Write notes comparing Redux Toolkit vs Zustand.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a state management module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain State Management to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "testing",
    "title": "Testing",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Testing connects Jest, Vitest, Playwright into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "State Management"
    ],
    "topics": [
      "Jest",
      "Vitest",
      "Playwright",
      "Cypress",
      "Integration Testing"
    ],
    "skillsGained": [
      "Apply Jest in production-style work",
      "Connect Vitest with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Testing fits in a full-stack product",
      "Choose appropriate tools and patterns for Jest",
      "Ship a small feature using Jest and Vitest"
    ],
    "resources": [
      {
        "label": "Jest docs",
        "href": "https://jestjs.io/docs/getting-started",
        "category": "Official Docs"
      },
      {
        "label": "Vitest docs",
        "href": "https://vitest.dev/guide/",
        "category": "Official Docs"
      },
      {
        "label": "Playwright docs",
        "href": "https://playwright.dev/docs/intro",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Jest.",
      "Write notes comparing Jest vs Vitest.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a testing module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Testing to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "performance-optimization",
    "title": "Performance Optimization",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Performance Optimization connects Lazy Loading, Code Splitting, Caching into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Testing"
    ],
    "topics": [
      "Lazy Loading",
      "Code Splitting",
      "Caching",
      "Web Vitals",
      "Lighthouse"
    ],
    "skillsGained": [
      "Apply Lazy Loading in production-style work",
      "Connect Code Splitting with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Performance Optimization fits in a full-stack product",
      "Choose appropriate tools and patterns for Lazy Loading",
      "Ship a small feature using Lazy Loading and Code Splitting"
    ],
    "resources": [
      {
        "label": "web.dev performance",
        "href": "https://web.dev/performance/",
        "category": "Official Docs"
      },
      {
        "label": "Lighthouse docs",
        "href": "https://developer.chrome.com/docs/lighthouse/overview",
        "category": "Official Docs"
      },
      {
        "label": "Core Web Vitals",
        "href": "https://web.dev/vitals/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Lazy Loading.",
      "Write notes comparing Lazy Loading vs Code Splitting.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a performance optimization module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Performance Optimization to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "devops-fundamentals",
    "title": "DevOps Fundamentals",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "DevOps Fundamentals connects Linux, Bash, CI/CD into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Performance Optimization"
    ],
    "topics": [
      "Linux",
      "Bash",
      "CI/CD",
      "GitHub Actions"
    ],
    "skillsGained": [
      "Apply Linux in production-style work",
      "Connect Bash with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where DevOps Fundamentals fits in a full-stack product",
      "Choose appropriate tools and patterns for Linux",
      "Ship a small feature using Linux and Bash"
    ],
    "resources": [
      {
        "label": "GitHub Actions docs",
        "href": "https://docs.github.com/en/actions",
        "category": "Official Docs"
      },
      {
        "label": "Linux Journey",
        "href": "https://linuxjourney.com/",
        "category": "Practice"
      },
      {
        "label": "Bash guide",
        "href": "https://mywiki.wooledge.org/BashGuide",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Linux.",
      "Write notes comparing Linux vs Bash.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a devops fundamentals module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain DevOps Fundamentals to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "docker",
    "title": "Docker",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Docker connects Images, Containers, Docker Compose into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "DevOps Fundamentals"
    ],
    "topics": [
      "Images",
      "Containers",
      "Docker Compose"
    ],
    "skillsGained": [
      "Apply Images in production-style work",
      "Connect Containers with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Docker fits in a full-stack product",
      "Choose appropriate tools and patterns for Images",
      "Ship a small feature using Images and Containers"
    ],
    "resources": [
      {
        "label": "Docker docs",
        "href": "https://docs.docker.com/",
        "category": "Official Docs"
      },
      {
        "label": "Play with Docker",
        "href": "https://labs.play-with-docker.com/",
        "category": "Practice"
      },
      {
        "label": "Docker curriculum",
        "href": "https://docker-curriculum.com/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Images.",
      "Write notes comparing Images vs Containers.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a docker module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Docker to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "cloud-fundamentals",
    "title": "Cloud Fundamentals",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Cloud Fundamentals connects AWS, Vercel, Railway into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Docker"
    ],
    "topics": [
      "AWS",
      "Vercel",
      "Railway",
      "Render"
    ],
    "skillsGained": [
      "Apply AWS in production-style work",
      "Connect Vercel with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Cloud Fundamentals fits in a full-stack product",
      "Choose appropriate tools and patterns for AWS",
      "Ship a small feature using AWS and Vercel"
    ],
    "resources": [
      {
        "label": "AWS docs",
        "href": "https://docs.aws.amazon.com/",
        "category": "Official Docs"
      },
      {
        "label": "Vercel docs",
        "href": "https://vercel.com/docs",
        "category": "Official Docs"
      },
      {
        "label": "Railway docs",
        "href": "https://docs.railway.com/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for AWS.",
      "Write notes comparing AWS vs Vercel.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a cloud fundamentals module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Cloud Fundamentals to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "monitoring-and-observability",
    "title": "Monitoring & Observability",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Monitoring & Observability connects Logging, Metrics, Error Tracking into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Cloud Fundamentals"
    ],
    "topics": [
      "Logging",
      "Metrics",
      "Error Tracking"
    ],
    "skillsGained": [
      "Apply Logging in production-style work",
      "Connect Metrics with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Monitoring & Observability fits in a full-stack product",
      "Choose appropriate tools and patterns for Logging",
      "Ship a small feature using Logging and Metrics"
    ],
    "resources": [
      {
        "label": "OpenTelemetry docs",
        "href": "https://opentelemetry.io/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Sentry docs",
        "href": "https://docs.sentry.io/",
        "category": "Official Docs"
      },
      {
        "label": "Grafana docs",
        "href": "https://grafana.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Logging.",
      "Write notes comparing Logging vs Metrics.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a monitoring & observability module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Monitoring & Observability to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "architecture-patterns",
    "title": "Architecture Patterns",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Architecture Patterns connects MVC, Clean Architecture, Monolith into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Monitoring & Observability"
    ],
    "topics": [
      "MVC",
      "Clean Architecture",
      "Monolith",
      "Microservices"
    ],
    "skillsGained": [
      "Apply MVC in production-style work",
      "Connect Clean Architecture with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Architecture Patterns fits in a full-stack product",
      "Choose appropriate tools and patterns for MVC",
      "Ship a small feature using MVC and Clean Architecture"
    ],
    "resources": [
      {
        "label": "Martin Fowler architecture",
        "href": "https://martinfowler.com/architecture/",
        "category": "Community"
      },
      {
        "label": "Microservices.io",
        "href": "https://microservices.io/",
        "category": "Community"
      },
      {
        "label": "Clean Architecture guide",
        "href": "https://8thlight.com/insights/a-color-coded-guide-to-ports-and-adapters",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for MVC.",
      "Write notes comparing MVC vs Clean Architecture.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a architecture patterns module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Architecture Patterns to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "kubernetes",
    "title": "Kubernetes",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Kubernetes connects Pods, Services, Deployments into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Architecture Patterns"
    ],
    "topics": [
      "Pods",
      "Services",
      "Deployments"
    ],
    "skillsGained": [
      "Apply Pods in production-style work",
      "Connect Services with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Kubernetes fits in a full-stack product",
      "Choose appropriate tools and patterns for Pods",
      "Ship a small feature using Pods and Services"
    ],
    "resources": [
      {
        "label": "Kubernetes docs",
        "href": "https://kubernetes.io/docs/home/",
        "category": "Official Docs"
      },
      {
        "label": "Play with Kubernetes",
        "href": "https://labs.play-with-k8s.com/",
        "category": "Practice"
      },
      {
        "label": "Kubernetes tutorials",
        "href": "https://kubernetes.io/docs/tutorials/",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Pods.",
      "Write notes comparing Pods vs Services.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a kubernetes module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Kubernetes to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "infrastructure-as-code",
    "title": "Infrastructure as Code",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Infrastructure as Code connects Terraform, Pulumi into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Kubernetes"
    ],
    "topics": [
      "Terraform",
      "Pulumi"
    ],
    "skillsGained": [
      "Apply Terraform in production-style work",
      "Connect Pulumi with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Infrastructure as Code fits in a full-stack product",
      "Choose appropriate tools and patterns for Terraform",
      "Ship a small feature using Terraform and Pulumi"
    ],
    "resources": [
      {
        "label": "Terraform docs",
        "href": "https://developer.hashicorp.com/terraform/docs",
        "category": "Official Docs"
      },
      {
        "label": "Pulumi docs",
        "href": "https://www.pulumi.com/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Terraform tutorials",
        "href": "https://developer.hashicorp.com/terraform/tutorials",
        "category": "Practice"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Terraform.",
      "Write notes comparing Terraform vs Pulumi.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a infrastructure as code module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Infrastructure as Code to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "system-design",
    "title": "System Design",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "6 weeks",
    "description": "System Design connects Scalability, Load Balancing, Distributed Systems into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Infrastructure as Code"
    ],
    "topics": [
      "Scalability",
      "Load Balancing",
      "Distributed Systems",
      "Caching Strategies"
    ],
    "skillsGained": [
      "Apply Scalability in production-style work",
      "Connect Load Balancing with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where System Design fits in a full-stack product",
      "Choose appropriate tools and patterns for Scalability",
      "Ship a small feature using Scalability and Load Balancing"
    ],
    "resources": [
      {
        "label": "System Design Primer",
        "href": "https://github.com/donnemartin/system-design-primer",
        "category": "Community"
      },
      {
        "label": "AWS Well-Architected",
        "href": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
        "category": "Official Docs"
      },
      {
        "label": "Google SRE books",
        "href": "https://sre.google/books/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Scalability.",
      "Write notes comparing Scalability vs Load Balancing.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a system design module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain System Design to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "advanced-backend-engineering",
    "title": "Advanced Backend Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Backend Engineering connects Message Queues, Kafka, RabbitMQ into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "System Design"
    ],
    "topics": [
      "Message Queues",
      "Kafka",
      "RabbitMQ",
      "Event-Driven Architecture"
    ],
    "skillsGained": [
      "Apply Message Queues in production-style work",
      "Connect Kafka with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Advanced Backend Engineering fits in a full-stack product",
      "Choose appropriate tools and patterns for Message Queues",
      "Ship a small feature using Message Queues and Kafka"
    ],
    "resources": [
      {
        "label": "Kafka docs",
        "href": "https://kafka.apache.org/documentation/",
        "category": "Official Docs"
      },
      {
        "label": "RabbitMQ tutorials",
        "href": "https://www.rabbitmq.com/tutorials",
        "category": "Official Docs"
      },
      {
        "label": "AWS event-driven architecture",
        "href": "https://aws.amazon.com/event-driven-architecture/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Message Queues.",
      "Write notes comparing Message Queues vs Kafka.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a advanced backend engineering module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Advanced Backend Engineering to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "advanced-frontend-engineering",
    "title": "Advanced Frontend Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Frontend Engineering connects PWAs, WebSockets, GraphQL Clients into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Advanced Backend Engineering"
    ],
    "topics": [
      "PWAs",
      "WebSockets",
      "GraphQL Clients",
      "Micro Frontends"
    ],
    "skillsGained": [
      "Apply PWAs in production-style work",
      "Connect WebSockets with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Advanced Frontend Engineering fits in a full-stack product",
      "Choose appropriate tools and patterns for PWAs",
      "Ship a small feature using PWAs and WebSockets"
    ],
    "resources": [
      {
        "label": "MDN PWA",
        "href": "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps",
        "category": "Official Docs"
      },
      {
        "label": "WebSocket API",
        "href": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
        "category": "Official Docs"
      },
      {
        "label": "GraphQL clients",
        "href": "https://www.apollographql.com/docs/react/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for PWAs.",
      "Write notes comparing PWAs vs WebSockets.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a advanced frontend engineering module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Advanced Frontend Engineering to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "production-engineering",
    "title": "Production Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Production Engineering connects Reliability, High Availability, Disaster Recovery into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Advanced Frontend Engineering"
    ],
    "topics": [
      "Reliability",
      "High Availability",
      "Disaster Recovery",
      "Cost Optimization"
    ],
    "skillsGained": [
      "Apply Reliability in production-style work",
      "Connect High Availability with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Production Engineering fits in a full-stack product",
      "Choose appropriate tools and patterns for Reliability",
      "Ship a small feature using Reliability and High Availability"
    ],
    "resources": [
      {
        "label": "Google SRE books",
        "href": "https://sre.google/books/",
        "category": "Official Docs"
      },
      {
        "label": "AWS reliability pillar",
        "href": "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html",
        "category": "Official Docs"
      },
      {
        "label": "FinOps Foundation",
        "href": "https://www.finops.org/introduction/what-is-finops/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Reliability.",
      "Write notes comparing Reliability vs High Availability.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a production engineering module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Production Engineering to a junior developer, and what mistake should they avoid first?"
  },
  {
    "id": "technical-leadership",
    "title": "Technical Leadership",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "3 weeks",
    "description": "Technical Leadership connects Code Reviews, Documentation, Team Collaboration into a practical full-stack engineering skill you can use in real products.",
    "prerequisites": [
      "Production Engineering"
    ],
    "topics": [
      "Code Reviews",
      "Documentation",
      "Team Collaboration",
      "Software Design Decisions"
    ],
    "skillsGained": [
      "Apply Code Reviews in production-style work",
      "Connect Documentation with the rest of the stack",
      "Document tradeoffs and implementation decisions",
      "Build portfolio-ready proof of skill"
    ],
    "learningOutcomes": [
      "Explain where Technical Leadership fits in a full-stack product",
      "Choose appropriate tools and patterns for Code Reviews",
      "Ship a small feature using Code Reviews and Documentation"
    ],
    "resources": [
      {
        "label": "Google engineering practices",
        "href": "https://google.github.io/eng-practices/",
        "category": "Community"
      },
      {
        "label": "Architecture decision records",
        "href": "https://adr.github.io/",
        "category": "Community"
      },
      {
        "label": "Staff Engineer",
        "href": "https://staffeng.com/",
        "category": "Community"
      }
    ],
    "practiceExercises": [
      "Create a focused lab for Code Reviews.",
      "Write notes comparing Code Reviews vs Documentation.",
      "Add this topic to a production-style full-stack app."
    ],
    "miniProject": "Build a technical leadership module for a full-stack product dashboard.",
    "realWorldApplications": [
      "SaaS product delivery",
      "Team collaboration and review",
      "Production debugging and iteration"
    ],
    "quiz": "How would you explain Technical Leadership to a junior developer, and what mistake should they avoid first?"
  }
];

const projectTracks: ProjectTrack[] = [
  {
    "stage": "Beginner",
    "projects": [
      "Personal Portfolio",
      "Landing Page",
      "Weather App",
      "Todo Application"
    ]
  },
  {
    "stage": "Intermediate",
    "projects": [
      "Authentication System",
      "Blog Platform",
      "Task Management App",
      "E-commerce Frontend"
    ]
  },
  {
    "stage": "Advanced",
    "projects": [
      "Full Stack SaaS",
      "Social Media Platform",
      "Real-Time Chat Application",
      "Learning Management System"
    ]
  },
  {
    "stage": "Expert",
    "projects": [
      "Netflix Clone Architecture",
      "Scalable Multi-Tenant SaaS",
      "Distributed Microservices Platform",
      "Enterprise Project Management Tool"
    ]
  }
];

const missingTopics = [
  "Web accessibility beyond basics",
  "Design systems",
  "Feature flags",
  "Payments and subscriptions",
  "Email delivery",
  "Search engines",
  "Data privacy and compliance",
  "Product analytics",
  "A/B testing",
  "AI-assisted developer workflows",
  "Internationalization",
  "Mobile-first product QA"
];

const careerPaths = [
  {
    title: "Junior Full Stack Developer",
    focus: "Build CRUD features, responsive UI, API routes, database reads, and clean pull requests.",
    milestones: ["Portfolio app", "Auth flow", "Team-ready Git workflow"],
  },
  {
    title: "Mid-Level Full Stack Developer",
    focus: "Own features end-to-end, improve performance, write tests, and make pragmatic architecture choices.",
    milestones: ["Production Next.js app", "Tested API", "Database-backed dashboard"],
  },
  {
    title: "Senior Full Stack Developer",
    focus: "Lead product architecture, mentor others, review code, and design scalable systems.",
    milestones: ["System design docs", "Observability rollout", "Reusable platform patterns"],
  },
  {
    title: "Staff Engineer Path",
    focus: "Set technical direction, reduce system risk, and guide cross-team software design decisions.",
    milestones: ["Architecture decision records", "Platform roadmap", "Reliability strategy"],
  },
  {
    title: "Freelancing Path",
    focus: "Package discovery, estimates, client communication, delivery, deployment, and maintenance.",
    milestones: ["Client proposal", "Reusable starter", "Launch checklist"],
  },
  {
    title: "Startup Founder Path",
    focus: "Build MVPs, validate product ideas, instrument analytics, and optimize cost while moving fast.",
    milestones: ["MVP launch", "Payments", "Multi-tenant SaaS baseline"],
  },
];

const achievementBadges = [
  "Frontend Shipper",
  "API Architect",
  "Database Designer",
  "Security Defender",
  "Cloud Operator",
  "System Design Lead",
  "Production Engineer",
  "Technical Mentor",
];

const progressSchema = [
  ["users", "id, name, email, role, created_at"],
  ["roadmap_progress", "user_id, roadmap_id, completed_node_ids, xp, streak_days"],
  ["topic_notes", "user_id, topic_id, note, updated_at"],
  ["bookmarks", "user_id, topic_id, created_at"],
  ["quiz_attempts", "user_id, topic_id, score, completed_at"],
  ["certificates", "user_id, roadmap_id, issued_at, verification_hash"],
];

const icons: Record<string, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6" />,
  badge: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z" />,
  bookmark: <path d="M6 4h12v18l-6-4-6 4V4Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16" />,
  database: <path d="M4 6c0-2 16-2 16 0v12c0 2-16 2-16 0V6Zm0 0c0 2 16 2 16 0M4 12c0 2 16 2 16 0" />,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-.8 3.4-2 4-1-4-4-6-4-9-3 2-5 6-5 10 0 5 4 9 8 9Z" />,
  layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  lock: <path d="M6 11V8a6 6 0 0 1 12 0v3m-1 0H7a1 1 0 0 0-1 1v8h12v-8a1 1 0 0 0-1-1Z" />,
  note: <path d="M6 3h10l3 3v18H6V3Zm10 0v6h6M9 13h8M9 17h8" />,
  quiz: <path d="M10 9a3 3 0 1 1 4 2.83c-1.1.47-2 1.03-2 2.17m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  server: <path d="M4 4h16v7H4V4Zm0 11h16v7H4v-7Zm3-7h.01M7 19h.01" />,
  shield: <path d="M12 3 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
};

const resourceCategories: ResourceCategory[] = ["Official Docs", "Video", "Practice", "Community"];

function Icon({ name, className = "" }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
}

function loadSet(key: string) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  const stored = window.localStorage.getItem(key);
  return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
}

function loadNotes() {
  if (typeof window === "undefined") {
    return {};
  }

  const stored = window.localStorage.getItem(storageKeys.notes);
  return stored ? (JSON.parse(stored) as Record<string, string>) : {};
}

function difficultyClass(difficulty: Difficulty) {
  const classes: Record<Difficulty, string> = {
    Starter: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    Core: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    Applied: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    Advanced: "border-red-500/35 bg-red-500/10 text-red-300",
    Expert: "border-red-400/50 bg-red-500/15 text-red-200",
  };

  return classes[difficulty];
}

function stageClass(stage: Stage) {
  const classes: Record<Stage, string> = {
    Beginner: "border-zinc-700 bg-zinc-950 text-zinc-200",
    Intermediate: "border-red-950 bg-red-950/30 text-red-200",
    Advanced: "border-red-800 bg-red-950/50 text-red-100",
    Expert: "border-red-600 bg-red-600/15 text-white",
  };

  return classes[stage];
}

function DemonTechLogo() {
  return (
    <Link className="flex min-w-fit items-center gap-3" href="/">
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-red-500/30 bg-black">
        <Image alt="DemonTech logo" className="h-full w-full object-cover" height={48} src="/demontech-logo.png" width={48} />
      </span>
      <span>
        <span className="block text-lg font-black leading-6 text-white">
          Demon<span className="text-red-500">Tech</span>
        </span>
        <span className="mt-1 block text-[11px] font-bold uppercase text-zinc-500">Roadmap</span>
      </span>
    </Link>
  );
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg aria-hidden="true" className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
        <circle className="stroke-zinc-900" cx="50" cy="50" fill="none" r={radius} strokeWidth="8" />
        <circle className="stroke-red-500" cx="50" cy="50" fill="none" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="8" />
      </svg>
      <span className="absolute text-2xl font-black text-white">{percentage}%</span>
    </div>
  );
}

function SidebarPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-950/90 p-5">
      <h2 className="text-sm font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

function RoadmapNodeCard({
  bookmarked,
  completed,
  expanded,
  index,
  node,
  note,
  onExpand,
  onNoteChange,
  onToggleBookmark,
  onToggleComplete,
}: {
  bookmarked: boolean;
  completed: boolean;
  expanded: boolean;
  index: number;
  node: RoadmapNode;
  note: string;
  onExpand: () => void;
  onNoteChange: (value: string) => void;
  onToggleBookmark: () => void;
  onToggleComplete: () => void;
}) {
  return (
    <article className="relative">
      <span className={`absolute left-0 top-7 z-10 grid h-12 w-12 place-items-center rounded-md border text-sm font-black ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-[#050505] text-zinc-300"}`}>
        {completed ? <Icon className="h-5 w-5" name="check" /> : String(index + 1).padStart(2, "0")}
      </span>

      <div className={`ml-7 rounded-md border bg-zinc-950/80 transition ${expanded ? "border-red-500/70" : "border-zinc-800 hover:border-red-500/40"}`}>
        <button aria-expanded={expanded} className="grid w-full gap-5 p-5 pl-10 text-left md:grid-cols-[minmax(0,1fr)_auto]" onClick={onExpand} type="button">
          <span>
            <span className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(node.stage)}`}>{node.stage}</span>
              <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(node.difficulty)}`}>{node.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-black px-2.5 py-1 text-xs font-bold text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-red-400" name="clock" />
                {node.duration}
              </span>
            </span>
            <span className="mt-3 block text-lg font-black text-white">{node.title}</span>
            <span className="mt-2 block max-w-3xl text-sm leading-6 text-zinc-400">{node.description}</span>
          </span>
          <span className="flex items-center gap-3 md:justify-end">
            <span className={completed ? "text-sm font-bold text-red-300" : "text-sm font-bold text-zinc-500"}>{completed ? "Complete" : "In progress"}</span>
            <Icon className={`h-5 w-5 text-zinc-500 transition ${expanded ? "rotate-90 text-red-400" : ""}`} name="arrow" />
          </span>
        </button>

        {expanded ? (
          <div className="border-t border-zinc-800 px-5 pb-5 pl-10">
            <div className="grid gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_270px]">
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-black text-white">Core Topics</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {node.topics.map((topic) => (
                      <span className="rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm text-zinc-300" key={topic}>{topic}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Skills Gained</h3>
                  <ul className="mt-3 grid gap-3 md:grid-cols-2">
                    {node.skillsGained.map((skill) => (
                      <li className="flex gap-3 text-sm text-zinc-300" key={skill}>
                        <Icon className="h-4 w-4 shrink-0 text-red-400" name="check" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Learning Outcomes</h3>
                  <ul className="mt-3 grid gap-3 md:grid-cols-2">
                    {node.learningOutcomes.map((outcome) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={outcome}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="badge" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Practice Exercises</h3>
                  <ul className="mt-3 grid gap-3">
                    {node.practiceExercises.map((exercise) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={exercise}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="target" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4">
                  <label className="flex items-center gap-2 text-sm font-black text-white" htmlFor={`${node.id}-notes`}>
                    <Icon className="h-4 w-4 text-red-400" name="note" />
                    Notes
                  </label>
                  <textarea
                    className="mt-3 min-h-28 w-full resize-y rounded-md border border-zinc-800 bg-black p-3 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-red-500/70"
                    id={`${node.id}-notes`}
                    onChange={(event) => onNoteChange(event.target.value)}
                    placeholder="Write implementation notes, links, or questions for this topic."
                    value={note}
                  />
                </section>
              </div>

              <aside className="space-y-5">
                <section className="border-l border-red-500/40 pl-4">
                  <h3 className="text-sm font-black text-white">Prerequisites</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {node.prerequisites.map((prerequisite) => (
                      <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-3 py-2 text-xs font-bold text-zinc-300" key={prerequisite}>
                        <Icon className="h-3.5 w-3.5 text-red-400" name="lock" />
                        {prerequisite}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="border-l border-zinc-800 pl-4">
                  <h3 className="text-sm font-black text-white">Mini Project</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{node.miniProject}</p>
                </section>

                <section className="border-l border-zinc-800 pl-4">
                  <h3 className="text-sm font-black text-white">Real-World Applications</h3>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {node.realWorldApplications.map((application) => (
                      <li className="flex gap-2" key={application}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="server" />
                        {application}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-md border border-red-500/20 bg-red-500/10 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-black text-white">
                    <Icon className="h-4 w-4 text-red-300" name="quiz" />
                    Quiz Prompt
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-red-100">{node.quiz}</p>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Resources</h3>
                  <div className="mt-3 space-y-2">
                    {node.resources.map((resource) => (
                      <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${node.id}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
                        <span>{resource.label}</span>
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>

                <div className="flex flex-wrap gap-2">
                  <button aria-pressed={completed} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleComplete} type="button">
                    <Icon className="h-4 w-4" name="check" />
                    {completed ? "Completed" : "Mark complete"}
                  </button>
                  <button aria-pressed={bookmarked} className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${bookmarked ? "border-red-500/70 bg-red-500/15 text-red-200" : "border-zinc-800 bg-black text-zinc-300 hover:border-red-500/70"}`} onClick={onToggleBookmark} type="button">
                    <Icon className="h-4 w-4" name="bookmark" />
                    {bookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function FullStackDeveloperRoadmap() {
  const [expandedNodeId, setExpandedNodeId] = useState(roadmapNodes[0].id);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => loadSet(storageKeys.completed));
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => loadSet(storageKeys.bookmarked));
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes());

  useEffect(() => {
    window.localStorage.setItem(storageKeys.completed, JSON.stringify(Array.from(completedIds)));
  }, [completedIds]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.bookmarked, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.notes, JSON.stringify(notes));
  }, [notes]);

  const completedCount = completedIds.size;
  const progressPercentage = Math.round((completedCount / roadmapNodes.length) * 100);
  const nextNode = roadmapNodes.find((node) => !completedIds.has(node.id)) ?? roadmapNodes[roadmapNodes.length - 1];
  const currentLevel = stageSummaries.find((stage) => roadmapNodes.filter((node) => node.stage === stage.stage).some((node) => !completedIds.has(node.id)))?.stage ?? "Expert";
  const noteCount = Object.values(notes).filter((note) => note.trim()).length;

  const stageProgress = useMemo(
    () =>
      stageSummaries.map((summary) => {
        const nodes = roadmapNodes.filter((node) => node.stage === summary.stage);
        const completed = nodes.filter((node) => completedIds.has(node.id)).length;
        return { ...summary, completed, total: nodes.length, percentage: Math.round((completed / nodes.length) * 100) };
      }),
    [completedIds],
  );

  const resourcesByCategory = useMemo(
    () =>
      resourceCategories.map((category) => ({
        category,
        resources: roadmapNodes.flatMap((node) => node.resources.filter((resource) => resource.category === category)).slice(0, 6),
      })),
    [],
  );

  const toggleSet = (setter: (value: Set<string>) => void, current: Set<string>, id: string) => {
    const next = new Set(current);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setter(next);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#050505_0%,#090909_48%,#050505_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-zinc-400 lg:flex">
            <Link className="text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Link className="transition hover:text-white" href="/docs/learning-paths">Learning Paths</Link>
            <Link className="transition hover:text-white" href="/docs/project-ideas">Projects</Link>
            <Link className="transition hover:text-white" href="/docs/best-practices">Best Practices</Link>
          </nav>
          <a className="hidden rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400 md:inline-flex" href="https://discord.gg/yWtjK2Tb8T" rel="noreferrer" target="_blank">
            Join Community
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-6">
        <section>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <Link className="hover:text-red-400" href="/">Home</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <Link className="hover:text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <span className="font-bold text-zinc-300">Full Stack Developer</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="server" />
                  Production Full Stack Engineering Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Full Stack Developer Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete end-to-end learning journey across frontend, backend, databases, DevOps, cloud, system design, product engineering, and technical leadership.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["33", "Roadmap nodes", "layers"],
                    ["76-102 weeks", "Total duration", "clock"],
                    ["140+", "Skills tracked", "badge"],
                    ["16", "Project builds", "target"],
                  ].map(([value, label, icon]) => (
                    <div className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={label}>
                      <Icon className="h-5 w-5 text-red-400" name={icon as keyof typeof icons} />
                      <p className="mt-3 text-2xl font-black text-white">{value}</p>
                      <p className="mt-1 text-sm text-zinc-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-zinc-800 bg-[#050505] p-5">
                <p className="text-sm font-black text-white">Stack Architecture</p>
                <div className="mt-5 space-y-4">
                  {stageProgress.map((stage) => (
                    <button className="w-full text-left" key={stage.stage} onClick={() => setExpandedNodeId(roadmapNodes.find((node) => node.stage === stage.stage)?.id ?? roadmapNodes[0].id)} type="button">
                      <span className="flex items-center justify-between gap-4 text-sm">
                        <span className="font-bold text-zinc-200">{stage.stage}</span>
                        <span className="text-zinc-500">{stage.completed}/{stage.total}</span>
                      </span>
                      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-zinc-900">
                        <span className="block h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-zinc-500">{stage.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Project-Based Learning Track</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every level ends with shippable product work that combines UI, APIs, data, auth, deployment, reliability, and collaboration skills.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {projectTracks.map((track) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={track.stage}>
                  <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${stageClass(track.stage)}`}>{track.stage}</span>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                    {track.projects.map((project) => (
                      <li className="flex gap-3" key={project}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="code" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Vertical Full Stack Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Expand each node for prerequisites, learning outcomes, resources, practice exercises, mini projects, quizzes, bookmarks, and notes.
                </p>
              </div>
              <button className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" onClick={() => setCompletedIds(new Set())} type="button">
                Reset Progress
              </button>
            </div>

            <div className="relative mt-6 space-y-5">
              <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-zinc-800 sm:block" />
              {roadmapNodes.map((node, index) => (
                <RoadmapNodeCard
                  bookmarked={bookmarkedIds.has(node.id)}
                  completed={completedIds.has(node.id)}
                  expanded={expandedNodeId === node.id}
                  index={index}
                  key={node.id}
                  node={node}
                  note={notes[node.id] ?? ""}
                  onExpand={() => setExpandedNodeId((current) => (current === node.id ? "" : node.id))}
                  onNoteChange={(value) => setNotes((current) => ({ ...current, [node.id]: value }))}
                  onToggleBookmark={() => toggleSet(setBookmarkedIds, bookmarkedIds, node.id)}
                  onToggleComplete={() => toggleSet(setCompletedIds, completedIds, node.id)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Full Stack Resource Matrix</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {resourcesByCategory.map(({ category, resources }) => (
                <section className="border-t border-zinc-800 pt-4" key={category}>
                  <h3 className="text-sm font-black text-white">{category}</h3>
                  <div className="mt-3 space-y-2">
                    {resources.map((resource) => (
                      <a className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white" href={resource.href} key={`${category}-${resource.label}`} rel={resource.href.startsWith("http") ? "noreferrer" : undefined} target={resource.href.startsWith("http") ? "_blank" : undefined}>
                        {resource.label}
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Career Paths</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              The roadmap supports job growth, freelancing, startup building, and staff-level technical leadership without splitting the learner into separate tracks too early.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {careerPaths.map((path) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={path.title}>
                  <h3 className="text-sm font-black text-white">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{path.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.milestones.map((milestone) => (
                      <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-200" key={milestone}>
                        {milestone}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Gamification & Learning Tools</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["XP System", "Award XP for completed topics, quizzes, coding exercises, projects, and review streaks."],
                  ["Achievement Badges", "Unlock visible badges for frontend, backend, database, cloud, security, and leadership mastery."],
                  ["Milestones", "Mark phase completions with certificate-ready checkpoints and portfolio project prompts."],
                  ["Learning Challenges", "Add weekly labs, architecture reviews, debugging drills, and deployment missions."],
                  ["Interactive Quizzes", "Attach quiz prompts to each topic and persist attempt history."],
                  ["Progress Sync", "Store notes, bookmarks, XP, completions, and certificates per user account."],
                ].map(([title, detail]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Progress Database Schema</h2>
              <div className="mt-6 space-y-3">
                {progressSchema.map(([table, columns]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={table}>
                    <h3 className="font-mono text-sm font-black text-red-300">{table}</h3>
                    <p className="mt-2 font-mono text-xs leading-6 text-zinc-400">{columns}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Scalable Page Architecture</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ["Component hierarchy", "FullStackDeveloperRoadmap -> SidebarPanel -> ProgressRing -> RoadmapNodeCard -> career paths, gamification, resources, notes, quiz, project sections."],
                ["Folder architecture", "Future extraction: src/features/roadmaps/full-stack/data.ts, components/RoadmapNodeCard.tsx, components/ProgressDashboard.tsx, components/CareerPathPanel.tsx, components/GamificationPanel.tsx."],
                ["TypeScript interfaces", "Stage, Difficulty, ResourceCategory, Resource, RoadmapNode, StageSummary, ProjectTrack, CareerPath, AchievementBadge, ProgressSchema."],
                ["Tailwind structure", "Black base surface, zinc borders, red accent states, compact 13px root scale, responsive grids, sticky dashboard, accessible focus and pressed states."],
                ["Framer Motion plan", "Use motion only for node expansion, stage progress transitions, and badge unlocks with reduced-motion fallbacks once the dependency is installed."],
                ["shadcn/ui plan", "Extract buttons, cards, progress, tabs, textareas, and badges into shadcn-style primitives when the component library is added."],
                ["Feature specifications", "Completion tracking, bookmarks, per-topic notes, coding exercises, quizzes, XP, badges, certificates, progress sync, recommended next step."],
                ["UX improvements", "Vertical progression, visual stack graph, low-glow premium surfaces, career lanes, dashboard widgets, mobile-first single-column behavior."],
              ].map(([title, detail]) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                  <h3 className="text-sm font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                </section>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="Roadmap Progress">
            <div className="mt-5 flex items-center gap-5">
              <ProgressRing percentage={progressPercentage} />
              <div>
                <p className="text-3xl font-black text-white">{completedCount}/{roadmapNodes.length}</p>
                <p className="mt-1 text-sm text-zinc-500">topics completed</p>
                <p className="mt-4 text-sm font-bold text-red-300">{progressPercentage}% complete</p>
              </div>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Learning Streak">
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
                <Icon className="h-6 w-6" name="flame" />
              </span>
              <div>
                <p className="text-2xl font-black text-white">5 days</p>
                <p className="text-sm text-zinc-500">current streak</p>
              </div>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Recommended Next Step">
            <div className="mt-4">
              <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(nextNode.difficulty)}`}>{nextNode.difficulty}</span>
              <h3 className="mt-3 text-lg font-black text-white">{nextNode.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{nextNode.description}</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400" onClick={() => setExpandedNodeId(nextNode.id)} type="button">
                Open topic
                <Icon className="h-4 w-4" name="arrow" />
              </button>
            </div>
          </SidebarPanel>

          <SidebarPanel title="Skill Completion">
            <div className="mt-4 space-y-4">
              {stageProgress.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-zinc-300">{stage.stage}</span>
                    <span className="text-zinc-500">{stage.percentage}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-900">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${stage.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Learning State">
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                [currentLevel, "current level", "shield"],
                [String(bookmarkedIds.size), "bookmarks", "bookmark"],
                [String(noteCount), "notes saved", "note"],
                ["76-102w", "estimated time", "clock"],
              ].map(([value, label, icon]) => (
                <div className="rounded-md border border-zinc-800 bg-[#050505] p-3" key={label}>
                  <Icon className="h-4 w-4 text-red-400" name={icon as keyof typeof icons} />
                  <p className="mt-2 text-lg font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Achievement Badges">
            <div className="mt-4 grid gap-3">
              {achievementBadges.map((badge, index) => (
                <div className={`flex items-center gap-3 rounded-md border p-3 ${completedCount > index * 6 ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-zinc-800 bg-[#050505] text-zinc-500"}`} key={badge}>
                  <Icon className="h-5 w-5" name="badge" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="Missing Full Stack Topics Added">
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              {missingTopics.map((topic) => (
                <li className="flex gap-3" key={topic}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="check" />
                  {topic}
                </li>
              ))}
            </ul>
          </SidebarPanel>
        </aside>
      </div>
    </main>
  );
}
