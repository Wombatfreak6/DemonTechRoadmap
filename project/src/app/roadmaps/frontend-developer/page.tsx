"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Stage = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type Difficulty = "Starter" | "Core" | "Applied" | "Advanced" | "Expert";
type ResourceCategory = "Official documentation" | "Video resources" | "Interactive practice" | "Community resources";

type RoadmapResource = {
  label: string;
  href: string;
  category: ResourceCategory;
};

type RoadmapNode = {
  id: string;
  title: string;
  description: string;
  stage: Stage;
  difficulty: Difficulty;
  duration: string;
  prerequisites: string[];
  keyConcepts: string[];
  resources: RoadmapResource[];
  practiceTasks: string[];
  miniProject: string;
};

type StageDefinition = {
  stage: Stage;
  summary: string;
  duration: string;
};

const stageDefinitions: StageDefinition[] = [
  {
    stage: "Beginner",
    summary: "Build the mental model of the web, document structure, styling, and responsive layouts.",
    duration: "8-10 weeks",
  },
  {
    stage: "Intermediate",
    summary: "Move from pages to applications with JavaScript, TypeScript, source control, and tooling.",
    duration: "10-12 weeks",
  },
  {
    stage: "Advanced",
    summary: "Create production React and Next.js applications with routing, state, APIs, and auth.",
    duration: "12-16 weeks",
  },
  {
    stage: "Expert",
    summary: "Operate like a senior frontend engineer with testing, accessibility, performance, and DevOps.",
    duration: "10-14 weeks",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    id: "internet-browser-fundamentals",
    title: "Internet & Browser Fundamentals",
    description: "Understand how browsers, DNS, HTTP, URLs, servers, caching, and rendering work before writing complex UI.",
    stage: "Beginner",
    difficulty: "Starter",
    duration: "1 week",
    prerequisites: ["Basic computer literacy"],
    keyConcepts: ["DNS", "HTTP and HTTPS", "Browser rendering", "URLs", "Request lifecycle", "Caching basics"],
    resources: [
      { label: "MDN: How the Web works", href: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work", category: "Official documentation" },
      { label: "web.dev: Learn performance basics", href: "https://web.dev/learn/performance", category: "Official documentation" },
      { label: "freeCodeCamp web basics", href: "https://www.freecodecamp.org/news/tag/web-development/", category: "Video resources" },
    ],
    practiceTasks: ["Draw the request lifecycle for opening a web page.", "Inspect headers, status codes, and assets in browser devtools.", "Explain DNS, CDN, and HTTPS in your own words."],
    miniProject: "Create a one-page visual explainer of how a browser loads a website.",
  },
  {
    id: "html5",
    title: "HTML5",
    description: "Create semantic, accessible document structures that are understandable to browsers, search engines, and assistive technology.",
    stage: "Beginner",
    difficulty: "Starter",
    duration: "2 weeks",
    prerequisites: ["Internet & Browser Fundamentals"],
    keyConcepts: ["Semantic elements", "Forms", "Tables", "Metadata", "SEO basics", "Accessible markup"],
    resources: [
      { label: "MDN HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "Official documentation" },
      { label: "HTML roadmap", href: "/roadmaps/html5", category: "Community resources" },
      { label: "freeCodeCamp HTML course", href: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", category: "Interactive practice" },
    ],
    practiceTasks: ["Build a semantic resume page.", "Create a validated contact form.", "Mark up a blog article with headings, landmarks, and metadata."],
    miniProject: "Build an accessible portfolio homepage using only semantic HTML.",
  },
  {
    id: "css3",
    title: "CSS3",
    description: "Style interfaces with the cascade, selectors, typography, color, spacing, and modern visual systems.",
    stage: "Beginner",
    difficulty: "Core",
    duration: "3 weeks",
    prerequisites: ["HTML5"],
    keyConcepts: ["Cascade", "Specificity", "Box model", "Typography", "Color systems", "Custom properties"],
    resources: [
      { label: "MDN CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "Official documentation" },
      { label: "CSS roadmap", href: "/roadmaps/css", category: "Community resources" },
      { label: "CSS Diner", href: "https://flukeout.github.io/", category: "Interactive practice" },
    ],
    practiceTasks: ["Recreate a landing page screenshot.", "Build reusable button and card styles.", "Create a consistent spacing and color system."],
    miniProject: "Design a polished marketing page with plain CSS.",
  },
  {
    id: "responsive-design",
    title: "Responsive Design",
    description: "Make interfaces adapt elegantly across mobile, tablet, desktop, and large screens without layout breaks.",
    stage: "Beginner",
    difficulty: "Core",
    duration: "2 weeks",
    prerequisites: ["HTML5", "CSS3"],
    keyConcepts: ["Media queries", "Fluid layout", "Viewport units", "Container queries", "Responsive images", "Mobile-first CSS"],
    resources: [
      { label: "MDN responsive design", href: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", category: "Official documentation" },
      { label: "web.dev responsive design", href: "https://web.dev/learn/design/", category: "Official documentation" },
      { label: "Frontend Mentor", href: "https://www.frontendmentor.io/", category: "Interactive practice" },
    ],
    practiceTasks: ["Convert a fixed desktop layout into a mobile-first layout.", "Use responsive images with size constraints.", "Test at 360px, 768px, 1024px, and 1440px."],
    miniProject: "Build a responsive product detail page.",
  },
  {
    id: "flexbox-grid",
    title: "Flexbox & CSS Grid",
    description: "Use the two core CSS layout systems for navigation bars, dashboards, galleries, forms, and full page layouts.",
    stage: "Beginner",
    difficulty: "Core",
    duration: "2 weeks",
    prerequisites: ["CSS3", "Responsive Design"],
    keyConcepts: ["Flex axes", "Alignment", "Grid tracks", "Auto-fit", "Named areas", "Layout composition"],
    resources: [
      { label: "MDN Flexbox", href: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox", category: "Official documentation" },
      { label: "MDN Grid", href: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids", category: "Official documentation" },
      { label: "Flexbox Froggy", href: "https://flexboxfroggy.com/", category: "Interactive practice" },
    ],
    practiceTasks: ["Build a responsive navbar with Flexbox.", "Build a magazine layout with Grid.", "Create a dashboard shell with sidebar, header, and content regions."],
    miniProject: "Build a responsive analytics dashboard layout.",
  },
  {
    id: "css-animations",
    title: "CSS Animations",
    description: "Add purposeful motion with transitions, transforms, keyframes, reduced motion support, and interaction states.",
    stage: "Beginner",
    difficulty: "Core",
    duration: "1 week",
    prerequisites: ["CSS3", "Flexbox & CSS Grid"],
    keyConcepts: ["Transitions", "Transforms", "Keyframes", "Easing", "Reduced motion", "Hover and focus states"],
    resources: [
      { label: "MDN CSS animations", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations", category: "Official documentation" },
      { label: "web.dev animations", href: "https://web.dev/learn/css/animations", category: "Official documentation" },
      { label: "CodePen animation examples", href: "https://codepen.io/topic/animation", category: "Community resources" },
    ],
    practiceTasks: ["Create accessible hover and focus states.", "Animate a loading skeleton.", "Respect prefers-reduced-motion."],
    miniProject: "Build an animated onboarding card set.",
  },
  {
    id: "sass-scss",
    title: "Sass/SCSS",
    description: "Structure larger stylesheets with modules, variables, mixins, functions, and maintainable architecture.",
    stage: "Intermediate",
    difficulty: "Core",
    duration: "1 week",
    prerequisites: ["CSS3"],
    keyConcepts: ["Variables", "Nesting", "Modules", "Mixins", "Functions", "Architecture"],
    resources: [
      { label: "Sass documentation", href: "https://sass-lang.com/documentation/", category: "Official documentation" },
      { label: "Sass roadmap", href: "/roadmaps/sass", category: "Community resources" },
      { label: "Sass guide", href: "https://sass-lang.com/guide/", category: "Official documentation" },
    ],
    practiceTasks: ["Refactor CSS into SCSS partials.", "Create reusable mixins for media queries.", "Build a token file for spacing and colors."],
    miniProject: "Create a reusable component library stylesheet.",
  },
  {
    id: "tailwind-css",
    title: "Tailwind CSS",
    description: "Build consistent modern interfaces quickly with utility-first classes, responsive variants, and design tokens.",
    stage: "Intermediate",
    difficulty: "Core",
    duration: "2 weeks",
    prerequisites: ["CSS3", "Responsive Design"],
    keyConcepts: ["Utility classes", "Variants", "Theme tokens", "Component extraction", "Responsive utilities", "Dark mode"],
    resources: [
      { label: "Tailwind documentation", href: "https://tailwindcss.com/docs", category: "Official documentation" },
      { label: "Tailwind roadmap", href: "/roadmaps/tailwind", category: "Community resources" },
      { label: "Tailwind Play", href: "https://play.tailwindcss.com/", category: "Interactive practice" },
    ],
    practiceTasks: ["Build a dashboard shell.", "Create reusable typed components.", "Implement dark mode and responsive states."],
    miniProject: "Build a premium SaaS dashboard interface.",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Program browser interactions, data flow, DOM updates, async operations, and application logic.",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "6 weeks",
    prerequisites: ["HTML5", "CSS3"],
    keyConcepts: ["Functions", "Objects", "Arrays", "DOM", "Events", "Promises", "Fetch", "Modules"],
    resources: [
      { label: "MDN JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", category: "Official documentation" },
      { label: "JavaScript roadmap", href: "/roadmaps/javascript", category: "Community resources" },
      { label: "JavaScript.info", href: "https://javascript.info/", category: "Interactive practice" },
    ],
    practiceTasks: ["Build a form validator.", "Fetch and render API data.", "Handle loading, success, and error states."],
    miniProject: "Build a searchable movie or book explorer using a public API.",
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Make JavaScript safer and easier to refactor with static types, interfaces, generics, and typed APIs.",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "3 weeks",
    prerequisites: ["JavaScript"],
    keyConcepts: ["Primitive types", "Interfaces", "Union types", "Generics", "Utility types", "Strict mode"],
    resources: [
      { label: "TypeScript handbook", href: "https://www.typescriptlang.org/docs/", category: "Official documentation" },
      { label: "TypeScript roadmap", href: "/roadmaps/typescript", category: "Community resources" },
      { label: "TypeScript playground", href: "https://www.typescriptlang.org/play", category: "Interactive practice" },
    ],
    practiceTasks: ["Type API responses.", "Create reusable generic utilities.", "Convert a JavaScript app to TypeScript strict mode."],
    miniProject: "Build a typed task manager with filters and local persistence.",
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    description: "Use version control, branches, pull requests, code review, and collaboration workflows professionally.",
    stage: "Intermediate",
    difficulty: "Core",
    duration: "1 week",
    prerequisites: ["Basic command line"],
    keyConcepts: ["Commits", "Branches", "Pull requests", "Merge conflicts", "GitHub issues", "Code review"],
    resources: [
      { label: "Git documentation", href: "https://git-scm.com/doc", category: "Official documentation" },
      { label: "Git roadmap", href: "/roadmaps/git", category: "Community resources" },
      { label: "GitHub Skills", href: "https://skills.github.com/", category: "Interactive practice" },
    ],
    practiceTasks: ["Create feature branches.", "Open and review pull requests.", "Resolve a merge conflict in a sample repo."],
    miniProject: "Publish a portfolio repo with clean commits and a useful README.",
  },
  {
    id: "package-managers",
    title: "Package Managers",
    description: "Manage dependencies, scripts, workspaces, lockfiles, and package security with npm, pnpm, or yarn.",
    stage: "Intermediate",
    difficulty: "Core",
    duration: "1 week",
    prerequisites: ["JavaScript", "Git & GitHub"],
    keyConcepts: ["npm scripts", "Lockfiles", "Semantic versioning", "Workspaces", "Dependency types", "Audits"],
    resources: [
      { label: "npm docs", href: "https://docs.npmjs.com/", category: "Official documentation" },
      { label: "pnpm docs", href: "https://pnpm.io/motivation", category: "Official documentation" },
      { label: "Semver guide", href: "https://semver.org/", category: "Official documentation" },
    ],
    practiceTasks: ["Create scripts for dev, build, lint, and test.", "Explain caret and tilde versions.", "Compare npm, pnpm, and yarn workflows."],
    miniProject: "Create a small component package with scripts and a lockfile.",
  },
  {
    id: "build-tools",
    title: "Build Tools",
    description: "Understand how Vite, Webpack, Babel, TypeScript, and bundling transform source code into deployable assets.",
    stage: "Intermediate",
    difficulty: "Applied",
    duration: "2 weeks",
    prerequisites: ["JavaScript", "Package Managers"],
    keyConcepts: ["Bundling", "Transpilation", "Code splitting", "Tree shaking", "Source maps", "Environment variables"],
    resources: [
      { label: "Vite docs", href: "https://vite.dev/guide/", category: "Official documentation" },
      { label: "Webpack concepts", href: "https://webpack.js.org/concepts/", category: "Official documentation" },
      { label: "Babel handbook", href: "https://babeljs.io/docs/", category: "Official documentation" },
    ],
    practiceTasks: ["Create a Vite app from scratch.", "Inspect generated bundles.", "Configure environment variables and aliases."],
    miniProject: "Build a TypeScript SPA starter with Vite, linting, and production build scripts.",
  },
  {
    id: "react",
    title: "React.js",
    description: "Build component-based interfaces with JSX, props, state, hooks, forms, composition, and reusable UI patterns.",
    stage: "Advanced",
    difficulty: "Applied",
    duration: "6 weeks",
    prerequisites: ["JavaScript", "TypeScript", "Build Tools"],
    keyConcepts: ["Components", "Props", "State", "Hooks", "Effects", "Forms", "Composition"],
    resources: [
      { label: "React documentation", href: "https://react.dev/", category: "Official documentation" },
      { label: "React roadmap", href: "/roadmaps/react", category: "Community resources" },
      { label: "React challenges", href: "https://react.dev/learn", category: "Interactive practice" },
    ],
    practiceTasks: ["Create reusable components.", "Manage forms and validation.", "Build loading, empty, and error states."],
    miniProject: "Build a course dashboard with search, filters, forms, and saved preferences.",
  },
  {
    id: "routing",
    title: "Routing",
    description: "Model application navigation, nested routes, dynamic parameters, layouts, redirects, and protected pages.",
    stage: "Advanced",
    difficulty: "Applied",
    duration: "2 weeks",
    prerequisites: ["React.js"],
    keyConcepts: ["Nested routes", "Route params", "Layouts", "Navigation state", "Protected routes", "URL state"],
    resources: [
      { label: "React Router docs", href: "https://reactrouter.com/", category: "Official documentation" },
      { label: "Next.js routing docs", href: "https://nextjs.org/docs/app/building-your-application/routing", category: "Official documentation" },
      { label: "TanStack Router", href: "https://tanstack.com/router/latest", category: "Community resources" },
    ],
    practiceTasks: ["Create nested dashboard routes.", "Persist filters in URL params.", "Protect a route with auth state."],
    miniProject: "Build a multi-page admin console with nested layouts.",
  },
  {
    id: "state-management",
    title: "State Management",
    description: "Choose the right state model for local UI state, global state, reducers, server state, and cached API data.",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "3 weeks",
    prerequisites: ["React.js", "Routing"],
    keyConcepts: ["Local state", "Context", "Reducers", "Zustand", "Server state", "TanStack Query"],
    resources: [
      { label: "React state docs", href: "https://react.dev/learn/managing-state", category: "Official documentation" },
      { label: "TanStack Query", href: "https://tanstack.com/query/latest", category: "Official documentation" },
      { label: "Zustand docs", href: "https://zustand.docs.pmnd.rs/", category: "Official documentation" },
    ],
    practiceTasks: ["Compare local state, context, and stores.", "Cache API results with loading and error states.", "Normalize shared state boundaries."],
    miniProject: "Build a kanban board with persisted filters and cached server data.",
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Connect frontends to real backends using REST, GraphQL, async flows, validation, caching, and error handling.",
    stage: "Advanced",
    difficulty: "Applied",
    duration: "3 weeks",
    prerequisites: ["JavaScript", "TypeScript", "State Management"],
    keyConcepts: ["REST", "GraphQL", "Fetch", "Error handling", "Runtime validation", "Pagination", "Optimistic updates"],
    resources: [
      { label: "MDN Fetch API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", category: "Official documentation" },
      { label: "GraphQL learn", href: "https://graphql.org/learn/", category: "Official documentation" },
      { label: "Public APIs", href: "https://github.com/public-apis/public-apis", category: "Community resources" },
    ],
    practiceTasks: ["Fetch paginated data.", "Validate API responses.", "Implement retry and error handling."],
    miniProject: "Build a GitHub profile explorer with search, pagination, and cached results.",
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "Ship full-stack React apps with App Router, server components, rendering strategies, API routes, SEO, and deployment.",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "6 weeks",
    prerequisites: ["React.js", "Routing", "API Integration"],
    keyConcepts: ["App Router", "Server Components", "Data fetching", "Caching", "API routes", "Metadata", "Deployment"],
    resources: [
      { label: "Next.js documentation", href: "https://nextjs.org/docs", category: "Official documentation" },
      { label: "Next.js roadmap", href: "/roadmaps/nextjs", category: "Community resources" },
      { label: "Vercel templates", href: "https://vercel.com/templates/next.js", category: "Community resources" },
    ],
    practiceTasks: ["Build nested layouts with the App Router.", "Use server and client components intentionally.", "Create SEO metadata and API routes."],
    miniProject: "Build a production blog or commerce catalog with Next.js.",
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Protect user flows with sessions, OAuth, tokens, role-based UI, secure redirects, and server-side guards.",
    stage: "Advanced",
    difficulty: "Advanced",
    duration: "2 weeks",
    prerequisites: ["Next.js", "API Integration"],
    keyConcepts: ["Sessions", "OAuth", "JWT", "Cookies", "Protected routes", "Roles", "Security basics"],
    resources: [
      { label: "Auth.js docs", href: "https://authjs.dev/", category: "Official documentation" },
      { label: "OWASP auth cheat sheet", href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", category: "Official documentation" },
      { label: "Clerk docs", href: "https://clerk.com/docs", category: "Official documentation" },
    ],
    practiceTasks: ["Create login, logout, and protected pages.", "Handle session loading states.", "Render role-specific navigation."],
    miniProject: "Build a members-only dashboard with account settings.",
  },
  {
    id: "testing",
    title: "Testing",
    description: "Verify frontend behavior with unit, component, integration, accessibility, and end-to-end tests.",
    stage: "Expert",
    difficulty: "Advanced",
    duration: "3 weeks",
    prerequisites: ["React.js", "API Integration"],
    keyConcepts: ["Vitest", "Testing Library", "Playwright", "Mocking", "Test pyramid", "CI checks"],
    resources: [
      { label: "Testing Library", href: "https://testing-library.com/docs/", category: "Official documentation" },
      { label: "Playwright docs", href: "https://playwright.dev/docs/intro", category: "Official documentation" },
      { label: "Vitest docs", href: "https://vitest.dev/", category: "Official documentation" },
    ],
    practiceTasks: ["Test forms and navigation.", "Mock API requests.", "Add an end-to-end smoke test for a critical flow."],
    miniProject: "Create a tested checkout flow with unit and E2E coverage.",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Make products usable by everyone with semantic markup, keyboard support, focus management, ARIA, and contrast checks.",
    stage: "Expert",
    difficulty: "Advanced",
    duration: "2 weeks",
    prerequisites: ["HTML5", "React.js", "Testing"],
    keyConcepts: ["WCAG", "Keyboard navigation", "Focus management", "ARIA", "Screen readers", "Color contrast"],
    resources: [
      { label: "WCAG quick reference", href: "https://www.w3.org/WAI/WCAG22/quickref/", category: "Official documentation" },
      { label: "MDN accessibility", href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility", category: "Official documentation" },
      { label: "A11y Project checklist", href: "https://www.a11yproject.com/checklist/", category: "Community resources" },
    ],
    practiceTasks: ["Audit keyboard navigation.", "Fix form labels and focus states.", "Run automated and manual accessibility tests."],
    miniProject: "Build an accessible modal, menu, and form system.",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Improve real user experience through Core Web Vitals, bundle analysis, image optimization, caching, and rendering strategy.",
    stage: "Expert",
    difficulty: "Expert",
    duration: "3 weeks",
    prerequisites: ["Next.js", "Testing"],
    keyConcepts: ["Core Web Vitals", "Bundle analysis", "Lazy loading", "Images", "Caching", "Rendering strategy"],
    resources: [
      { label: "web.dev performance", href: "https://web.dev/learn/performance", category: "Official documentation" },
      { label: "Next.js optimizing docs", href: "https://nextjs.org/docs/app/building-your-application/optimizing", category: "Official documentation" },
      { label: "PageSpeed Insights", href: "https://pagespeed.web.dev/", category: "Interactive practice" },
    ],
    practiceTasks: ["Measure Core Web Vitals.", "Reduce bundle size.", "Optimize images, fonts, and data fetching."],
    miniProject: "Take a slow page and improve Lighthouse performance by 30+ points.",
  },
  {
    id: "deployment-devops",
    title: "Deployment & DevOps",
    description: "Deploy safely with CI/CD, preview environments, environment variables, monitoring, logging, and rollback strategy.",
    stage: "Expert",
    difficulty: "Advanced",
    duration: "2 weeks",
    prerequisites: ["Git & GitHub", "Next.js", "Testing"],
    keyConcepts: ["Vercel", "CI/CD", "Preview deploys", "Environment variables", "Monitoring", "Rollback"],
    resources: [
      { label: "Vercel docs", href: "https://vercel.com/docs", category: "Official documentation" },
      { label: "GitHub Actions docs", href: "https://docs.github.com/en/actions", category: "Official documentation" },
      { label: "Deployment roadmap", href: "/docs/best-practices", category: "Community resources" },
    ],
    practiceTasks: ["Create preview deployments.", "Protect production environment variables.", "Add build, lint, and test checks to CI."],
    miniProject: "Deploy a production Next.js app with monitoring and rollback notes.",
  },
  {
    id: "advanced-frontend-topics",
    title: "Advanced Frontend Topics",
    description: "Round out senior-level depth with design systems, security, Web APIs, PWAs, microfrontends, and AI-assisted workflows.",
    stage: "Expert",
    difficulty: "Expert",
    duration: "4 weeks",
    prerequisites: ["Performance Optimization", "Deployment & DevOps"],
    keyConcepts: ["Design systems", "Frontend security", "PWAs", "WebSockets", "Microfrontends", "Web Workers", "AI tooling"],
    resources: [
      { label: "web.dev PWA", href: "https://web.dev/learn/pwa/", category: "Official documentation" },
      { label: "OWASP frontend security", href: "https://owasp.org/www-project-top-ten/", category: "Official documentation" },
      { label: "Storybook docs", href: "https://storybook.js.org/docs", category: "Official documentation" },
    ],
    practiceTasks: ["Create a design system foundation.", "Add realtime updates with WebSockets.", "Document frontend security risks and mitigations."],
    miniProject: "Build a design-system-backed realtime project board.",
  },
];

const resourceCategories: ResourceCategory[] = [
  "Official documentation",
  "Video resources",
  "Interactive practice",
  "Community resources",
];

const statusStorageKey = "demontech-frontend-roadmap-completed";

const icons: Record<string, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6" />,
  book: <path d="M5 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H5V4Zm10 0h4v14h-4" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16" />,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 .2 2-.8 3.4-2 4-1-4-4-6-4-9-3 2-5 6-5 10 0 5 4 9 8 9Z" />,
  gauge: <path d="M4 14a8 8 0 1 1 16 0m-8 0 4-4M6 18h12" />,
  github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.2-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 20 4.7 5 5 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.7a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.5 7a3.4 3.4 0 0 0-1 2.6V22" />,
  layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  link: <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1m4 6a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />,
  lock: <path d="M6 11V8a6 6 0 0 1 12 0v3m-1 0H7a1 1 0 0 0-1 1v8h12v-8a1 1 0 0 0-1-1Z" />,
  play: <path d="M8 5v14l11-7-11-7Z" />,
  spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
};

function Icon({ name, className = "" }: { name: keyof typeof icons; className?: string }) {
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
        <circle
          className="stroke-red-500"
          cx="50"
          cy="50"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      <span className="absolute text-2xl font-black text-white">{percentage}%</span>
    </div>
  );
}

function CompletionButton({ completed, onToggle, title }: { completed: boolean; onToggle: () => void; title: string }) {
  return (
    <button
      aria-pressed={completed}
      className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition ${
        completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-red-500/70"
      }`}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      type="button"
    >
      <Icon className="h-4 w-4" name="check" />
      {completed ? "Completed" : `Mark ${title} done`}
    </button>
  );
}

function RoadmapNodeCard({
  node,
  index,
  expanded,
  completed,
  onExpand,
  onToggleComplete,
}: {
  node: RoadmapNode;
  index: number;
  expanded: boolean;
  completed: boolean;
  onExpand: () => void;
  onToggleComplete: () => void;
}) {
  return (
    <article className="relative">
      <span className={`absolute left-0 top-7 z-10 grid h-12 w-12 place-items-center rounded-md border text-sm font-black ${completed ? "border-red-500 bg-red-500 text-white" : "border-zinc-800 bg-[#050505] text-zinc-300"}`}>
        {completed ? <Icon className="h-5 w-5" name="check" /> : String(index + 1).padStart(2, "0")}
      </span>

      <div className={`ml-7 rounded-md border bg-zinc-950/80 transition ${expanded ? "border-red-500/70" : "border-zinc-800 hover:border-red-500/40"}`}>
        <button
          aria-controls={`${node.id}-panel`}
          aria-expanded={expanded}
          className="grid w-full gap-5 p-5 pl-10 text-left md:grid-cols-[minmax(0,1fr)_auto]"
          onClick={onExpand}
          type="button"
        >
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
            <span className={completed ? "text-sm font-bold text-red-300" : "text-sm font-bold text-zinc-500"}>
              {completed ? "Done" : "Pending"}
            </span>
            <Icon className={`h-5 w-5 text-zinc-500 transition ${expanded ? "rotate-90 text-red-400" : ""}`} name="arrow" />
          </span>
        </button>

        {expanded ? (
          <div className="border-t border-zinc-800 px-5 pb-5 pl-10" id={`${node.id}-panel`}>
            <div className="grid gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_255px]">
              <div className="space-y-6">
                <section>
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

                <section>
                  <h3 className="text-sm font-black text-white">Key Concepts</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {node.keyConcepts.map((concept) => (
                      <span className="rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm text-zinc-300" key={concept}>
                        {concept}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-black text-white">Practice Tasks</h3>
                  <ul className="mt-3 grid gap-3">
                    {node.practiceTasks.map((task) => (
                      <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={task}>
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="target" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="space-y-5">
                <section className="border-l border-red-500/40 pl-4">
                  <h3 className="text-sm font-black text-white">Mini Project</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{node.miniProject}</p>
                </section>

                <section className="border-l border-zinc-800 pl-4">
                  <h3 className="text-sm font-black text-white">Resources</h3>
                  <div className="mt-3 space-y-2">
                    {node.resources.map((resource) => (
                      <a
                        className="flex items-center justify-between rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white"
                        href={resource.href}
                        key={`${node.id}-${resource.label}`}
                        rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
                        target={resource.href.startsWith("http") ? "_blank" : undefined}
                      >
                        <span>{resource.label}</span>
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>

                <CompletionButton completed={completed} onToggle={onToggleComplete} title={node.title} />
              </aside>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function SidebarWidget({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-950/90 p-5">
      <h2 className="text-sm font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

export default function FrontendDeveloperRoadmap() {
  const [expandedNodeId, setExpandedNodeId] = useState(roadmapNodes[0].id);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }

    const stored = window.localStorage.getItem(statusStorageKey);
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  });

  useEffect(() => {
    window.localStorage.setItem(statusStorageKey, JSON.stringify(Array.from(completedIds)));
  }, [completedIds]);

  const completedCount = completedIds.size;
  const progressPercentage = Math.round((completedCount / roadmapNodes.length) * 100);
  const nextTopic = roadmapNodes.find((node) => !completedIds.has(node.id)) ?? roadmapNodes[roadmapNodes.length - 1];
  const totalResources = roadmapNodes.reduce((count, node) => count + node.resources.length, 0);

  const stageProgress = useMemo(
    () =>
      stageDefinitions.map((definition) => {
        const nodes = roadmapNodes.filter((node) => node.stage === definition.stage);
        const completed = nodes.filter((node) => completedIds.has(node.id)).length;
        return {
          ...definition,
          completed,
          total: nodes.length,
          percentage: Math.round((completed / nodes.length) * 100),
        };
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

  const toggleCompleted = (nodeId: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
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
            <Link className="transition hover:text-white" href="/docs/best-practices">Best Practices</Link>
            <Link className="transition hover:text-white" href="/docs/project-ideas">Projects</Link>
          </nav>
          <a className="hidden rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400 md:inline-flex" href="https://discord.gg/yWtjK2Tb8T" rel="noreferrer" target="_blank">
            Join Community
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-6">
        <section>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <Link className="hover:text-red-400" href="/">Home</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <Link className="hover:text-red-400" href="/docs/all-roadmaps">Roadmaps</Link>
            <Icon className="h-3.5 w-3.5" name="arrow" />
            <span className="font-bold text-zinc-300">Frontend Developer</span>
          </div>

          <section className="mt-6 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_285px] lg:p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-black text-red-300">
                  <Icon className="h-4 w-4" name="spark" />
                  Professional Frontend Learning Path
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Frontend Developer Roadmap
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
                  A complete red-team styled learning journey from browser fundamentals to senior-level frontend engineering. Track progress, expand each node, ship projects, and move through beginner, intermediate, advanced, and expert stages with intention.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["24", "Roadmap nodes", "layers"],
                    ["42-54 weeks", "Total duration", "clock"],
                    [String(totalResources), "Curated resources", "book"],
                    ["24", "Mini projects", "target"],
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
                <p className="text-sm font-black text-white">Learning Architecture</p>
                <div className="mt-5 space-y-4">
                  {stageProgress.map((stage) => (
                    <button
                      className="w-full text-left"
                      key={stage.stage}
                      onClick={() => setExpandedNodeId(roadmapNodes.find((node) => node.stage === stage.stage)?.id ?? roadmapNodes[0].id)}
                      type="button"
                    >
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

          <section className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">Vertical Learning Journey</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                  Each node includes difficulty, duration, prerequisites, core concepts, resources, practice tasks, and a mini project.
                </p>
              </div>
              <button
                className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white"
                onClick={() => setCompletedIds(new Set())}
                type="button"
              >
                Reset Progress
              </button>
            </div>

            <div className="relative mt-6 space-y-5">
              <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-zinc-800 sm:block" />
              {roadmapNodes.map((node, index) => (
                <RoadmapNodeCard
                  completed={completedIds.has(node.id)}
                  expanded={expandedNodeId === node.id}
                  index={index}
                  key={node.id}
                  node={node}
                  onExpand={() => setExpandedNodeId((current) => (current === node.id ? "" : node.id))}
                  onToggleComplete={() => toggleCompleted(node.id)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-md border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-2xl font-black text-white">Resource Library</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Start with official docs, reinforce with focused videos, then practice with interactive and community-driven challenges.
            </p>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {resourcesByCategory.map(({ category, resources }) => (
                <section className="border-t border-zinc-800 pt-4" key={category}>
                  <h3 className="text-sm font-black text-white">{category}</h3>
                  <div className="mt-3 space-y-2">
                    {resources.map((resource) => (
                      <a
                        className="flex items-center justify-between rounded-md border border-zinc-800 bg-[#050505] px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/60 hover:text-white"
                        href={resource.href}
                        key={`${category}-${resource.label}`}
                        rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
                        target={resource.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {resource.label}
                        <Icon className="h-4 w-4 text-red-400" name="arrow" />
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarWidget title="Roadmap Progress">
            <div className="mt-5 flex items-center gap-5">
              <ProgressRing percentage={progressPercentage} />
              <div>
                <p className="text-3xl font-black text-white">{completedCount}/{roadmapNodes.length}</p>
                <p className="mt-1 text-sm text-zinc-500">topics completed</p>
                <p className="mt-4 text-sm font-bold text-red-300">{progressPercentage}% complete</p>
              </div>
            </div>
          </SidebarWidget>

          <SidebarWidget title="Learning Streak">
            <div className="mt-4 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
                <Icon className="h-6 w-6" name="flame" />
              </span>
              <div>
                <p className="text-2xl font-black text-white">7 days</p>
                <p className="text-sm text-zinc-500">current streak</p>
              </div>
            </div>
          </SidebarWidget>

          <SidebarWidget title="Recommended Next Topic">
            <div className="mt-4">
              <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${difficultyClass(nextTopic.difficulty)}`}>{nextTopic.difficulty}</span>
              <h3 className="mt-3 text-lg font-black text-white">{nextTopic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{nextTopic.description}</p>
              <button
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-red-500 px-4 py-2 text-sm font-black text-white transition hover:bg-red-400"
                onClick={() => setExpandedNodeId(nextTopic.id)}
                type="button"
              >
                Open topic
                <Icon className="h-4 w-4" name="arrow" />
              </button>
            </div>
          </SidebarWidget>

          <SidebarWidget title="Completion Snapshot">
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
          </SidebarWidget>

          <SidebarWidget title="Missing Topics Added">
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              {["Browser internals", "Package managers", "Build tooling", "API integration", "Authentication", "Accessibility", "Performance", "Frontend security", "Design systems", "PWAs and realtime APIs"].map((topic) => (
                <li className="flex gap-3" key={topic}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" name="check" />
                  {topic}
                </li>
              ))}
            </ul>
          </SidebarWidget>
        </aside>
      </div>
    </main>
  );
}
