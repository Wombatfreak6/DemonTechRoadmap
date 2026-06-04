"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type ThemeVars = CSSProperties & Record<`--${string}`, string>;
type Topic = {
  id: string;
  title: string;
  href?: string;
  icon: string;
  level: "Foundation" | "Core" | "Framework" | "Professional";
  summary: string;
  subtopics: string[];
  goals: string[];
  practice: string;
  resources: number;
};

const navItems = ["Roadmaps", "Resources", "Guides", "Docs", "Community"];

const topics: Topic[] = [
  {
    id: "html5",
    title: "HTML5",
    href: "/roadmaps/html5",
    icon: "HTML",
    level: "Foundation",
    summary: "Learn the structure of every website with semantic, accessible HTML.",
    subtopics: ["Elements", "Forms", "Semantic HTML", "Accessibility", "SEO"],
    goals: [
      "Build valid document structure with headings, sections, forms, links, images, and tables.",
      "Use semantic elements so pages are easier for browsers, search engines, and assistive tech.",
      "Create accessible forms and content before styling or scripting.",
    ],
    practice: "Build a portfolio homepage, resume page, and contact form using only semantic HTML.",
    resources: 15,
  },
  {
    id: "css3",
    title: "CSS3",
    href: "/roadmaps/css",
    icon: "CSS",
    level: "Foundation",
    summary: "Style web pages with selectors, box model, layout, typography, responsive design, and animation.",
    subtopics: ["Selectors", "Box Model", "Flexbox", "Grid", "Responsive", "Animations"],
    goals: [
      "Understand cascade, specificity, inheritance, and the box model.",
      "Build responsive layouts with Flexbox, Grid, media queries, and modern units.",
      "Create polished visual systems with typography, color, spacing, and motion.",
    ],
    practice: "Recreate a responsive landing page from a design screenshot using only HTML and CSS.",
    resources: 12,
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    href: "/roadmaps/tailwind",
    icon: "TW",
    level: "Core",
    summary: "Build modern responsive UI quickly with utility-first CSS and reusable components.",
    subtopics: ["Utilities", "Responsive", "Variants", "Components", "Theming"],
    goals: [
      "Use utility classes for spacing, typography, layout, color, states, and responsiveness.",
      "Extract repeated utility groups into reusable components.",
      "Customize Tailwind around a product design system.",
    ],
    practice: "Build a pricing page, dashboard shell, and responsive navbar using Tailwind components.",
    resources: 11,
  },
  {
    id: "sass",
    title: "Sass / SCSS",
    href: "/roadmaps/sass",
    icon: "SCSS",
    level: "Core",
    summary: "Write maintainable CSS with variables, modules, nesting, mixins, functions, and architecture.",
    subtopics: ["Variables", "Nesting", "Modules", "Mixins", "Functions", "7-1 Pattern"],
    goals: [
      "Organize stylesheets with partials, @use, @forward, and a clear entry point.",
      "Use mixins and functions for reusable style logic.",
      "Build scalable CSS architecture without over-nesting or global leaks.",
    ],
    practice: "Refactor a large CSS file into a Sass architecture with tokens, components, and page styles.",
    resources: 11,
  },
  {
    id: "javascript",
    title: "JavaScript",
    href: "/roadmaps/javascript",
    icon: "JS",
    level: "Core",
    summary: "Add interactivity, browser behavior, DOM updates, async logic, and application flow.",
    subtopics: ["Variables", "Functions", "DOM", "Events", "Async", "ES Features"],
    goals: [
      "Write clean JavaScript with functions, objects, arrays, modules, and control flow.",
      "Manipulate the DOM and respond to user events.",
      "Fetch data, handle async operations, and manage errors.",
    ],
    practice: "Build a todo app, quiz app, API search page, and form validator in vanilla JavaScript.",
    resources: 20,
  },
  {
    id: "typescript",
    title: "TypeScript",
    href: "/roadmaps/typescript",
    icon: "TS",
    level: "Core",
    summary: "Write safer JavaScript with types, interfaces, generics, utility types, and better refactoring.",
    subtopics: ["Types", "Interfaces", "Generics", "Utility Types", "React TS"],
    goals: [
      "Type functions, objects, API responses, components, and app state.",
      "Use generics and utility types for reusable type-safe code.",
      "Reduce runtime bugs and improve editor support across larger apps.",
    ],
    practice: "Convert a JavaScript project to TypeScript with strict mode enabled.",
    resources: 11,
  },
  {
    id: "react",
    title: "React.js",
    href: "/roadmaps/react",
    icon: "React",
    level: "Framework",
    summary: "Build component-based user interfaces with JSX, props, state, hooks, forms, and routing patterns.",
    subtopics: ["JSX", "Components", "Props", "State", "Hooks", "Forms"],
    goals: [
      "Create reusable components and compose them into screens.",
      "Manage state and side effects with hooks.",
      "Build forms, lists, reusable UI patterns, and tested components.",
    ],
    practice: "Build a course dashboard with filters, forms, reusable cards, and saved preferences.",
    resources: 19,
  },
  {
    id: "nextjs",
    title: "Next.js",
    href: "/roadmaps/nextjs",
    icon: "Next",
    level: "Framework",
    summary: "Build production React apps with routing, server components, data fetching, APIs, auth, and deployment.",
    subtopics: ["Routing", "Layouts", "Server Components", "Data Fetching", "API Routes", "Deployment"],
    goals: [
      "Use file-based routing and layouts with the App Router.",
      "Choose server/client components and rendering strategies intentionally.",
      "Ship full-stack pages with APIs, auth, caching, SEO, and production deployment.",
    ],
    practice: "Build a blog, ecommerce store, dashboard analytics app, and CMS-powered website with Next.js.",
    resources: 12,
  },
  {
    id: "state-routing",
    title: "State Management & Routing",
    icon: "Flow",
    level: "Professional",
    summary: "Handle app-wide state, URL state, protected routes, client navigation, and async server state.",
    subtopics: ["React Router", "URL Params", "Context", "Reducers", "Zustand", "TanStack Query"],
    goals: [
      "Know when local state, context, reducers, stores, or server-state tools are appropriate.",
      "Model navigation, route params, protected pages, and loading/error states.",
      "Keep state close to where it is used and avoid unnecessary global stores.",
    ],
    practice: "Build a protected dashboard with filters in the URL, cached API data, and shared UI preferences.",
    resources: 10,
  },
  {
    id: "testing-debugging",
    title: "Testing & Debugging",
    icon: "Test",
    level: "Professional",
    summary: "Verify frontend behavior with unit, component, integration, and end-to-end testing.",
    subtopics: ["Vitest", "Jest", "Testing Library", "Playwright", "Debugging", "Accessibility Tests"],
    goals: [
      "Test user-visible behavior instead of implementation details.",
      "Use browser devtools to inspect layout, performance, network, and accessibility.",
      "Write smoke tests for critical user flows before deployment.",
    ],
    practice: "Add tests for login, form validation, navigation, loading states, and responsive rendering.",
    resources: 8,
  },
  {
    id: "deployment-devops",
    title: "Deployment & Frontend DevOps",
    icon: "Ship",
    level: "Professional",
    summary: "Deploy frontend apps with environment variables, CI/CD, monitoring, performance checks, and rollback safety.",
    subtopics: ["Vercel", "Netlify", "CI/CD", "Environment Variables", "Analytics", "Monitoring"],
    goals: [
      "Run builds and checks before deploys.",
      "Manage environment variables and deployment previews safely.",
      "Monitor performance, errors, analytics, and user experience after launch.",
    ],
    practice: "Deploy a Next.js app with preview deployments, production env vars, analytics, and a rollback plan.",
    resources: 8,
  },
];

const icons: Record<string, ReactNode> = {
  home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z" />,
  search: <path d="m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  moon: <path d="M21 14.5A7.5 7.5 0 0 1 9.5 3a8.7 8.7 0 1 0 11.5 11.5Z" />,
  sun: <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.36-6.36 1.42-1.42M4.22 19.78l1.42-1.42m0-12.72L4.22 4.22m15.56 15.56-1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />,
  book: <path d="M5 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H5V4Zm10 0h4v14h-4" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  levels: <path d="M5 19V9m7 10V5m7 14v-7" />,
  discord: <path d="M8 16c1.5 1 6.5 1 8 0m-9-3h.01M17 13h.01M7 8c3-1.5 7-1.5 10 0l1 7c-1.5 1-3 1.5-4.5 1.8L12 15l-1.5 1.8C9 16.5 7.5 16 6 15l1-7Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
  spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />,
};

const darkTheme: ThemeVars = {
  "--page-bg": "#05020a",
  "--header-bg": "rgba(5, 2, 10, 0.92)",
  "--panel-bg": "rgba(12, 8, 18, 0.82)",
  "--panel-strong": "rgba(20, 12, 32, 0.95)",
  "--field-bg": "rgba(12, 8, 18, 0.88)",
  "--border": "rgba(168, 85, 247, 0.26)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#d4d4d8",
  "--text-muted": "#a1a1aa",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#fbf7ff",
  "--header-bg": "rgba(251, 247, 255, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(250, 245, 255, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(147, 51, 234, 0.24)",
  "--text-primary": "#2e1065",
  "--text-secondary": "#4c1d95",
  "--text-muted": "#71717a",
  "--shadow": "rgba(46, 16, 101, 0.08)",
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

function DemonTechLogo() {
  return (
    <Link className="flex min-w-fit items-center gap-3" href="/">
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(168,85,247,0.24)]">
        <Image
          alt="DemonTech logo"
          className="h-full w-full object-cover"
          height={56}
          src="/demontech-logo.png"
          width={56}
        />
      </div>
      <div>
        <p className="text-2xl font-black leading-6 tracking-normal text-[var(--text-primary)]">
          Demon<span className="text-purple-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function FrontendDeveloperRoadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0];

  const levelCounts = useMemo(
    () =>
      topics.reduce<Record<Topic["level"], number>>(
        (counts, topic) => ({ ...counts, [topic.level]: counts[topic.level] + 1 }),
        { Foundation: 0, Core: 0, Framework: 0, Professional: 0 },
      ),
    [],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300" style={theme}>
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(168,85,247,0.2),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(124,58,237,0.13),transparent_26%),linear-gradient(180deg,#05020a_0%,#080412_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(192,132,252,0.16),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(147,51,234,0.1),transparent_25%),linear-gradient(180deg,#fbf7ff_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center gap-8 px-5 lg:px-8">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-purple-500 ${item === "Roadmaps" ? "text-purple-500" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
                {item}
              </a>
            ))}
          </nav>
          <label className="hidden h-11 w-[280px] items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-4 text-sm text-[var(--text-muted)] xl:flex">
            <Icon className="h-5 w-5" name="search" />
            <span className="flex-1">Search anything...</span>
            <kbd className="rounded border border-[var(--border)] bg-[var(--panel-strong)] px-2 py-0.5 text-xs">K</kbd>
          </label>
          <button
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-purple-500"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-purple-500/50 bg-purple-600 px-5 text-sm font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.28)] transition hover:bg-purple-500 md:inline-flex"
            href="https://discord.gg/yWtjK2Tb8T"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-5 w-5" name="discord" />
            Join Discord
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1540px] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-82px)] border-r border-[var(--border)] px-5 py-5 lg:block">
          <div className="sticky top-[102px] rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-500">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-purple-500" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-purple-500">Learning Stages</p>
            <nav className="mt-5 space-y-1">
              {(["Foundation", "Core", "Framework", "Professional"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-purple-500"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-purple-500/25 bg-black/20 p-4">
              <div className="grid h-20 w-full place-items-center rounded-md border border-purple-500/35 bg-black/40 text-4xl font-black text-purple-500">
                UI
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Become a Frontend Expert.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Master the languages, frameworks, tools, and habits behind modern web apps.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-purple-500" name="home" />
              <Link className="hover:text-purple-500" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">Frontend Developer Roadmap</span>
            </div>

            <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-purple-500/40 bg-purple-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  <Icon className="h-4 w-4" name="spark" />
                  Complete Frontend Path
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  Frontend Developer <span className="text-purple-500">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  Your complete path to modern frontend development: HTML, CSS, Tailwind, Sass,
                  JavaScript, TypeScript, React, Next.js, state management, testing, deployment, and real projects.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-4">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Duration", "6-12 Months", "clock"],
                    ["Roadmaps", `${topics.filter((topic) => topic.href).length} Linked`, "book"],
                    ["Projects", "20+ Builds", "target"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-purple-500" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-purple-500/25 bg-black shadow-[0_0_80px_rgba(168,85,247,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-500/35 bg-purple-950/45 shadow-[0_0_60px_rgba(168,85,247,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-purple-300 drop-shadow-[0_0_28px_rgba(168,85,247,0.7)]">
                  &lt;/&gt;
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative">
                <h2 className="mb-5 text-lg font-black text-[var(--text-primary)]">Your Learning Path</h2>
                <div className="absolute bottom-8 left-6 top-12 hidden w-px bg-purple-500/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-purple-500/65" : "border-[var(--border)] hover:border-purple-500/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_72px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-purple-400 bg-purple-600 text-white" : "border-purple-500 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span className="grid h-14 w-14 place-items-center rounded-md border border-[var(--border)] bg-black/40 text-sm font-black text-purple-300">
                            {topic.icon}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-xl font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-purple-500">{topic.level}</span>
                            </span>
                            <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{topic.summary}</span>
                            <span className="mt-4 flex flex-wrap gap-2">
                              {topic.subtopics.slice(0, 6).map((subtopic) => (
                                <span className="rounded border border-[var(--border)] bg-[var(--field-bg)] px-2.5 py-1 text-xs text-[var(--text-secondary)]" key={subtopic}>
                                  {subtopic}
                                </span>
                              ))}
                            </span>
                          </span>
                          <span className="hidden items-center gap-2 text-xs font-bold text-[var(--text-muted)] sm:flex">
                            <Icon className="h-4 w-4 text-purple-500" name="book" />
                            {topic.resources} Topics
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-purple-500" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[148px]">
                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-purple-500">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                                <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                  <Icon className="h-4 w-4 text-purple-500" name="target" />
                                  Practice Project
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{topic.practice}</p>
                                {topic.href ? (
                                  <Link className="mt-4 inline-flex rounded-md border border-purple-500/40 px-3 py-2 text-sm font-black text-purple-400 transition hover:bg-purple-500 hover:text-white" href={topic.href}>
                                    Open detailed roadmap
                                  </Link>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>

                <section className="mt-5 rounded-lg border border-purple-500/35 bg-purple-500/10 p-5">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Real World Projects</h2>
                  <div className="mt-4 grid gap-5 text-sm leading-7 text-[var(--text-secondary)] md:grid-cols-3">
                    <div>
                      <p className="font-black text-purple-400">Beginner</p>
                      <ul className="mt-2 list-disc pl-5">
                        <li>Personal portfolio</li>
                        <li>Todo app</li>
                        <li>Weather app</li>
                        <li>Responsive landing page</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-black text-purple-400">Intermediate</p>
                      <ul className="mt-2 list-disc pl-5">
                        <li>Blog website</li>
                        <li>Ecommerce store</li>
                        <li>Dashboard UI</li>
                        <li>Authentication flow</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-black text-purple-400">Advanced</p>
                      <ul className="mt-2 list-disc pl-5">
                        <li>SaaS app</li>
                        <li>Realtime chat app</li>
                        <li>Admin panel</li>
                        <li>Project management tool</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-5 xl:sticky xl:top-[104px] xl:self-start">
                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Roadmap Progress</h2>
                  <div className="mt-5 grid place-items-center">
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-purple-500/25 border-t-purple-500 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Follow the path from markup to production deployment.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You'll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["Build responsive websites", "Modern CSS and layouts", "JavaScript and TypeScript", "Component-based UI", "Routing and state", "Testing and debugging", "Deployment and monitoring"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["MDN Web Docs", "https://developer.mozilla.org/"],
                      ["freeCodeCamp", "https://www.freecodecamp.org/"],
                      ["React Docs", "https://react.dev/"],
                      ["Next.js Docs", "https://nextjs.org/docs"],
                      ["TypeScript Docs", "https://www.typescriptlang.org/docs/"],
                      ["Tailwind Docs", "https://tailwindcss.com/docs"],
                      ["Sass Docs", "https://sass-lang.com/documentation/"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-purple-500/45 hover:text-purple-500" href={href} key={name} rel="noreferrer" target="_blank">
                        {name}
                        <Icon className="h-4 w-4" name="chevron" />
                      </a>
                    ))}
                  </div>
                </section>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
