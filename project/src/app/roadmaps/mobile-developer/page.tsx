"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official Documentation" | "Video Courses" | "Open Source Apps" | "Community Resources" | "Design Resources";

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
  completed: "demontech-mobile-roadmap-completed",
  bookmarked: "demontech-mobile-roadmap-bookmarked",
  notes: "demontech-mobile-roadmap-notes",
};

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "17-20 weeks",
    outcome: "Understand mobile fundamentals, programming, platform languages, Git, UI/UX, and design systems.",
  },
  {
    stage: "Intermediate",
    duration: "40-45 weeks",
    outcome: "Build Android, iOS, Flutter, and React Native apps with backend integration, storage, databases, auth, and security.",
  },
  {
    stage: "Advanced",
    duration: "37-42 weeks",
    outcome: "Design architecture, state, testing, performance, notifications, offline sync, CI/CD, Firebase, and mobile security workflows.",
  },
  {
    stage: "Expert",
    duration: "32-38 weeks",
    outcome: "Lead advanced native and cross-platform engineering, mobile DevOps, system design, emerging tech, and architecture decisions.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    "id": "mobile-development-fundamentals",
    "title": "Mobile Development Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "2 weeks",
    "description": "Mobile Development Fundamentals connects How Mobile Apps Work, Native vs Cross-Platform, Mobile Architecture Overview into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Basic computer literacy and curiosity about apps"
    ],
    "topics": [
      "How Mobile Apps Work",
      "Native vs Cross-Platform",
      "Mobile Architecture Overview",
      "App Lifecycle",
      "Mobile UI Principles"
    ],
    "skillsGained": [
      "Apply How Mobile Apps Work in real mobile app workflows",
      "Connect Native vs Cross-Platform to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Development Fundamentals fits into the mobile app lifecycle",
      "Ship a mobile feature using How Mobile Apps Work",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android developer guides",
        "href": "https://developer.android.com/guide",
        "category": "Official Documentation"
      },
      {
        "label": "Apple app design overview",
        "href": "https://developer.apple.com/design/",
        "category": "Design Resources"
      },
      {
        "label": "Mobile UX patterns",
        "href": "https://www.nngroup.com/topic/mobile-and-tablet/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for How Mobile Apps Work.",
      "Create a UI or architecture drill covering How Mobile Apps Work and Native vs Cross-Platform.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile development fundamentals feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Development Fundamentals, and how would you detect it before release?"
  },
  {
    "id": "programming-fundamentals",
    "title": "Programming Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "5 weeks",
    "description": "Programming Fundamentals connects Variables, Functions, OOP into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Development Fundamentals"
    ],
    "topics": [
      "Variables",
      "Functions",
      "OOP",
      "Data Structures",
      "Algorithms",
      "Async Programming"
    ],
    "skillsGained": [
      "Apply Variables in real mobile app workflows",
      "Connect Functions to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Programming Fundamentals fits into the mobile app lifecycle",
      "Ship a mobile feature using Variables",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Kotlin basics",
        "href": "https://kotlinlang.org/docs/basic-syntax.html",
        "category": "Official Documentation"
      },
      {
        "label": "Swift guide",
        "href": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/",
        "category": "Official Documentation"
      },
      {
        "label": "Exercism mobile languages",
        "href": "https://exercism.org/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Variables.",
      "Create a UI or architecture drill covering Variables and Functions.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a programming fundamentals feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Programming Fundamentals, and how would you detect it before release?"
  },
  {
    "id": "mobile-programming-languages",
    "title": "Mobile Programming Languages",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "4 weeks",
    "description": "Mobile Programming Languages connects Java, Kotlin, Swift into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Programming Fundamentals"
    ],
    "topics": [
      "Java",
      "Kotlin",
      "Swift",
      "Dart",
      "JavaScript",
      "TypeScript"
    ],
    "skillsGained": [
      "Apply Java in real mobile app workflows",
      "Connect Kotlin to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Programming Languages fits into the mobile app lifecycle",
      "Ship a mobile feature using Java",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Kotlin docs",
        "href": "https://kotlinlang.org/docs/home.html",
        "category": "Official Documentation"
      },
      {
        "label": "Swift docs",
        "href": "https://www.swift.org/documentation/",
        "category": "Official Documentation"
      },
      {
        "label": "Dart docs",
        "href": "https://dart.dev/guides",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Java.",
      "Create a UI or architecture drill covering Java and Kotlin.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile programming languages feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Programming Languages, and how would you detect it before release?"
  },
  {
    "id": "git-and-github",
    "title": "Git & GitHub",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Git & GitHub connects Version Control, Branching, Pull Requests into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Programming Languages"
    ],
    "topics": [
      "Version Control",
      "Branching",
      "Pull Requests",
      "Team Collaboration"
    ],
    "skillsGained": [
      "Apply Version Control in real mobile app workflows",
      "Connect Branching to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Git & GitHub fits into the mobile app lifecycle",
      "Ship a mobile feature using Version Control",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Git docs",
        "href": "https://git-scm.com/doc",
        "category": "Official Documentation"
      },
      {
        "label": "GitHub Skills",
        "href": "https://skills.github.com/",
        "category": "Video Courses"
      },
      {
        "label": "DemonTech Git roadmap",
        "href": "/roadmaps/git",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Version Control.",
      "Create a UI or architecture drill covering Version Control and Branching.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a git & github feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Git & GitHub, and how would you detect it before release?"
  },
  {
    "id": "ui-ux-fundamentals",
    "title": "UI/UX Fundamentals",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "UI/UX Fundamentals connects Design Principles, Responsive Layouts, Accessibility into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Git & GitHub"
    ],
    "topics": [
      "Design Principles",
      "Responsive Layouts",
      "Accessibility",
      "Mobile Navigation Patterns"
    ],
    "skillsGained": [
      "Apply Design Principles in real mobile app workflows",
      "Connect Responsive Layouts to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how UI/UX Fundamentals fits into the mobile app lifecycle",
      "Ship a mobile feature using Design Principles",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Material Design",
        "href": "https://m3.material.io/",
        "category": "Design Resources"
      },
      {
        "label": "Apple Human Interface Guidelines",
        "href": "https://developer.apple.com/design/human-interface-guidelines",
        "category": "Design Resources"
      },
      {
        "label": "WCAG mobile accessibility",
        "href": "https://www.w3.org/WAI/standards-guidelines/mobile/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Design Principles.",
      "Create a UI or architecture drill covering Design Principles and Responsive Layouts.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a ui/ux fundamentals feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in UI/UX Fundamentals, and how would you detect it before release?"
  },
  {
    "id": "mobile-design-systems",
    "title": "Mobile Design Systems",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "2 weeks",
    "description": "Mobile Design Systems connects Material Design, Human Interface Guidelines, Design Tokens into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "UI/UX Fundamentals"
    ],
    "topics": [
      "Material Design",
      "Human Interface Guidelines",
      "Design Tokens"
    ],
    "skillsGained": [
      "Apply Material Design in real mobile app workflows",
      "Connect Human Interface Guidelines to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Design Systems fits into the mobile app lifecycle",
      "Ship a mobile feature using Material Design",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Material Design components",
        "href": "https://m3.material.io/components",
        "category": "Design Resources"
      },
      {
        "label": "Apple design resources",
        "href": "https://developer.apple.com/design/resources/",
        "category": "Design Resources"
      },
      {
        "label": "Design tokens guide",
        "href": "https://www.designtokens.org/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Material Design.",
      "Create a UI or architecture drill covering Material Design and Human Interface Guidelines.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile design systems feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Design Systems, and how would you detect it before release?"
  },
  {
    "id": "android-development",
    "title": "Android Development",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Android Development connects Android Studio, Activities, Fragments into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Design Systems"
    ],
    "topics": [
      "Android Studio",
      "Activities",
      "Fragments",
      "Intents",
      "Jetpack Components"
    ],
    "skillsGained": [
      "Apply Android Studio in real mobile app workflows",
      "Connect Activities to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Android Development fits into the mobile app lifecycle",
      "Ship a mobile feature using Android Studio",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android docs",
        "href": "https://developer.android.com/docs",
        "category": "Official Documentation"
      },
      {
        "label": "Android Jetpack",
        "href": "https://developer.android.com/jetpack",
        "category": "Official Documentation"
      },
      {
        "label": "Now in Android app",
        "href": "https://github.com/android/nowinandroid",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Android Studio.",
      "Create a UI or architecture drill covering Android Studio and Activities.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a android development feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Android Development, and how would you detect it before release?"
  },
  {
    "id": "kotlin-for-android",
    "title": "Kotlin for Android",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Kotlin for Android connects Coroutines, Flow, State Management into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Android Development"
    ],
    "topics": [
      "Coroutines",
      "Flow",
      "State Management"
    ],
    "skillsGained": [
      "Apply Coroutines in real mobile app workflows",
      "Connect Flow to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Kotlin for Android fits into the mobile app lifecycle",
      "Ship a mobile feature using Coroutines",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Kotlin coroutines",
        "href": "https://kotlinlang.org/docs/coroutines-overview.html",
        "category": "Official Documentation"
      },
      {
        "label": "Android Kotlin guides",
        "href": "https://developer.android.com/kotlin",
        "category": "Official Documentation"
      },
      {
        "label": "Kotlin flows",
        "href": "https://kotlinlang.org/docs/flow.html",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Coroutines.",
      "Create a UI or architecture drill covering Coroutines and Flow.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a kotlin for android feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Kotlin for Android, and how would you detect it before release?"
  },
  {
    "id": "ios-development",
    "title": "iOS Development",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "iOS Development connects Xcode, UIKit, SwiftUI into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Kotlin for Android"
    ],
    "topics": [
      "Xcode",
      "UIKit",
      "SwiftUI",
      "App Lifecycle"
    ],
    "skillsGained": [
      "Apply Xcode in real mobile app workflows",
      "Connect UIKit to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how iOS Development fits into the mobile app lifecycle",
      "Ship a mobile feature using Xcode",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Apple developer docs",
        "href": "https://developer.apple.com/documentation/",
        "category": "Official Documentation"
      },
      {
        "label": "SwiftUI tutorials",
        "href": "https://developer.apple.com/tutorials/swiftui",
        "category": "Video Courses"
      },
      {
        "label": "UIKit docs",
        "href": "https://developer.apple.com/documentation/uikit",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Xcode.",
      "Create a UI or architecture drill covering Xcode and UIKit.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a ios development feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in iOS Development, and how would you detect it before release?"
  },
  {
    "id": "swift-development",
    "title": "Swift Development",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Swift Development connects Async/Await, Combine, Data Persistence into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "iOS Development"
    ],
    "topics": [
      "Async/Await",
      "Combine",
      "Data Persistence"
    ],
    "skillsGained": [
      "Apply Async/Await in real mobile app workflows",
      "Connect Combine to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Swift Development fits into the mobile app lifecycle",
      "Ship a mobile feature using Async/Await",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Swift book",
        "href": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/",
        "category": "Official Documentation"
      },
      {
        "label": "Combine docs",
        "href": "https://developer.apple.com/documentation/combine",
        "category": "Official Documentation"
      },
      {
        "label": "Swift concurrency",
        "href": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Async/Await.",
      "Create a UI or architecture drill covering Async/Await and Combine.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a swift development feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Swift Development, and how would you detect it before release?"
  },
  {
    "id": "flutter-development",
    "title": "Flutter Development",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Flutter Development connects Widgets, State Management, Navigation into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Swift Development"
    ],
    "topics": [
      "Widgets",
      "State Management",
      "Navigation",
      "Animations"
    ],
    "skillsGained": [
      "Apply Widgets in real mobile app workflows",
      "Connect State Management to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Flutter Development fits into the mobile app lifecycle",
      "Ship a mobile feature using Widgets",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Flutter docs",
        "href": "https://docs.flutter.dev/",
        "category": "Official Documentation"
      },
      {
        "label": "Flutter codelabs",
        "href": "https://docs.flutter.dev/codelabs",
        "category": "Video Courses"
      },
      {
        "label": "Flutter samples",
        "href": "https://github.com/flutter/samples",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Widgets.",
      "Create a UI or architecture drill covering Widgets and State Management.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a flutter development feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Flutter Development, and how would you detect it before release?"
  },
  {
    "id": "react-native-development",
    "title": "React Native Development",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "React Native Development connects Components, Navigation, Native Modules into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Flutter Development"
    ],
    "topics": [
      "Components",
      "Navigation",
      "Native Modules",
      "Performance Optimization"
    ],
    "skillsGained": [
      "Apply Components in real mobile app workflows",
      "Connect Navigation to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how React Native Development fits into the mobile app lifecycle",
      "Ship a mobile feature using Components",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "React Native docs",
        "href": "https://reactnative.dev/docs/getting-started",
        "category": "Official Documentation"
      },
      {
        "label": "React Navigation",
        "href": "https://reactnavigation.org/docs/getting-started/",
        "category": "Official Documentation"
      },
      {
        "label": "React Native examples",
        "href": "https://github.com/ReactNativeNews/React-Native-Apps",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Components.",
      "Create a UI or architecture drill covering Components and Navigation.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a react native development feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in React Native Development, and how would you detect it before release?"
  },
  {
    "id": "backend-integration",
    "title": "Backend Integration",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "Backend Integration connects REST APIs, GraphQL, Authentication into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "React Native Development"
    ],
    "topics": [
      "REST APIs",
      "GraphQL",
      "Authentication",
      "WebSockets"
    ],
    "skillsGained": [
      "Apply REST APIs in real mobile app workflows",
      "Connect GraphQL to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Backend Integration fits into the mobile app lifecycle",
      "Ship a mobile feature using REST APIs",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "GraphQL docs",
        "href": "https://graphql.org/learn/",
        "category": "Official Documentation"
      },
      {
        "label": "REST API tutorial",
        "href": "https://restfulapi.net/",
        "category": "Community Resources"
      },
      {
        "label": "Socket.IO docs",
        "href": "https://socket.io/docs/v4/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for REST APIs.",
      "Create a UI or architecture drill covering REST APIs and GraphQL.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a backend integration feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Backend Integration, and how would you detect it before release?"
  },
  {
    "id": "local-storage",
    "title": "Local Storage",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Local Storage connects SQLite, Realm, AsyncStorage into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Backend Integration"
    ],
    "topics": [
      "SQLite",
      "Realm",
      "AsyncStorage",
      "Shared Preferences"
    ],
    "skillsGained": [
      "Apply SQLite in real mobile app workflows",
      "Connect Realm to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Local Storage fits into the mobile app lifecycle",
      "Ship a mobile feature using SQLite",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android data storage",
        "href": "https://developer.android.com/training/data-storage",
        "category": "Official Documentation"
      },
      {
        "label": "Core Data docs",
        "href": "https://developer.apple.com/documentation/coredata",
        "category": "Official Documentation"
      },
      {
        "label": "AsyncStorage docs",
        "href": "https://react-native-async-storage.github.io/async-storage/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for SQLite.",
      "Create a UI or architecture drill covering SQLite and Realm.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a local storage feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Local Storage, and how would you detect it before release?"
  },
  {
    "id": "mobile-databases",
    "title": "Mobile Databases",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Mobile Databases connects Firebase Firestore, SQLite, Room Database into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Local Storage"
    ],
    "topics": [
      "Firebase Firestore",
      "SQLite",
      "Room Database",
      "Core Data"
    ],
    "skillsGained": [
      "Apply Firebase Firestore in real mobile app workflows",
      "Connect SQLite to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Databases fits into the mobile app lifecycle",
      "Ship a mobile feature using Firebase Firestore",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Firebase Firestore docs",
        "href": "https://firebase.google.com/docs/firestore",
        "category": "Official Documentation"
      },
      {
        "label": "Room docs",
        "href": "https://developer.android.com/training/data-storage/room",
        "category": "Official Documentation"
      },
      {
        "label": "Realm docs",
        "href": "https://www.mongodb.com/docs/realm/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Firebase Firestore.",
      "Create a UI or architecture drill covering Firebase Firestore and SQLite.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile databases feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Databases, and how would you detect it before release?"
  },
  {
    "id": "authentication-and-security",
    "title": "Authentication & Security",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Authentication & Security connects JWT, OAuth, Biometrics into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Databases"
    ],
    "topics": [
      "JWT",
      "OAuth",
      "Biometrics",
      "Secure Storage"
    ],
    "skillsGained": [
      "Apply JWT in real mobile app workflows",
      "Connect OAuth to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Authentication & Security fits into the mobile app lifecycle",
      "Ship a mobile feature using JWT",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Firebase Auth docs",
        "href": "https://firebase.google.com/docs/auth",
        "category": "Official Documentation"
      },
      {
        "label": "Android biometric auth",
        "href": "https://developer.android.com/identity/sign-in/biometric-auth",
        "category": "Official Documentation"
      },
      {
        "label": "Apple AuthenticationServices",
        "href": "https://developer.apple.com/documentation/authenticationservices",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for JWT.",
      "Create a UI or architecture drill covering JWT and OAuth.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a authentication & security feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Authentication & Security, and how would you detect it before release?"
  },
  {
    "id": "mobile-architecture",
    "title": "Mobile Architecture",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Mobile Architecture connects MVVM, MVC, Clean Architecture into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Authentication & Security"
    ],
    "topics": [
      "MVVM",
      "MVC",
      "Clean Architecture",
      "Modular Architecture"
    ],
    "skillsGained": [
      "Apply MVVM in real mobile app workflows",
      "Connect MVC to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Architecture fits into the mobile app lifecycle",
      "Ship a mobile feature using MVVM",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Guide to app architecture",
        "href": "https://developer.android.com/topic/architecture",
        "category": "Official Documentation"
      },
      {
        "label": "iOS app architecture",
        "href": "https://developer.apple.com/documentation/swiftui/model-data",
        "category": "Official Documentation"
      },
      {
        "label": "Flutter architecture guide",
        "href": "https://docs.flutter.dev/app-architecture",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for MVVM.",
      "Create a UI or architecture drill covering MVVM and MVC.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile architecture feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Architecture, and how would you detect it before release?"
  },
  {
    "id": "state-management",
    "title": "State Management",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "State Management connects Riverpod, Bloc, Redux into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Architecture"
    ],
    "topics": [
      "Riverpod",
      "Bloc",
      "Redux",
      "MobX",
      "Zustand"
    ],
    "skillsGained": [
      "Apply Riverpod in real mobile app workflows",
      "Connect Bloc to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how State Management fits into the mobile app lifecycle",
      "Ship a mobile feature using Riverpod",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Riverpod docs",
        "href": "https://riverpod.dev/",
        "category": "Official Documentation"
      },
      {
        "label": "Bloc docs",
        "href": "https://bloclibrary.dev/",
        "category": "Official Documentation"
      },
      {
        "label": "Redux Toolkit",
        "href": "https://redux-toolkit.js.org/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Riverpod.",
      "Create a UI or architecture drill covering Riverpod and Bloc.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a state management feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in State Management, and how would you detect it before release?"
  },
  {
    "id": "testing",
    "title": "Testing",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Testing connects Unit Testing, Integration Testing, UI Testing into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "State Management"
    ],
    "topics": [
      "Unit Testing",
      "Integration Testing",
      "UI Testing",
      "Automation Testing"
    ],
    "skillsGained": [
      "Apply Unit Testing in real mobile app workflows",
      "Connect Integration Testing to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Testing fits into the mobile app lifecycle",
      "Ship a mobile feature using Unit Testing",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android testing",
        "href": "https://developer.android.com/training/testing",
        "category": "Official Documentation"
      },
      {
        "label": "Apple testing docs",
        "href": "https://developer.apple.com/documentation/xctest",
        "category": "Official Documentation"
      },
      {
        "label": "Detox docs",
        "href": "https://wix.github.io/Detox/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Unit Testing.",
      "Create a UI or architecture drill covering Unit Testing and Integration Testing.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a testing feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Testing, and how would you detect it before release?"
  },
  {
    "id": "performance-optimization",
    "title": "Performance Optimization",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "5 weeks",
    "description": "Performance Optimization connects Memory Management, App Startup Optimization, Battery Optimization into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Testing"
    ],
    "topics": [
      "Memory Management",
      "App Startup Optimization",
      "Battery Optimization",
      "Rendering Optimization"
    ],
    "skillsGained": [
      "Apply Memory Management in real mobile app workflows",
      "Connect App Startup Optimization to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Performance Optimization fits into the mobile app lifecycle",
      "Ship a mobile feature using Memory Management",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android performance",
        "href": "https://developer.android.com/topic/performance",
        "category": "Official Documentation"
      },
      {
        "label": "Apple performance docs",
        "href": "https://developer.apple.com/documentation/xcode/improving-your-app-s-performance",
        "category": "Official Documentation"
      },
      {
        "label": "React Native performance",
        "href": "https://reactnative.dev/docs/performance",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Memory Management.",
      "Create a UI or architecture drill covering Memory Management and App Startup Optimization.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a performance optimization feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Performance Optimization, and how would you detect it before release?"
  },
  {
    "id": "notifications",
    "title": "Notifications",
    "stage": "Advanced",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Notifications connects Push Notifications, Firebase Cloud Messaging, APNs into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Performance Optimization"
    ],
    "topics": [
      "Push Notifications",
      "Firebase Cloud Messaging",
      "APNs"
    ],
    "skillsGained": [
      "Apply Push Notifications in real mobile app workflows",
      "Connect Firebase Cloud Messaging to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Notifications fits into the mobile app lifecycle",
      "Ship a mobile feature using Push Notifications",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Firebase Cloud Messaging",
        "href": "https://firebase.google.com/docs/cloud-messaging",
        "category": "Official Documentation"
      },
      {
        "label": "Apple Push Notification service",
        "href": "https://developer.apple.com/documentation/usernotifications",
        "category": "Official Documentation"
      },
      {
        "label": "Expo notifications",
        "href": "https://docs.expo.dev/push-notifications/overview/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Push Notifications.",
      "Create a UI or architecture drill covering Push Notifications and Firebase Cloud Messaging.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a notifications feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Notifications, and how would you detect it before release?"
  },
  {
    "id": "offline-first-applications",
    "title": "Offline-First Applications",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Offline-First Applications connects Local Caching, Sync Strategies, Background Tasks into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Notifications"
    ],
    "topics": [
      "Local Caching",
      "Sync Strategies",
      "Background Tasks"
    ],
    "skillsGained": [
      "Apply Local Caching in real mobile app workflows",
      "Connect Sync Strategies to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Offline-First Applications fits into the mobile app lifecycle",
      "Ship a mobile feature using Local Caching",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Android offline guide",
        "href": "https://developer.android.com/topic/architecture/data-layer/offline-first",
        "category": "Official Documentation"
      },
      {
        "label": "WorkManager docs",
        "href": "https://developer.android.com/topic/libraries/architecture/workmanager",
        "category": "Official Documentation"
      },
      {
        "label": "Apollo offline support",
        "href": "https://www.apollographql.com/docs/react/data/offline",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Local Caching.",
      "Create a UI or architecture drill covering Local Caching and Sync Strategies.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a offline-first applications feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Offline-First Applications, and how would you detect it before release?"
  },
  {
    "id": "ci-cd-for-mobile",
    "title": "CI/CD for Mobile",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "CI/CD for Mobile connects GitHub Actions, Fastlane, Automated Builds into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Offline-First Applications"
    ],
    "topics": [
      "GitHub Actions",
      "Fastlane",
      "Automated Builds",
      "Deployment Pipelines"
    ],
    "skillsGained": [
      "Apply GitHub Actions in real mobile app workflows",
      "Connect Fastlane to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how CI/CD for Mobile fits into the mobile app lifecycle",
      "Ship a mobile feature using GitHub Actions",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Fastlane docs",
        "href": "https://docs.fastlane.tools/",
        "category": "Official Documentation"
      },
      {
        "label": "GitHub Actions mobile",
        "href": "https://docs.github.com/en/actions",
        "category": "Official Documentation"
      },
      {
        "label": "Bitrise docs",
        "href": "https://devcenter.bitrise.io/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for GitHub Actions.",
      "Create a UI or architecture drill covering GitHub Actions and Fastlane.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a ci/cd for mobile feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in CI/CD for Mobile, and how would you detect it before release?"
  },
  {
    "id": "firebase-ecosystem",
    "title": "Firebase Ecosystem",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Firebase Ecosystem connects Authentication, Firestore, Analytics into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "CI/CD for Mobile"
    ],
    "topics": [
      "Authentication",
      "Firestore",
      "Analytics",
      "Crashlytics"
    ],
    "skillsGained": [
      "Apply Authentication in real mobile app workflows",
      "Connect Firestore to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Firebase Ecosystem fits into the mobile app lifecycle",
      "Ship a mobile feature using Authentication",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Firebase docs",
        "href": "https://firebase.google.com/docs",
        "category": "Official Documentation"
      },
      {
        "label": "Crashlytics docs",
        "href": "https://firebase.google.com/docs/crashlytics",
        "category": "Official Documentation"
      },
      {
        "label": "Firebase samples",
        "href": "https://github.com/firebase/quickstart-android",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Authentication.",
      "Create a UI or architecture drill covering Authentication and Firestore.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a firebase ecosystem feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Firebase Ecosystem, and how would you detect it before release?"
  },
  {
    "id": "mobile-security",
    "title": "Mobile Security",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Mobile Security connects Encryption, Secure APIs, Certificate Pinning into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Firebase Ecosystem"
    ],
    "topics": [
      "Encryption",
      "Secure APIs",
      "Certificate Pinning",
      "Reverse Engineering Protection"
    ],
    "skillsGained": [
      "Apply Encryption in real mobile app workflows",
      "Connect Secure APIs to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile Security fits into the mobile app lifecycle",
      "Ship a mobile feature using Encryption",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "OWASP MASVS",
        "href": "https://mas.owasp.org/MASVS/",
        "category": "Official Documentation"
      },
      {
        "label": "OWASP MASTG",
        "href": "https://mas.owasp.org/MASTG/",
        "category": "Official Documentation"
      },
      {
        "label": "Android security docs",
        "href": "https://developer.android.com/privacy-and-security/security-tips",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Encryption.",
      "Create a UI or architecture drill covering Encryption and Secure APIs.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile security feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile Security, and how would you detect it before release?"
  },
  {
    "id": "advanced-android-engineering",
    "title": "Advanced Android Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced Android Engineering connects Jetpack Compose, Multi-Module Architecture, Advanced Performance into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile Security"
    ],
    "topics": [
      "Jetpack Compose",
      "Multi-Module Architecture",
      "Advanced Performance"
    ],
    "skillsGained": [
      "Apply Jetpack Compose in real mobile app workflows",
      "Connect Multi-Module Architecture to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Advanced Android Engineering fits into the mobile app lifecycle",
      "Ship a mobile feature using Jetpack Compose",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Jetpack Compose",
        "href": "https://developer.android.com/compose",
        "category": "Official Documentation"
      },
      {
        "label": "Android performance samples",
        "href": "https://github.com/android/performance-samples",
        "category": "Open Source Apps"
      },
      {
        "label": "Android architecture samples",
        "href": "https://github.com/android/architecture-samples",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Jetpack Compose.",
      "Create a UI or architecture drill covering Jetpack Compose and Multi-Module Architecture.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a advanced android engineering feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Advanced Android Engineering, and how would you detect it before release?"
  },
  {
    "id": "advanced-ios-engineering",
    "title": "Advanced iOS Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced iOS Engineering connects SwiftUI Advanced, App Extensions, Widgets into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Advanced Android Engineering"
    ],
    "topics": [
      "SwiftUI Advanced",
      "App Extensions",
      "Widgets",
      "Advanced Architecture"
    ],
    "skillsGained": [
      "Apply SwiftUI Advanced in real mobile app workflows",
      "Connect App Extensions to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Advanced iOS Engineering fits into the mobile app lifecycle",
      "Ship a mobile feature using SwiftUI Advanced",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "SwiftUI docs",
        "href": "https://developer.apple.com/documentation/swiftui",
        "category": "Official Documentation"
      },
      {
        "label": "App extensions",
        "href": "https://developer.apple.com/app-extensions/",
        "category": "Official Documentation"
      },
      {
        "label": "WidgetKit docs",
        "href": "https://developer.apple.com/documentation/widgetkit",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for SwiftUI Advanced.",
      "Create a UI or architecture drill covering SwiftUI Advanced and App Extensions.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a advanced ios engineering feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Advanced iOS Engineering, and how would you detect it before release?"
  },
  {
    "id": "advanced-flutter-engineering",
    "title": "Advanced Flutter Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Flutter Engineering connects Platform Channels, Native Integrations, Advanced Rendering into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Advanced iOS Engineering"
    ],
    "topics": [
      "Platform Channels",
      "Native Integrations",
      "Advanced Rendering"
    ],
    "skillsGained": [
      "Apply Platform Channels in real mobile app workflows",
      "Connect Native Integrations to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Advanced Flutter Engineering fits into the mobile app lifecycle",
      "Ship a mobile feature using Platform Channels",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Platform channels",
        "href": "https://docs.flutter.dev/platform-integration/platform-channels",
        "category": "Official Documentation"
      },
      {
        "label": "Flutter rendering",
        "href": "https://docs.flutter.dev/resources/architectural-overview",
        "category": "Official Documentation"
      },
      {
        "label": "Flutter gallery",
        "href": "https://github.com/flutter/gallery",
        "category": "Open Source Apps"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Platform Channels.",
      "Create a UI or architecture drill covering Platform Channels and Native Integrations.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a advanced flutter engineering feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Advanced Flutter Engineering, and how would you detect it before release?"
  },
  {
    "id": "advanced-react-native-engineering",
    "title": "Advanced React Native Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced React Native Engineering connects Native Modules, New Architecture, Turbo Modules into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Advanced Flutter Engineering"
    ],
    "topics": [
      "Native Modules",
      "New Architecture",
      "Turbo Modules",
      "Fabric"
    ],
    "skillsGained": [
      "Apply Native Modules in real mobile app workflows",
      "Connect New Architecture to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Advanced React Native Engineering fits into the mobile app lifecycle",
      "Ship a mobile feature using Native Modules",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "React Native new architecture",
        "href": "https://reactnative.dev/docs/the-new-architecture/landing-page",
        "category": "Official Documentation"
      },
      {
        "label": "Turbo Native Modules",
        "href": "https://reactnative.dev/docs/turbo-native-modules-introduction",
        "category": "Official Documentation"
      },
      {
        "label": "Fabric renderer",
        "href": "https://reactnative.dev/architecture/fabric-renderer",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Native Modules.",
      "Create a UI or architecture drill covering Native Modules and New Architecture.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a advanced react native engineering feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Advanced React Native Engineering, and how would you detect it before release?"
  },
  {
    "id": "mobile-devops",
    "title": "Mobile DevOps",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Mobile DevOps connects App Distribution, Monitoring, Observability into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Advanced React Native Engineering"
    ],
    "topics": [
      "App Distribution",
      "Monitoring",
      "Observability",
      "Release Management"
    ],
    "skillsGained": [
      "Apply App Distribution in real mobile app workflows",
      "Connect Monitoring to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile DevOps fits into the mobile app lifecycle",
      "Ship a mobile feature using App Distribution",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "App Store Connect docs",
        "href": "https://developer.apple.com/help/app-store-connect/",
        "category": "Official Documentation"
      },
      {
        "label": "Google Play Console docs",
        "href": "https://support.google.com/googleplay/android-developer/",
        "category": "Official Documentation"
      },
      {
        "label": "Firebase App Distribution",
        "href": "https://firebase.google.com/docs/app-distribution",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for App Distribution.",
      "Create a UI or architecture drill covering App Distribution and Monitoring.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile devops feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile DevOps, and how would you detect it before release?"
  },
  {
    "id": "mobile-system-design",
    "title": "Mobile System Design",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Mobile System Design connects Scalable Mobile Apps, Offline Architecture, Real-Time Systems into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile DevOps"
    ],
    "topics": [
      "Scalable Mobile Apps",
      "Offline Architecture",
      "Real-Time Systems",
      "Synchronization"
    ],
    "skillsGained": [
      "Apply Scalable Mobile Apps in real mobile app workflows",
      "Connect Offline Architecture to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Mobile System Design fits into the mobile app lifecycle",
      "Ship a mobile feature using Scalable Mobile Apps",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Designing mobile systems",
        "href": "https://developer.android.com/topic/architecture",
        "category": "Official Documentation"
      },
      {
        "label": "Realtime database docs",
        "href": "https://firebase.google.com/docs/database",
        "category": "Official Documentation"
      },
      {
        "label": "Offline-first guide",
        "href": "https://developer.android.com/topic/architecture/data-layer/offline-first",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Scalable Mobile Apps.",
      "Create a UI or architecture drill covering Scalable Mobile Apps and Offline Architecture.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a mobile system design feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Mobile System Design, and how would you detect it before release?"
  },
  {
    "id": "emerging-mobile-technologies",
    "title": "Emerging Mobile Technologies",
    "stage": "Expert",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Emerging Mobile Technologies connects AI in Mobile Apps, Wearables, AR/VR into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Mobile System Design"
    ],
    "topics": [
      "AI in Mobile Apps",
      "Wearables",
      "AR/VR",
      "IoT Mobile Apps"
    ],
    "skillsGained": [
      "Apply AI in Mobile Apps in real mobile app workflows",
      "Connect Wearables to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Emerging Mobile Technologies fits into the mobile app lifecycle",
      "Ship a mobile feature using AI in Mobile Apps",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "ARCore docs",
        "href": "https://developers.google.com/ar",
        "category": "Official Documentation"
      },
      {
        "label": "ARKit docs",
        "href": "https://developer.apple.com/augmented-reality/arkit/",
        "category": "Official Documentation"
      },
      {
        "label": "Wear OS docs",
        "href": "https://developer.android.com/wear",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for AI in Mobile Apps.",
      "Create a UI or architecture drill covering AI in Mobile Apps and Wearables.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a emerging mobile technologies feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Emerging Mobile Technologies, and how would you detect it before release?"
  },
  {
    "id": "leadership-and-engineering-practices",
    "title": "Leadership & Engineering Practices",
    "stage": "Expert",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Leadership & Engineering Practices connects Code Reviews, Team Collaboration, Technical Documentation into practical mobile engineering skill for production apps.",
    "prerequisites": [
      "Emerging Mobile Technologies"
    ],
    "topics": [
      "Code Reviews",
      "Team Collaboration",
      "Technical Documentation",
      "Architecture Decisions"
    ],
    "skillsGained": [
      "Apply Code Reviews in real mobile app workflows",
      "Connect Team Collaboration to platform-specific engineering decisions",
      "Debug mobile performance, UX, and release risks",
      "Build portfolio-ready mobile features"
    ],
    "learningOutcomes": [
      "Explain how Leadership & Engineering Practices fits into the mobile app lifecycle",
      "Ship a mobile feature using Code Reviews",
      "Evaluate tradeoffs across Android, iOS, and cross-platform delivery"
    ],
    "resources": [
      {
        "label": "Google engineering practices",
        "href": "https://google.github.io/eng-practices/",
        "category": "Community Resources"
      },
      {
        "label": "Architecture decision records",
        "href": "https://adr.github.io/",
        "category": "Community Resources"
      },
      {
        "label": "Mobile app quality",
        "href": "https://developer.android.com/docs/quality-guidelines",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Build a focused coding challenge for Code Reviews.",
      "Create a UI or architecture drill covering Code Reviews and Team Collaboration.",
      "Document a real-world mobile scenario and how you would debug it."
    ],
    "miniProject": "Build a leadership & engineering practices feature inside a production-style mobile app shell.",
    "realWorldApplications": [
      "Consumer mobile apps",
      "Enterprise mobile platforms",
      "Cross-platform product delivery"
    ],
    "quiz": "What mobile failure mode would you expect in Leadership & Engineering Practices, and how would you detect it before release?"
  }
];

const projectTracks: ProjectTrack[] = [
  {
    "stage": "Beginner",
    "projects": [
      "Calculator App",
      "Notes App",
      "Weather App",
      "Expense Tracker"
    ]
  },
  {
    "stage": "Intermediate",
    "projects": [
      "Authentication App",
      "Chat Application",
      "Food Delivery App",
      "Fitness Tracker"
    ]
  },
  {
    "stage": "Advanced",
    "projects": [
      "E-Commerce Mobile App",
      "Real-Time Messaging Platform",
      "Social Media Application",
      "Ride Sharing Application"
    ]
  },
  {
    "stage": "Expert",
    "projects": [
      "Multi-Tenant Mobile SaaS",
      "Enterprise Mobile Platform",
      "Offline-First Business Application",
      "Large-Scale Cross-Platform Ecosystem"
    ]
  }
];

const missingTopics = [
  "App store optimization",
  "Privacy manifests",
  "In-app purchases",
  "Payments and subscriptions",
  "Feature flags",
  "A/B testing",
  "Mobile analytics taxonomy",
  "Crash triage workflow",
  "Localization and internationalization",
  "App size optimization",
  "Device lab QA",
  "Accessibility audits"
];

const careerPaths = [
  {
    "title": "Android Developer",
    "focus": "Build Kotlin, Jetpack, Compose, Room, WorkManager, and Play Store-ready Android applications.",
    "milestones": [
      "Compose UI",
      "Room database",
      "Play release"
    ]
  },
  {
    "title": "iOS Developer",
    "focus": "Build Swift, SwiftUI, UIKit, Core Data, APNs, and App Store-ready iOS applications.",
    "milestones": [
      "SwiftUI app",
      "Core Data flow",
      "App Store build"
    ]
  },
  {
    "title": "Flutter Developer",
    "focus": "Ship Dart, widgets, Riverpod/Bloc, platform channels, and polished cross-platform apps.",
    "milestones": [
      "Widget system",
      "State management",
      "Platform channel"
    ]
  },
  {
    "title": "React Native Developer",
    "focus": "Ship native-feeling React Native apps with navigation, native modules, and performance tuning.",
    "milestones": [
      "Navigation flow",
      "Native module",
      "Perf pass"
    ]
  },
  {
    "title": "Cross-Platform Engineer",
    "focus": "Choose stack tradeoffs, manage shared design systems, and coordinate Android/iOS delivery.",
    "milestones": [
      "Shared UI kit",
      "Release pipeline",
      "Device QA matrix"
    ]
  },
  {
    "title": "Mobile Architect",
    "focus": "Lead scalable mobile architecture, modularization, offline sync, security, and release strategy.",
    "milestones": [
      "Architecture ADR",
      "Offline strategy",
      "Security review"
    ]
  }
];

const certificationPaths = [
  {
    "title": "Google Associate Android Developer",
    "focus": "Android fundamentals, Kotlin, Jetpack, UI, data persistence, testing, and app quality.",
    "milestones": [
      "Kotlin basics",
      "Jetpack app",
      "Testing practice"
    ]
  },
  {
    "title": "Flutter Certification Path",
    "focus": "Dart, widgets, state management, animations, navigation, platform integration, and release basics.",
    "milestones": [
      "Dart fluency",
      "Flutter app",
      "Platform integration"
    ]
  },
  {
    "title": "Apple Developer Learning Path",
    "focus": "Swift, SwiftUI, Xcode, app lifecycle, HIG, data persistence, and App Store delivery.",
    "milestones": [
      "SwiftUI app",
      "HIG review",
      "App Store prep"
    ]
  },
  {
    "title": "Firebase Certification Path",
    "focus": "Firebase Auth, Firestore, Cloud Messaging, Analytics, Crashlytics, and app distribution.",
    "milestones": [
      "Auth setup",
      "Firestore sync",
      "Crashlytics dashboard"
    ]
  },
  {
    "title": "React Native Professional Path",
    "focus": "React Native fundamentals, navigation, native modules, performance, testing, and release workflows.",
    "milestones": [
      "RN app",
      "Native bridge",
      "Release pipeline"
    ]
  }
];

const achievementBadges = [
  "Mobile Starter",
  "Android Builder",
  "iOS Crafter",
  "Flutter Shipper",
  "React Native Pro",
  "Offline Architect",
  "Security Sentinel",
  "Release Lead"
];

const progressSchema = [
  [
    "users",
    "id, name, email, role, created_at"
  ],
  [
    "mobile_progress",
    "user_id, roadmap_id, completed_node_ids, xp, streak_days, readiness_scores"
  ],
  [
    "coding_challenges",
    "user_id, topic_id, platform, status, score, completed_at"
  ],
  [
    "app_projects",
    "user_id, project_id, repository_url, build_status, release_notes"
  ],
  [
    "certification_tracking",
    "user_id, certification_id, target_date, status, score"
  ],
  [
    "release_runs",
    "user_id, app_id, platform, version, channel, shipped_at"
  ]
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

const resourceCategories: ResourceCategory[] = ["Official Documentation", "Video Courses", "Open Source Apps", "Community Resources", "Design Resources"];

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

export default function MobileDeveloperRoadmap() {
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
  const androidTopicIds = roadmapNodes.filter((node) => ["Android Development", "Kotlin for Android", "Advanced Android Engineering", "Firebase Ecosystem"].includes(node.title)).map((node) => node.id);
  const iosTopicIds = roadmapNodes.filter((node) => ["iOS Development", "Swift Development", "Advanced iOS Engineering"].includes(node.title)).map((node) => node.id);
  const flutterTopicIds = roadmapNodes.filter((node) => ["Flutter Development", "State Management", "Advanced Flutter Engineering"].includes(node.title)).map((node) => node.id);
  const reactNativeTopicIds = roadmapNodes.filter((node) => ["React Native Development", "Advanced React Native Engineering", "Backend Integration"].includes(node.title)).map((node) => node.id);
  const androidReadiness = Math.round((androidTopicIds.filter((id) => completedIds.has(id)).length / androidTopicIds.length) * 100);
  const iosReadiness = Math.round((iosTopicIds.filter((id) => completedIds.has(id)).length / iosTopicIds.length) * 100);
  const flutterReadiness = Math.round((flutterTopicIds.filter((id) => completedIds.has(id)).length / flutterTopicIds.length) * 100);
  const reactNativeReadiness = Math.round((reactNativeTopicIds.filter((id) => completedIds.has(id)).length / reactNativeTopicIds.length) * 100);

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
            <span className="font-bold text-zinc-300">Mobile Developer</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="server" />
                  Production Mobile Engineering Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Mobile Developer Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete production-grade mobile engineering journey across Android, iOS, Flutter, React Native, architecture, backend integration, security, performance, CI/CD, and release operations.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["33", "Roadmap nodes", "layers"],
                    ["88-120 weeks", "Total duration", "clock"],
                    ["150+", "Mobile skills", "badge"],
                    ["16", "Mobile projects", "target"],
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
                <p className="text-sm font-black text-white">Mobile Platform Architecture</p>
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
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every phase ends with practical mobile apps that combine UI, state, storage, backend integration, security, testing, release, and observability.</p>
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
                <h2 className="text-2xl font-black text-white">Vertical Mobile Engineering Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Expand each node for prerequisites, learning outcomes, resources, coding challenges, architecture drills, real-world scenarios, quizzes, bookmarks, and notes.
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
            <h2 className="text-2xl font-black text-white">Mobile Engineering Resource Matrix</h2>
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
            <h2 className="text-2xl font-black text-white">Mobile Specialization Paths</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              The roadmap supports Android, iOS, Flutter, React Native, cross-platform engineering, and mobile architecture without splitting fundamentals too early.
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

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Mobile Certifications Tracker</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Map roadmap progress to practical Android, Flutter, Apple, Firebase, and React Native certification goals without turning the page into a memorization checklist.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {certificationPaths.map((certification) => (
                <section className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={certification.title}>
                  <h3 className="text-sm font-black text-white">{certification.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{certification.focus}</p>
                  <div className="mt-4 space-y-2">
                    {certification.milestones.map((milestone) => (
                      <span className="flex gap-2 text-xs font-bold text-zinc-300" key={milestone}>
                        <Icon className="h-3.5 w-3.5 shrink-0 text-red-400" name="check" />
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
              <h2 className="text-2xl font-black text-white">Gamification & Mobile Learning Tools</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["XP System", "Award XP for completed topics, coding challenges, UI drills, architecture reviews, certification milestones, and streaks."],
                  ["Achievement Badges", "Unlock visible badges for Android, iOS, Flutter, React Native, offline-first, security, performance, and release mastery."],
                  ["Milestones", "Mark phase completions with certification-ready checkpoints and app portfolio prompts."],
                  ["Learning Challenges", "Add weekly mobile UI challenges, debugging exercises, architecture drills, and release missions."],
                  ["Interactive Quizzes", "Attach quiz prompts, coding exercises, UI tasks, debugging checks, and architecture scenarios to each topic."],
                  ["Progress Sync", "Store notes, bookmarks, XP, completions, coding challenge results, app builds, release runs, and certification progress per user account."],
                ].map(([title, detail]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Mobile Progress Database Schema</h2>
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
                ["Component hierarchy", "MobileDeveloperRoadmap -> SidebarPanel -> ProgressRing -> RoadmapNodeCard -> career paths, gamification, resources, notes, quiz, project sections."],
                ["Folder architecture", "Future extraction: src/features/roadmaps/mobile/data.ts, components/RoadmapNodeCard.tsx, components/ProgressDashboard.tsx, components/MobileSpecializationPanel.tsx, components/GamificationPanel.tsx."],
                ["TypeScript interfaces", "Stage, Difficulty, ResourceCategory, Resource, RoadmapNode, StageSummary, ProjectTrack, MobileSpecializationPath, CertificationPath, PlatformBadge, ProgressSchema."],
                ["Tailwind structure", "Black base surface, zinc borders, red accent states, compact 13px root scale, mobile dashboard grids, sticky platform-readiness panel, accessible focus and pressed states."],
                ["Framer Motion plan", "Use motion only for node expansion, platform graph pulse states, readiness score transitions, and badge unlocks with reduced-motion fallbacks once the dependency is installed."],
                ["shadcn/ui plan", "Extract buttons, cards, progress, tabs, textareas, badges, accordions, challenge cards, and command navigation into shadcn-style primitives when the component library is added."],
                ["Feature specifications", "Completion tracking, bookmarks, challenge notes, UI exercises, debugging scenarios, quizzes, XP, certification tracker, progress sync, recommended next step."],
                ["UX improvements", "Vertical mobile engineering progression, skill dependency graph, low-glow premium surfaces, platform lanes, readiness widgets, mobile-first single-column behavior."],
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

          <SidebarPanel title="Mobile Development Progress">
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

          <SidebarPanel title="Platform Readiness">
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                [`${androidReadiness}%`, "Android readiness", "server"],
                [`${iosReadiness}%`, "iOS readiness", "layers"],
                [`${flutterReadiness}%`, "Flutter readiness", "shield"],
                [`${reactNativeReadiness}%`, "React Native", "code"],
              ].map(([value, label, icon]) => (
                <div className="rounded-md border border-zinc-800 bg-[#050505] p-3" key={label}>
                  <Icon className="h-4 w-4 text-red-400" name={icon as keyof typeof icons} />
                  <p className="mt-2 text-lg font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-500">
              <span>{currentLevel} phase active</span>
              <span>88-120w estimated</span>
              <span>{bookmarkedIds.size} bookmarks</span>
              <span>{noteCount} notes saved</span>
              <span>{completedCount} topics completed</span>
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

          <SidebarPanel title="Missing Mobile Topics Added">
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
