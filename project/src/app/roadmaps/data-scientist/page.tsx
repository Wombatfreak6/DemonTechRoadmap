"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official Documentation" | "Research Papers" | "Kaggle Resources" | "Courses" | "Community Resources" | "Certification Resources";

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
  completed: "demontech-data-scientist-roadmap-completed",
  bookmarked: "demontech-data-scientist-roadmap-bookmarked",
  notes: "demontech-data-scientist-roadmap-notes",
};

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "22-26 weeks",
    outcome: "Understand the data science lifecycle, math, statistics, Python, Git, and core analytical libraries.",
  },
  {
    stage: "Intermediate",
    duration: "28-34 weeks",
    outcome: "Collect, clean, explore, query, engineer, train, evaluate, and communicate with real datasets.",
  },
  {
    stage: "Advanced",
    duration: "34-40 weeks",
    outcome: "Build deep learning, computer vision, NLP, GenAI, big data, MLOps, cloud, and data engineering workflows.",
  },
  {
    stage: "Expert",
    duration: "24-30 weeks",
    outcome: "Design production AI systems, research experiments, responsible data governance, and executive-grade data narratives.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    "id": "data-science-fundamentals",
    "title": "Data Science Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "1 week",
    "description": "Data Science Fundamentals connects What is Data Science, Data Science Lifecycle, Types of Data into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Curiosity, spreadsheet comfort, and basic analytical thinking"
    ],
    "topics": [
      "What is Data Science",
      "Data Science Lifecycle",
      "Types of Data",
      "Structured vs Unstructured Data",
      "Data-Driven Decision Making"
    ],
    "skillsGained": [
      "Apply What is Data Science in notebook and production workflows",
      "Use Data Science Lifecycle to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Science Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using What is Data Science",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Google Data Science guide",
        "href": "https://developers.google.com/machine-learning/guides/rules-of-ml",
        "category": "Official Documentation"
      },
      {
        "label": "Kaggle Learn",
        "href": "https://www.kaggle.com/learn",
        "category": "Kaggle Resources"
      },
      {
        "label": "Data Science Handbook",
        "href": "https://jakevdp.github.io/PythonDataScienceHandbook/",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Iris dataset.",
      "Write an analysis note comparing What is Data Science and Data Science Lifecycle.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data science fundamentals notebook using Iris dataset.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Science Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "mathematics-for-data-science",
    "title": "Mathematics for Data Science",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "4 weeks",
    "description": "Mathematics for Data Science connects Algebra, Linear Algebra, Calculus Basics into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Science Fundamentals"
    ],
    "topics": [
      "Algebra",
      "Linear Algebra",
      "Calculus Basics",
      "Matrices",
      "Vectors"
    ],
    "skillsGained": [
      "Apply Algebra in notebook and production workflows",
      "Use Linear Algebra to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Mathematics for Data Science fits into the data science lifecycle",
      "Complete a dataset challenge using Algebra",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Khan Academy linear algebra",
        "href": "https://www.khanacademy.org/math/linear-algebra",
        "category": "Courses"
      },
      {
        "label": "3Blue1Brown linear algebra",
        "href": "https://www.3blue1brown.com/topics/linear-algebra",
        "category": "Courses"
      },
      {
        "label": "Mathematics for ML book",
        "href": "https://mml-book.github.io/",
        "category": "Research Papers"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Titanic dataset.",
      "Write an analysis note comparing Algebra and Linear Algebra.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a mathematics for data science notebook using Titanic dataset.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Mathematics for Data Science would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "statistics-fundamentals",
    "title": "Statistics Fundamentals",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "4 weeks",
    "description": "Statistics Fundamentals connects Descriptive Statistics, Probability, Distributions into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Mathematics for Data Science"
    ],
    "topics": [
      "Descriptive Statistics",
      "Probability",
      "Distributions",
      "Sampling",
      "Hypothesis Testing",
      "Confidence Intervals"
    ],
    "skillsGained": [
      "Apply Descriptive Statistics in notebook and production workflows",
      "Use Probability to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Statistics Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using Descriptive Statistics",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "OpenIntro Statistics",
        "href": "https://www.openintro.org/book/os/",
        "category": "Courses"
      },
      {
        "label": "Seeing Theory",
        "href": "https://seeing-theory.brown.edu/",
        "category": "Courses"
      },
      {
        "label": "StatQuest",
        "href": "https://www.youtube.com/user/joshstarmer",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Student performance data.",
      "Write an analysis note comparing Descriptive Statistics and Probability.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a statistics fundamentals notebook using Student performance data.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Statistics Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "python-fundamentals",
    "title": "Python Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "3 weeks",
    "description": "Python Fundamentals connects Variables, Functions, Loops into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Statistics Fundamentals"
    ],
    "topics": [
      "Variables",
      "Functions",
      "Loops",
      "OOP",
      "Error Handling"
    ],
    "skillsGained": [
      "Apply Variables in notebook and production workflows",
      "Use Functions to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Python Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using Variables",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Python docs",
        "href": "https://docs.python.org/3/tutorial/",
        "category": "Official Documentation"
      },
      {
        "label": "Automate the Boring Stuff",
        "href": "https://automatetheboringstuff.com/",
        "category": "Courses"
      },
      {
        "label": "Exercism Python",
        "href": "https://exercism.org/tracks/python",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the COVID public data.",
      "Write an analysis note comparing Variables and Functions.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a python fundamentals notebook using COVID public data.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Python Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-structures-and-algorithms",
    "title": "Data Structures & Algorithms",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Data Structures & Algorithms connects Arrays, Linked Lists, Hash Maps into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Python Fundamentals"
    ],
    "topics": [
      "Arrays",
      "Linked Lists",
      "Hash Maps",
      "Sorting",
      "Searching"
    ],
    "skillsGained": [
      "Apply Arrays in notebook and production workflows",
      "Use Linked Lists to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Structures & Algorithms fits into the data science lifecycle",
      "Complete a dataset challenge using Arrays",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "The Algorithms",
        "href": "https://the-algorithms.com/",
        "category": "Community Resources"
      },
      {
        "label": "VisuAlgo",
        "href": "https://visualgo.net/",
        "category": "Courses"
      },
      {
        "label": "LeetCode",
        "href": "https://leetcode.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Iris dataset.",
      "Write an analysis note comparing Arrays and Linked Lists.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data structures & algorithms notebook using Iris dataset.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Structures & Algorithms would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "git-and-github",
    "title": "Git & GitHub",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Git & GitHub connects Version Control, Branching, Collaboration into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Structures & Algorithms"
    ],
    "topics": [
      "Version Control",
      "Branching",
      "Collaboration"
    ],
    "skillsGained": [
      "Apply Version Control in notebook and production workflows",
      "Use Branching to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Git & GitHub fits into the data science lifecycle",
      "Complete a dataset challenge using Version Control",
      "Evaluate risks, assumptions, and next experiments"
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
        "category": "Courses"
      },
      {
        "label": "DemonTech Git roadmap",
        "href": "/roadmaps/git",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Titanic dataset.",
      "Write an analysis note comparing Version Control and Branching.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a git & github notebook using Titanic dataset.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Git & GitHub would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "python-libraries",
    "title": "Python Libraries",
    "stage": "Beginner",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Python Libraries connects NumPy, Pandas, Matplotlib into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Git & GitHub"
    ],
    "topics": [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn"
    ],
    "skillsGained": [
      "Apply NumPy in notebook and production workflows",
      "Use Pandas to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Python Libraries fits into the data science lifecycle",
      "Complete a dataset challenge using NumPy",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "NumPy docs",
        "href": "https://numpy.org/doc/",
        "category": "Official Documentation"
      },
      {
        "label": "Pandas docs",
        "href": "https://pandas.pydata.org/docs/",
        "category": "Official Documentation"
      },
      {
        "label": "Matplotlib docs",
        "href": "https://matplotlib.org/stable/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Student performance data.",
      "Write an analysis note comparing NumPy and Pandas.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a python libraries notebook using Student performance data.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Python Libraries would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-collection",
    "title": "Data Collection",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "2 weeks",
    "description": "Data Collection connects APIs, Web Scraping, Data Sources into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Python Libraries"
    ],
    "topics": [
      "APIs",
      "Web Scraping",
      "Data Sources",
      "Data Acquisition"
    ],
    "skillsGained": [
      "Apply APIs in notebook and production workflows",
      "Use Web Scraping to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Collection fits into the data science lifecycle",
      "Complete a dataset challenge using APIs",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Requests docs",
        "href": "https://requests.readthedocs.io/",
        "category": "Official Documentation"
      },
      {
        "label": "Beautiful Soup docs",
        "href": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/",
        "category": "Official Documentation"
      },
      {
        "label": "Public APIs",
        "href": "https://github.com/public-apis/public-apis",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the House prices.",
      "Write an analysis note comparing APIs and Web Scraping.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data collection notebook using House prices.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Collection would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-cleaning",
    "title": "Data Cleaning",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Data Cleaning connects Missing Values, Outliers, Data Validation into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Collection"
    ],
    "topics": [
      "Missing Values",
      "Outliers",
      "Data Validation",
      "Data Transformation"
    ],
    "skillsGained": [
      "Apply Missing Values in notebook and production workflows",
      "Use Outliers to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Cleaning fits into the data science lifecycle",
      "Complete a dataset challenge using Missing Values",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Pandas missing data",
        "href": "https://pandas.pydata.org/docs/user_guide/missing_data.html",
        "category": "Official Documentation"
      },
      {
        "label": "Great Expectations",
        "href": "https://docs.greatexpectations.io/",
        "category": "Official Documentation"
      },
      {
        "label": "Kaggle cleaning data",
        "href": "https://www.kaggle.com/learn/data-cleaning",
        "category": "Kaggle Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Customer churn.",
      "Write an analysis note comparing Missing Values and Outliers.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data cleaning notebook using Customer churn.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Cleaning would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "exploratory-data-analysis-eda",
    "title": "Exploratory Data Analysis (EDA)",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Exploratory Data Analysis (EDA) connects Data Visualization, Pattern Discovery, Correlation Analysis into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Cleaning"
    ],
    "topics": [
      "Data Visualization",
      "Pattern Discovery",
      "Correlation Analysis",
      "Feature Understanding"
    ],
    "skillsGained": [
      "Apply Data Visualization in notebook and production workflows",
      "Use Pattern Discovery to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Exploratory Data Analysis (EDA) fits into the data science lifecycle",
      "Complete a dataset challenge using Data Visualization",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Kaggle EDA notebooks",
        "href": "https://www.kaggle.com/code",
        "category": "Kaggle Resources"
      },
      {
        "label": "Pandas plotting",
        "href": "https://pandas.pydata.org/docs/user_guide/visualization.html",
        "category": "Official Documentation"
      },
      {
        "label": "Observable notebooks",
        "href": "https://observablehq.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the MovieLens.",
      "Write an analysis note comparing Data Visualization and Pattern Discovery.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a exploratory data analysis (eda) notebook using MovieLens.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Exploratory Data Analysis (EDA) would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "sql-for-data-science",
    "title": "SQL for Data Science",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "SQL for Data Science connects Queries, Joins, Aggregations into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Exploratory Data Analysis (EDA)"
    ],
    "topics": [
      "Queries",
      "Joins",
      "Aggregations",
      "Window Functions",
      "Query Optimization"
    ],
    "skillsGained": [
      "Apply Queries in notebook and production workflows",
      "Use Joins to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how SQL for Data Science fits into the data science lifecycle",
      "Complete a dataset challenge using Queries",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "PostgreSQL docs",
        "href": "https://www.postgresql.org/docs/",
        "category": "Official Documentation"
      },
      {
        "label": "SQLBolt",
        "href": "https://sqlbolt.com/",
        "category": "Courses"
      },
      {
        "label": "Mode SQL tutorial",
        "href": "https://mode.com/sql-tutorial/",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Retail sales.",
      "Write an analysis note comparing Queries and Joins.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a sql for data science notebook using Retail sales.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in SQL for Data Science would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "feature-engineering",
    "title": "Feature Engineering",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Feature Engineering connects Encoding, Scaling, Feature Selection into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "SQL for Data Science"
    ],
    "topics": [
      "Encoding",
      "Scaling",
      "Feature Selection",
      "Dimensionality Reduction"
    ],
    "skillsGained": [
      "Apply Encoding in notebook and production workflows",
      "Use Scaling to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Feature Engineering fits into the data science lifecycle",
      "Complete a dataset challenge using Encoding",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "scikit-learn preprocessing",
        "href": "https://scikit-learn.org/stable/modules/preprocessing.html",
        "category": "Official Documentation"
      },
      {
        "label": "Feature-engine docs",
        "href": "https://feature-engine.trainindata.com/en/latest/",
        "category": "Official Documentation"
      },
      {
        "label": "Kaggle feature engineering",
        "href": "https://www.kaggle.com/learn/feature-engineering",
        "category": "Kaggle Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the House prices.",
      "Write an analysis note comparing Encoding and Scaling.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a feature engineering notebook using House prices.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Feature Engineering would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "machine-learning-fundamentals",
    "title": "Machine Learning Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Machine Learning Fundamentals connects Supervised Learning, Unsupervised Learning, Reinforcement Learning into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Feature Engineering"
    ],
    "topics": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning"
    ],
    "skillsGained": [
      "Apply Supervised Learning in notebook and production workflows",
      "Use Unsupervised Learning to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Machine Learning Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using Supervised Learning",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "scikit-learn user guide",
        "href": "https://scikit-learn.org/stable/user_guide.html",
        "category": "Official Documentation"
      },
      {
        "label": "Google ML Crash Course",
        "href": "https://developers.google.com/machine-learning/crash-course",
        "category": "Courses"
      },
      {
        "label": "Coursera ML specialization",
        "href": "https://www.coursera.org/specializations/machine-learning-introduction",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Customer churn.",
      "Write an analysis note comparing Supervised Learning and Unsupervised Learning.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a machine learning fundamentals notebook using Customer churn.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Machine Learning Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "machine-learning-algorithms",
    "title": "Machine Learning Algorithms",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Machine Learning Algorithms connects Linear Regression, Logistic Regression, Decision Trees into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Machine Learning Fundamentals"
    ],
    "topics": [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "KNN",
      "SVM",
      "Clustering"
    ],
    "skillsGained": [
      "Apply Linear Regression in notebook and production workflows",
      "Use Logistic Regression to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Machine Learning Algorithms fits into the data science lifecycle",
      "Complete a dataset challenge using Linear Regression",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "scikit-learn algorithms",
        "href": "https://scikit-learn.org/stable/supervised_learning.html",
        "category": "Official Documentation"
      },
      {
        "label": "StatQuest ML",
        "href": "https://statquest.org/",
        "category": "Courses"
      },
      {
        "label": "Kaggle ML",
        "href": "https://www.kaggle.com/learn/intro-to-machine-learning",
        "category": "Kaggle Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the MovieLens.",
      "Write an analysis note comparing Linear Regression and Logistic Regression.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a machine learning algorithms notebook using MovieLens.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Machine Learning Algorithms would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "model-evaluation",
    "title": "Model Evaluation",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Model Evaluation connects Accuracy, Precision, Recall into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Machine Learning Algorithms"
    ],
    "topics": [
      "Accuracy",
      "Precision",
      "Recall",
      "F1 Score",
      "ROC-AUC",
      "Cross Validation"
    ],
    "skillsGained": [
      "Apply Accuracy in notebook and production workflows",
      "Use Precision to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Model Evaluation fits into the data science lifecycle",
      "Complete a dataset challenge using Accuracy",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "scikit-learn model evaluation",
        "href": "https://scikit-learn.org/stable/modules/model_evaluation.html",
        "category": "Official Documentation"
      },
      {
        "label": "Google fairness indicators",
        "href": "https://www.tensorflow.org/tfx/guide/fairness_indicators",
        "category": "Official Documentation"
      },
      {
        "label": "Kaggle competitions",
        "href": "https://www.kaggle.com/competitions",
        "category": "Kaggle Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Retail sales.",
      "Write an analysis note comparing Accuracy and Precision.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a model evaluation notebook using Retail sales.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Model Evaluation would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-visualization",
    "title": "Data Visualization",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Data Visualization connects Matplotlib, Seaborn, Plotly into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Model Evaluation"
    ],
    "topics": [
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Tableau",
      "Power BI"
    ],
    "skillsGained": [
      "Apply Matplotlib in notebook and production workflows",
      "Use Seaborn to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Visualization fits into the data science lifecycle",
      "Complete a dataset challenge using Matplotlib",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Plotly docs",
        "href": "https://plotly.com/python/",
        "category": "Official Documentation"
      },
      {
        "label": "Tableau training",
        "href": "https://www.tableau.com/learn/training",
        "category": "Courses"
      },
      {
        "label": "Power BI learning",
        "href": "https://learn.microsoft.com/en-us/training/powerplatform/power-bi",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the House prices.",
      "Write an analysis note comparing Matplotlib and Seaborn.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data visualization notebook using House prices.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Visualization would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "deep-learning-fundamentals",
    "title": "Deep Learning Fundamentals",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Deep Learning Fundamentals connects Neural Networks, Backpropagation, Activation Functions into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Visualization"
    ],
    "topics": [
      "Neural Networks",
      "Backpropagation",
      "Activation Functions",
      "Optimization"
    ],
    "skillsGained": [
      "Apply Neural Networks in notebook and production workflows",
      "Use Backpropagation to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Deep Learning Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using Neural Networks",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Deep Learning book",
        "href": "https://www.deeplearningbook.org/",
        "category": "Research Papers"
      },
      {
        "label": "Neural Networks and Deep Learning",
        "href": "http://neuralnetworksanddeeplearning.com/",
        "category": "Courses"
      },
      {
        "label": "fast.ai",
        "href": "https://course.fast.ai/",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the CIFAR-10.",
      "Write an analysis note comparing Neural Networks and Backpropagation.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a deep learning fundamentals notebook using CIFAR-10.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Deep Learning Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "deep-learning-frameworks",
    "title": "Deep Learning Frameworks",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Deep Learning Frameworks connects TensorFlow, Keras, PyTorch into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Deep Learning Fundamentals"
    ],
    "topics": [
      "TensorFlow",
      "Keras",
      "PyTorch"
    ],
    "skillsGained": [
      "Apply TensorFlow in notebook and production workflows",
      "Use Keras to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Deep Learning Frameworks fits into the data science lifecycle",
      "Complete a dataset challenge using TensorFlow",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "PyTorch docs",
        "href": "https://pytorch.org/docs/stable/index.html",
        "category": "Official Documentation"
      },
      {
        "label": "TensorFlow docs",
        "href": "https://www.tensorflow.org/learn",
        "category": "Official Documentation"
      },
      {
        "label": "Keras docs",
        "href": "https://keras.io/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the COCO sample.",
      "Write an analysis note comparing TensorFlow and Keras.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a deep learning frameworks notebook using COCO sample.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Deep Learning Frameworks would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "computer-vision",
    "title": "Computer Vision",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Computer Vision connects CNNs, Object Detection, Image Classification into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Deep Learning Frameworks"
    ],
    "topics": [
      "CNNs",
      "Object Detection",
      "Image Classification",
      "OpenCV"
    ],
    "skillsGained": [
      "Apply CNNs in notebook and production workflows",
      "Use Object Detection to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Computer Vision fits into the data science lifecycle",
      "Complete a dataset challenge using CNNs",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "OpenCV docs",
        "href": "https://docs.opencv.org/",
        "category": "Official Documentation"
      },
      {
        "label": "PyTorch vision",
        "href": "https://pytorch.org/vision/stable/index.html",
        "category": "Official Documentation"
      },
      {
        "label": "Papers with Code CV",
        "href": "https://paperswithcode.com/area/computer-vision",
        "category": "Research Papers"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the IMDB reviews.",
      "Write an analysis note comparing CNNs and Object Detection.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a computer vision notebook using IMDB reviews.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Computer Vision would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "natural-language-processing",
    "title": "Natural Language Processing",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Natural Language Processing connects Text Processing, Tokenization, Embeddings into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Computer Vision"
    ],
    "topics": [
      "Text Processing",
      "Tokenization",
      "Embeddings",
      "Transformers"
    ],
    "skillsGained": [
      "Apply Text Processing in notebook and production workflows",
      "Use Tokenization to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Natural Language Processing fits into the data science lifecycle",
      "Complete a dataset challenge using Text Processing",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Hugging Face course",
        "href": "https://huggingface.co/learn/nlp-course",
        "category": "Courses"
      },
      {
        "label": "spaCy docs",
        "href": "https://spacy.io/usage",
        "category": "Official Documentation"
      },
      {
        "label": "Papers with Code NLP",
        "href": "https://paperswithcode.com/area/natural-language-processing",
        "category": "Research Papers"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the OpenAI eval-style prompts.",
      "Write an analysis note comparing Text Processing and Tokenization.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a natural language processing notebook using OpenAI eval-style prompts.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Natural Language Processing would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "generative-ai",
    "title": "Generative AI",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Generative AI connects LLM Fundamentals, Prompt Engineering, RAG into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Natural Language Processing"
    ],
    "topics": [
      "LLM Fundamentals",
      "Prompt Engineering",
      "RAG",
      "Fine-Tuning",
      "AI Agents"
    ],
    "skillsGained": [
      "Apply LLM Fundamentals in notebook and production workflows",
      "Use Prompt Engineering to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Generative AI fits into the data science lifecycle",
      "Complete a dataset challenge using LLM Fundamentals",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "OpenAI docs",
        "href": "https://platform.openai.com/docs",
        "category": "Official Documentation"
      },
      {
        "label": "LangChain docs",
        "href": "https://python.langchain.com/docs/",
        "category": "Official Documentation"
      },
      {
        "label": "Hugging Face transformers",
        "href": "https://huggingface.co/docs/transformers/index",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the CIFAR-10.",
      "Write an analysis note comparing LLM Fundamentals and Prompt Engineering.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a generative ai notebook using CIFAR-10.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Generative AI would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "big-data",
    "title": "Big Data",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Big Data connects Hadoop, Spark, Distributed Computing into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Generative AI"
    ],
    "topics": [
      "Hadoop",
      "Spark",
      "Distributed Computing"
    ],
    "skillsGained": [
      "Apply Hadoop in notebook and production workflows",
      "Use Spark to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Big Data fits into the data science lifecycle",
      "Complete a dataset challenge using Hadoop",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Apache Spark docs",
        "href": "https://spark.apache.org/docs/latest/",
        "category": "Official Documentation"
      },
      {
        "label": "Databricks learning",
        "href": "https://www.databricks.com/learn",
        "category": "Courses"
      },
      {
        "label": "Hadoop docs",
        "href": "https://hadoop.apache.org/docs/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the COCO sample.",
      "Write an analysis note comparing Hadoop and Spark.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a big data notebook using COCO sample.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Big Data would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "mlops-fundamentals",
    "title": "MLOps Fundamentals",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "MLOps Fundamentals connects Model Deployment, Model Monitoring, Experiment Tracking into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Big Data"
    ],
    "topics": [
      "Model Deployment",
      "Model Monitoring",
      "Experiment Tracking"
    ],
    "skillsGained": [
      "Apply Model Deployment in notebook and production workflows",
      "Use Model Monitoring to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how MLOps Fundamentals fits into the data science lifecycle",
      "Complete a dataset challenge using Model Deployment",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "MLflow docs",
        "href": "https://mlflow.org/docs/latest/index.html",
        "category": "Official Documentation"
      },
      {
        "label": "Weights & Biases docs",
        "href": "https://docs.wandb.ai/",
        "category": "Official Documentation"
      },
      {
        "label": "Google MLOps guide",
        "href": "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the IMDB reviews.",
      "Write an analysis note comparing Model Deployment and Model Monitoring.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a mlops fundamentals notebook using IMDB reviews.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in MLOps Fundamentals would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "cloud-for-data-science",
    "title": "Cloud for Data Science",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Cloud for Data Science connects AWS, Azure, Google Cloud into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "MLOps Fundamentals"
    ],
    "topics": [
      "AWS",
      "Azure",
      "Google Cloud"
    ],
    "skillsGained": [
      "Apply AWS in notebook and production workflows",
      "Use Azure to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Cloud for Data Science fits into the data science lifecycle",
      "Complete a dataset challenge using AWS",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "AWS ML docs",
        "href": "https://docs.aws.amazon.com/machine-learning/",
        "category": "Official Documentation"
      },
      {
        "label": "Azure ML docs",
        "href": "https://learn.microsoft.com/en-us/azure/machine-learning/",
        "category": "Official Documentation"
      },
      {
        "label": "Google Vertex AI docs",
        "href": "https://cloud.google.com/vertex-ai/docs",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the OpenAI eval-style prompts.",
      "Write an analysis note comparing AWS and Azure.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a cloud for data science notebook using OpenAI eval-style prompts.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Cloud for Data Science would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-engineering-basics",
    "title": "Data Engineering Basics",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Data Engineering Basics connects ETL, Data Pipelines, Data Warehouses into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Cloud for Data Science"
    ],
    "topics": [
      "ETL",
      "Data Pipelines",
      "Data Warehouses"
    ],
    "skillsGained": [
      "Apply ETL in notebook and production workflows",
      "Use Data Pipelines to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Engineering Basics fits into the data science lifecycle",
      "Complete a dataset challenge using ETL",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "dbt docs",
        "href": "https://docs.getdbt.com/docs/introduction",
        "category": "Official Documentation"
      },
      {
        "label": "Airflow docs",
        "href": "https://airflow.apache.org/docs/",
        "category": "Official Documentation"
      },
      {
        "label": "Snowflake docs",
        "href": "https://docs.snowflake.com/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the CIFAR-10.",
      "Write an analysis note comparing ETL and Data Pipelines.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data engineering basics notebook using CIFAR-10.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Engineering Basics would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "advanced-machine-learning",
    "title": "Advanced Machine Learning",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Machine Learning connects XGBoost, LightGBM, CatBoost into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Engineering Basics"
    ],
    "topics": [
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "Ensemble Learning"
    ],
    "skillsGained": [
      "Apply XGBoost in notebook and production workflows",
      "Use LightGBM to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Advanced Machine Learning fits into the data science lifecycle",
      "Complete a dataset challenge using XGBoost",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "XGBoost docs",
        "href": "https://xgboost.readthedocs.io/",
        "category": "Official Documentation"
      },
      {
        "label": "LightGBM docs",
        "href": "https://lightgbm.readthedocs.io/",
        "category": "Official Documentation"
      },
      {
        "label": "CatBoost docs",
        "href": "https://catboost.ai/docs/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the MIMIC sample data.",
      "Write an analysis note comparing XGBoost and LightGBM.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a advanced machine learning notebook using MIMIC sample data.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Advanced Machine Learning would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "advanced-deep-learning",
    "title": "Advanced Deep Learning",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Deep Learning connects Transformers, Attention Mechanisms, Diffusion Models into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Advanced Machine Learning"
    ],
    "topics": [
      "Transformers",
      "Attention Mechanisms",
      "Diffusion Models"
    ],
    "skillsGained": [
      "Apply Transformers in notebook and production workflows",
      "Use Attention Mechanisms to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Advanced Deep Learning fits into the data science lifecycle",
      "Complete a dataset challenge using Transformers",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Attention Is All You Need",
        "href": "https://arxiv.org/abs/1706.03762",
        "category": "Research Papers"
      },
      {
        "label": "Diffusion models paper",
        "href": "https://arxiv.org/abs/2006.11239",
        "category": "Research Papers"
      },
      {
        "label": "Papers with Code DL",
        "href": "https://paperswithcode.com/area/deep-learning",
        "category": "Research Papers"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Large recommender logs.",
      "Write an analysis note comparing Transformers and Attention Mechanisms.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a advanced deep learning notebook using Large recommender logs.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Advanced Deep Learning would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "production-ai-systems",
    "title": "Production AI Systems",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Production AI Systems connects Model Serving, Scalable Inference, AI Infrastructure into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Advanced Deep Learning"
    ],
    "topics": [
      "Model Serving",
      "Scalable Inference",
      "AI Infrastructure"
    ],
    "skillsGained": [
      "Apply Model Serving in notebook and production workflows",
      "Use Scalable Inference to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Production AI Systems fits into the data science lifecycle",
      "Complete a dataset challenge using Model Serving",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "BentoML docs",
        "href": "https://docs.bentoml.com/",
        "category": "Official Documentation"
      },
      {
        "label": "KServe docs",
        "href": "https://kserve.github.io/website/",
        "category": "Official Documentation"
      },
      {
        "label": "NVIDIA Triton docs",
        "href": "https://docs.nvidia.com/deeplearning/triton-inference-server/",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the ArXiv abstracts.",
      "Write an analysis note comparing Model Serving and Scalable Inference.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a production ai systems notebook using ArXiv abstracts.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Production AI Systems would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "research-and-experimentation",
    "title": "Research & Experimentation",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Research & Experimentation connects Reading Research Papers, Scientific Method, Reproducibility into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Production AI Systems"
    ],
    "topics": [
      "Reading Research Papers",
      "Scientific Method",
      "Reproducibility"
    ],
    "skillsGained": [
      "Apply Reading Research Papers in notebook and production workflows",
      "Use Scientific Method to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Research & Experimentation fits into the data science lifecycle",
      "Complete a dataset challenge using Reading Research Papers",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Papers with Code",
        "href": "https://paperswithcode.com/",
        "category": "Research Papers"
      },
      {
        "label": "arXiv",
        "href": "https://arxiv.org/",
        "category": "Research Papers"
      },
      {
        "label": "Reproducibility checklist",
        "href": "https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf",
        "category": "Research Papers"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Synthetic multi-tenant ML telemetry.",
      "Write an analysis note comparing Reading Research Papers and Scientific Method.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a research & experimentation notebook using Synthetic multi-tenant ML telemetry.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Research & Experimentation would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "ai-system-design",
    "title": "AI System Design",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "AI System Design connects Large-Scale ML Systems, Recommendation Systems, Search Systems into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Research & Experimentation"
    ],
    "topics": [
      "Large-Scale ML Systems",
      "Recommendation Systems",
      "Search Systems"
    ],
    "skillsGained": [
      "Apply Large-Scale ML Systems in notebook and production workflows",
      "Use Recommendation Systems to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how AI System Design fits into the data science lifecycle",
      "Complete a dataset challenge using Large-Scale ML Systems",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Google ML systems design",
        "href": "https://developers.google.com/machine-learning/guides/rules-of-ml",
        "category": "Official Documentation"
      },
      {
        "label": "Chip Huyen ML systems",
        "href": "https://huyenchip.com/machine-learning-systems-design/toc.html",
        "category": "Courses"
      },
      {
        "label": "System Design Primer",
        "href": "https://github.com/donnemartin/system-design-primer",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the MIMIC sample data.",
      "Write an analysis note comparing Large-Scale ML Systems and Recommendation Systems.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a ai system design notebook using MIMIC sample data.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in AI System Design would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "data-governance",
    "title": "Data Governance",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "3 weeks",
    "description": "Data Governance connects Privacy, Compliance, Ethical AI into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "AI System Design"
    ],
    "topics": [
      "Privacy",
      "Compliance",
      "Ethical AI",
      "Responsible AI"
    ],
    "skillsGained": [
      "Apply Privacy in notebook and production workflows",
      "Use Compliance to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Data Governance fits into the data science lifecycle",
      "Complete a dataset challenge using Privacy",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "NIST AI RMF",
        "href": "https://www.nist.gov/itl/ai-risk-management-framework",
        "category": "Official Documentation"
      },
      {
        "label": "Responsible AI practices",
        "href": "https://ai.google/responsibility/responsible-ai-practices/",
        "category": "Official Documentation"
      },
      {
        "label": "Microsoft Responsible AI",
        "href": "https://www.microsoft.com/ai/responsible-ai",
        "category": "Official Documentation"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the Large recommender logs.",
      "Write an analysis note comparing Privacy and Compliance.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a data governance notebook using Large recommender logs.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Data Governance would most likely mislead stakeholders, and how would you validate it?"
  },
  {
    "id": "leadership-and-communication",
    "title": "Leadership & Communication",
    "stage": "Expert",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Leadership & Communication connects Storytelling with Data, Stakeholder Communication, Business Impact Analysis into practical data science skill for analytical and AI-driven products.",
    "prerequisites": [
      "Data Governance"
    ],
    "topics": [
      "Storytelling with Data",
      "Stakeholder Communication",
      "Business Impact Analysis"
    ],
    "skillsGained": [
      "Apply Storytelling with Data in notebook and production workflows",
      "Use Stakeholder Communication to make data-driven decisions",
      "Communicate uncertainty, tradeoffs, and model behavior",
      "Build portfolio-ready analytical proof of skill"
    ],
    "learningOutcomes": [
      "Explain how Leadership & Communication fits into the data science lifecycle",
      "Complete a dataset challenge using Storytelling with Data",
      "Evaluate risks, assumptions, and next experiments"
    ],
    "resources": [
      {
        "label": "Storytelling with Data",
        "href": "https://www.storytellingwithdata.com/",
        "category": "Courses"
      },
      {
        "label": "Google data analytics",
        "href": "https://grow.google/certificates/data-analytics/",
        "category": "Certification Resources"
      },
      {
        "label": "Data-to-decisions guide",
        "href": "https://www.tableau.com/learn/articles/data-storytelling",
        "category": "Courses"
      }
    ],
    "practiceExercises": [
      "Run an interactive notebook using the ArXiv abstracts.",
      "Write an analysis note comparing Storytelling with Data and Stakeholder Communication.",
      "Create a reproducible experiment or dashboard for this topic."
    ],
    "miniProject": "Build a leadership & communication notebook using ArXiv abstracts.",
    "realWorldApplications": [
      "Business analytics",
      "Model development",
      "Research and experimentation"
    ],
    "quiz": "What assumption in Leadership & Communication would most likely mislead stakeholders, and how would you validate it?"
  }
];

const projectTracks: ProjectTrack[] = [
  {
    "stage": "Beginner",
    "projects": [
      "Data Cleaning Project",
      "Sales Analysis Dashboard",
      "COVID Data Analysis",
      "Student Performance Analysis"
    ]
  },
  {
    "stage": "Intermediate",
    "projects": [
      "House Price Prediction",
      "Customer Churn Prediction",
      "Recommendation System",
      "Sentiment Analysis"
    ]
  },
  {
    "stage": "Advanced",
    "projects": [
      "Image Classification System",
      "Object Detection Model",
      "Chatbot using NLP",
      "AI-Powered Analytics Platform"
    ]
  },
  {
    "stage": "Expert",
    "projects": [
      "Production ML Platform",
      "RAG-Based AI Assistant",
      "Recommendation Engine at Scale",
      "End-to-End MLOps Pipeline"
    ]
  }
];

const missingTopics = [
  "Causal inference",
  "A/B testing and experimentation",
  "Time series forecasting",
  "Bayesian statistics",
  "Data contracts",
  "Vector databases",
  "Feature stores",
  "Model cards",
  "Model interpretability",
  "Fairness audits",
  "Privacy-preserving ML",
  "Synthetic data generation"
];

const careerPaths = [
  {
    "title": "Data Analyst",
    "focus": "Turn messy datasets into clear dashboards, insights, SQL reports, and stakeholder-ready narratives.",
    "milestones": [
      "EDA portfolio",
      "BI dashboard",
      "SQL case study"
    ]
  },
  {
    "title": "Data Scientist",
    "focus": "Own analysis, modeling, evaluation, experimentation, and business impact from idea to recommendation.",
    "milestones": [
      "Prediction model",
      "Experiment design",
      "Impact memo"
    ]
  },
  {
    "title": "Machine Learning Engineer",
    "focus": "Productionize features, training pipelines, model serving, monitoring, and scalable inference.",
    "milestones": [
      "Model API",
      "Feature pipeline",
      "Monitoring dashboard"
    ]
  },
  {
    "title": "AI Engineer",
    "focus": "Build LLM, RAG, agentic, and generative AI systems with evaluation and guardrails.",
    "milestones": [
      "RAG assistant",
      "Prompt evals",
      "Agent workflow"
    ]
  },
  {
    "title": "Research Scientist",
    "focus": "Read papers, design reproducible experiments, test novel methods, and communicate evidence.",
    "milestones": [
      "Paper replication",
      "Ablation study",
      "Research report"
    ]
  },
  {
    "title": "Analytics Engineer",
    "focus": "Bridge data engineering and analytics with dbt models, metrics layers, and trusted datasets.",
    "milestones": [
      "dbt project",
      "Data mart",
      "Metrics layer"
    ]
  }
];

const certificationPaths = [
  {
    "title": "Google Data Analytics",
    "focus": "Analytics lifecycle, cleaning, visualization, SQL, dashboards, and stakeholder communication.",
    "milestones": [
      "Case study",
      "SQL portfolio",
      "Dashboard project"
    ]
  },
  {
    "title": "IBM Data Science",
    "focus": "Python, notebooks, statistics, machine learning, and applied capstone projects.",
    "milestones": [
      "Notebook workflow",
      "ML capstone",
      "Model report"
    ]
  },
  {
    "title": "Microsoft Data Scientist",
    "focus": "Azure ML, data preparation, model training, deployment, and responsible AI workflows.",
    "milestones": [
      "Azure ML workspace",
      "Experiment tracking",
      "Deployment lab"
    ]
  },
  {
    "title": "AWS Machine Learning Engineer",
    "focus": "AWS ML services, feature workflows, training jobs, model deployment, and monitoring.",
    "milestones": [
      "SageMaker lab",
      "Model endpoint",
      "Monitoring setup"
    ]
  },
  {
    "title": "TensorFlow Developer Certificate",
    "focus": "TensorFlow modeling, computer vision, NLP, time series, and deployment basics.",
    "milestones": [
      "TF models",
      "CV/NLP practice",
      "Exam prep notebooks"
    ]
  }
];

const achievementBadges = [
  "Data Wrangler",
  "Statistics Sentinel",
  "Python Analyst",
  "ML Builder",
  "Deep Learning Adept",
  "AI Systems Designer",
  "Research Replicator",
  "Insight Leader"
];

const progressSchema = [
  [
    "users",
    "id, name, email, role, created_at"
  ],
  [
    "data_science_progress",
    "user_id, roadmap_id, completed_node_ids, xp, streak_days, readiness_scores"
  ],
  [
    "notebook_runs",
    "user_id, topic_id, dataset_name, status, score, completed_at"
  ],
  [
    "experiment_logs",
    "user_id, experiment_id, metrics_json, model_version, notes"
  ],
  [
    "certification_tracking",
    "user_id, certification_id, target_date, status, score"
  ],
  [
    "research_notes",
    "user_id, paper_id, summary, replication_status, updated_at"
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

const resourceCategories: ResourceCategory[] = ["Official Documentation", "Research Papers", "Kaggle Resources", "Courses", "Community Resources", "Certification Resources"];

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
                  <h3 className="text-sm font-black text-white">Dataset Challenge</h3>
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

export default function DataScientistRoadmap() {
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
  const mlTopicIds = roadmapNodes.filter((node) => ["Feature Engineering", "Machine Learning Fundamentals", "Machine Learning Algorithms", "Model Evaluation", "Advanced Machine Learning"].includes(node.title)).map((node) => node.id);
  const aiTopicIds = roadmapNodes.filter((node) => ["Deep Learning Fundamentals", "Deep Learning Frameworks", "Natural Language Processing", "Generative AI", "Production AI Systems", "AI System Design"].includes(node.title)).map((node) => node.id);
  const statisticsTopicIds = roadmapNodes.filter((node) => ["Mathematics for Data Science", "Statistics Fundamentals", "Model Evaluation", "Research & Experimentation"].includes(node.title)).map((node) => node.id);
  const mlReadiness = Math.round((mlTopicIds.filter((id) => completedIds.has(id)).length / mlTopicIds.length) * 100);
  const aiReadiness = Math.round((aiTopicIds.filter((id) => completedIds.has(id)).length / aiTopicIds.length) * 100);
  const statisticsMastery = Math.round((statisticsTopicIds.filter((id) => completedIds.has(id)).length / statisticsTopicIds.length) * 100);

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
            <span className="font-bold text-zinc-300">Data Scientist</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="server" />
                  Production AI & Analytics Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Data Scientist Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete project-based data science journey across math, statistics, Python, analytics, machine learning, deep learning, MLOps, big data, generative AI, and research.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["32", "Roadmap nodes", "layers"],
                    ["82-112 weeks", "Total duration", "clock"],
                    ["145+", "Data skills", "badge"],
                    ["16", "Portfolio projects", "target"],
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
                <p className="text-sm font-black text-white">Data Science Architecture</p>
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
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every phase ends with practical projects that combine datasets, notebooks, dashboards, models, experiments, deployment, and stakeholder communication.</p>
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
                <h2 className="text-2xl font-black text-white">Vertical Data Science Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Expand each node for prerequisites, learning outcomes, resources, dataset challenges, research tasks, real-world applications, quizzes, bookmarks, and notes.
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
            <h2 className="text-2xl font-black text-white">Data Science Resource Matrix</h2>
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
            <h2 className="text-2xl font-black text-white">Data Science Specialization Paths</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              The roadmap supports analytics, data science, machine learning engineering, AI engineering, research, and analytics engineering without splitting fundamentals too early.
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
            <h2 className="text-2xl font-black text-white">Data Science Certifications Tracker</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Map roadmap progress to practical data, ML, cloud AI, and TensorFlow certification goals without turning the page into a memorization checklist.
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
              <h2 className="text-2xl font-black text-white">Gamification & Research Learning Tools</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["XP System", "Award XP for completed topics, notebooks, dataset challenges, research replications, certification milestones, and streaks."],
                  ["Achievement Badges", "Unlock visible badges for statistics, Python, EDA, ML, deep learning, GenAI, MLOps, and research mastery."],
                  ["Milestones", "Mark phase completions with certification-ready checkpoints and portfolio notebook prompts."],
                  ["Learning Challenges", "Add weekly notebook labs, Kaggle-style challenges, research tasks, and model deployment missions."],
                  ["Interactive Quizzes", "Attach quiz prompts, dataset tasks, case studies, and research checks to each topic."],
                  ["Progress Sync", "Store notes, bookmarks, XP, completions, notebook results, experiment logs, and certification progress per user account."],
                ].map(([title, detail]) => (
                  <article className="rounded-md border border-zinc-800 bg-[#050505] p-4" key={title}>
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-black text-white">Data Science Progress Database Schema</h2>
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
                ["Component hierarchy", "DataScientistRoadmap -> SidebarPanel -> ProgressRing -> RoadmapNodeCard -> career paths, gamification, resources, notes, quiz, project sections."],
                ["Folder architecture", "Future extraction: src/features/roadmaps/data-scientist/data.ts, components/RoadmapNodeCard.tsx, components/ProgressDashboard.tsx, components/SpecializationPathPanel.tsx, components/GamificationPanel.tsx."],
                ["TypeScript interfaces", "Stage, Difficulty, ResourceCategory, Resource, RoadmapNode, StageSummary, ProjectTrack, SpecializationPath, CertificationPath, AIBadge, ProgressSchema."],
                ["Tailwind structure", "Black base surface, zinc borders, red accent states, compact 13px root scale, analytics dashboard grids, sticky readiness panel, accessible focus and pressed states."],
                ["Framer Motion plan", "Use motion only for node expansion, dependency graph pulse states, readiness score transitions, and badge unlocks with reduced-motion fallbacks once the dependency is installed."],
                ["shadcn/ui plan", "Extract buttons, cards, progress, tabs, textareas, badges, accordions, notebook cards, and command navigation into shadcn-style primitives when the component library is added."],
                ["Feature specifications", "Completion tracking, bookmarks, notebook notes, dataset challenge runs, research tasks, quizzes, XP, certification tracker, progress sync, recommended next step."],
                ["UX improvements", "Vertical data science progression, skill dependency graph, low-glow premium surfaces, specialization lanes, readiness widgets, mobile-first single-column behavior."],
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

          <SidebarPanel title="Data Science Progress">
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

          <SidebarPanel title="Data Science Readiness">
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                [`${mlReadiness}%`, "ML readiness", "server"],
                [`${aiReadiness}%`, "AI readiness", "layers"],
                [`${statisticsMastery}%`, "statistics mastery", "shield"],
                ["82-112w", "estimated time", "clock"],
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

          <SidebarPanel title="Missing Data Science Topics Added">
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
