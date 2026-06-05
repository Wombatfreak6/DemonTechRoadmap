"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type ThemeVars = CSSProperties & Record<`--${string}`, string>;
type Topic = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  explanation: string;
  subtopics: string[];
  goals: string[];
  practice: string;
  code: string;
  notes: string[];
  resources: number;
};

const navItems = ["Roadmaps", "Resources", "Guides", "Docs", "Community"];

const topics: Topic[] = [
  {
    id: "intro-tailwind",
    title: "Introduction to Tailwind CSS",
    level: "Beginner",
    summary: "Understand Tailwind as a utility-first CSS framework and why teams use it.",
    explanation:
      "Tailwind CSS gives you small, composable utility classes like flex, pt-4, text-center, and bg-cyan-500. Instead of writing a custom CSS class for every component, you build designs directly in markup using a constrained design system. This keeps styling close to the component and makes repeated design decisions consistent.",
    subtopics: ["Utility-first", "Design system", "No context switching", "Responsive by default", "Dark mode"],
    goals: [
      "Explain the difference between utility-first and component CSS frameworks.",
      "Understand why Tailwind enables consistent spacing, colors, typography, and states.",
      "Recognize where Tailwind fits with React, Next.js, Vue, Svelte, and plain HTML.",
    ],
    practice: "Rebuild a simple card twice: once with custom CSS and once with Tailwind utilities, then compare the workflow.",
    code: `<article className="rounded-lg border border-cyan-500/30 bg-slate-950 p-5 text-slate-100 shadow-xl">
  <h2 className="text-2xl font-bold text-cyan-300">Tailwind CSS</h2>
  <p className="mt-3 text-sm leading-6 text-slate-300">
    Build custom interfaces with utility classes.
  </p>
  <button className="mt-5 rounded-md bg-cyan-500 px-4 py-2 font-bold text-black hover:bg-cyan-400">
    Start learning
  </button>
</article>`,
    notes: [
      "Utilities are low-level building blocks, not predesigned components.",
      "The class list documents spacing, color, typography, and interaction in one place.",
      "Tailwind production builds remove unused utilities for small final CSS bundles.",
    ],
    resources: 4,
  },
  {
    id: "installation-setup",
    title: "Installation & Setup",
    level: "Beginner",
    summary: "Install Tailwind CSS, configure content scanning, and understand v4 CSS-first setup.",
    explanation:
      "Tailwind needs to scan your source files so it can generate only the utilities you use. In modern projects, setup depends on your build tool and Tailwind version. The roadmap source highlights Vite/React setup and Tailwind v4's CSS-first configuration, where much of the configuration can live directly in CSS.",
    subtopics: ["Vite", "React", "Next.js", "Content paths", "v4 config", "Play CDN"],
    goals: [
      "Install Tailwind in a modern frontend project.",
      "Configure Tailwind so all template files are scanned.",
      "Know when the Play CDN is acceptable and when it is not.",
    ],
    practice: "Add Tailwind to a Vite or Next.js project and render a styled hero section.",
    code: `npm install tailwindcss @tailwindcss/vite

/* src/index.css */
@import "tailwindcss";

/* Tailwind v4 CSS-first theme idea */
@theme {
  --color-brand: #06b6d4;
  --spacing-card: 1.25rem;
}

/* React component */
export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <h1 className="text-4xl font-black text-cyan-400">Ship faster</h1>
    </section>
  );
}`,
    notes: [
      "The Play CDN is useful for quick demos, not production apps.",
      "Content scanning is what keeps production CSS small.",
      "Tailwind v4 moves more configuration into CSS through directives like @theme.",
    ],
    resources: 5,
  },
  {
    id: "utility-workflow",
    title: "Utility-First Workflow",
    level: "Beginner",
    summary: "Think in small utilities, compose styles quickly, and avoid premature custom CSS.",
    explanation:
      "Utility-first design means you style by composing single-purpose classes. At first, class lists look long, but they reduce naming overhead and prevent one-off CSS files from growing out of control. The workflow shines when you build reusable components around repeated class combinations.",
    subtopics: ["Utility classes", "Composition", "Responsive variants", "State variants", "Component extraction"],
    goals: [
      "Build UI directly with utilities before extracting components.",
      "Use hover, focus-visible, active, disabled, and responsive prefixes.",
      "Know when repeated markup should become a reusable component.",
    ],
    practice: "Create Button, Card, Badge, and Input components using Tailwind utility classes.",
    code: `type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ children, variant = "primary" }: ButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-cyan-500 text-black hover:bg-cyan-400"
      : "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10";

  return (
    <button className={"rounded-md px-4 py-2 text-sm font-bold transition " + classes}>
      {children}
    </button>
  );
}`,
    notes: [
      "Reusable components are the Tailwind-friendly way to avoid repeated class lists.",
      "State variants are prefixes such as hover:, focus-visible:, disabled:, and active:.",
      "Responsive prefixes are mobile-first and apply from the breakpoint upward.",
    ],
    resources: 5,
  },
  {
    id: "spacing-sizing-layout",
    title: "Spacing, Sizing & Layout",
    level: "Beginner",
    summary: "Use Tailwind's spacing scale for margin, padding, width, height, gap, Flexbox, and Grid.",
    explanation:
      "Tailwind's spacing scale is one of its biggest advantages. A value like p-4, gap-5, or mt-6 comes from a shared scale, so UI spacing stays consistent across the app. Layout utilities cover display, Flexbox, Grid, sizing, overflow, and positioning without writing new CSS.",
    subtopics: ["Spacing scale", "Margin", "Padding", "Width", "Flexbox", "Grid", "Gap"],
    goals: [
      "Use the spacing scale for consistent margin, padding, and gap.",
      "Build one-dimensional layouts with Flexbox utilities.",
      "Build responsive two-dimensional layouts with Grid utilities.",
    ],
    practice: "Build a responsive pricing grid with cards that stack on mobile and become three columns on desktop.",
    code: `<section className="mx-auto grid max-w-5xl gap-5 px-5 py-12 md:grid-cols-3">
  {["Starter", "Pro", "Team"].map((plan) => (
    <article key={plan} className="rounded-lg border border-slate-800 bg-slate-950 p-5">
      <h3 className="text-lg font-bold text-white">{plan}</h3>
      <p className="mt-3 text-sm text-slate-400">Consistent spacing from Tailwind.</p>
      <button className="mt-6 w-full rounded-md bg-cyan-500 py-2 font-bold text-black">
        Choose plan
      </button>
    </article>
  ))}
</section>`,
    notes: [
      "p-5 means padding from the shared spacing scale.",
      "md:grid-cols-3 applies only at the md breakpoint and above.",
      "gap utilities are usually cleaner than manually spacing children with margins.",
    ],
    resources: 7,
  },
  {
    id: "typography-colors",
    title: "Typography, Colors & Backgrounds",
    level: "Beginner",
    summary: "Style text, font weight, line height, colors, gradients, opacity, and background treatments.",
    explanation:
      "Tailwind ships with a broad color palette and typography utilities for font size, weight, line height, alignment, decoration, and color. Because these values come from a theme scale, the UI feels more coherent than random hex values and one-off font sizes.",
    subtopics: ["Font size", "Font weight", "Line height", "Text color", "Background color", "Gradients"],
    goals: [
      "Use Tailwind's type scale instead of arbitrary font sizes by default.",
      "Apply text, background, border, and ring colors consistently.",
      "Create simple gradients and transparent overlays with utilities.",
    ],
    practice: "Design a blog article header with title, metadata, gradient background, and readable body text.",
    code: `<header className="bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-5 py-20">
  <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
    Tailwind CSS
  </p>
  <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white">
    Build interfaces with a shared design system
  </h1>
  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
    Typography, colors, and spacing stay consistent because they use theme tokens.
  </p>
</header>`,
    notes: [
      "Color utilities follow a family and shade pattern, such as cyan-500 or slate-950.",
      "leading controls line height.",
      "Gradient utilities combine direction, color stops, and opacity-friendly colors.",
    ],
    resources: 6,
  },
  {
    id: "responsive-variants",
    title: "Responsive Design & Variants",
    level: "Intermediate",
    summary: "Use mobile-first breakpoints, pseudo-class variants, group, peer, dark mode, ARIA, and data variants.",
    explanation:
      "Tailwind variants let you apply utilities only under certain conditions. Breakpoints handle screen size, pseudo-class variants handle interaction states, group and peer coordinate state between elements, and dark, aria, and data variants let styling respond to UI state.",
    subtopics: ["Breakpoints", "hover", "focus-visible", "group", "peer", "dark", "aria", "data"],
    goals: [
      "Build mobile-first responsive components.",
      "Use group and peer variants for parent and sibling state.",
      "Style accessible UI based on aria and data attributes.",
    ],
    practice: "Build an accessible accordion with aria-expanded styles and responsive layout changes.",
    code: `<div className="group rounded-lg border border-cyan-500/30 p-4">
  <button
    aria-expanded="false"
    className="flex w-full items-center justify-between text-left font-bold text-white group-hover:text-cyan-300"
  >
    What is Tailwind?
    <span className="transition group-aria-expanded:rotate-180">⌄</span>
  </button>
  <p className="mt-3 hidden text-sm text-slate-400 group-aria-expanded:block md:text-base">
    Tailwind is a utility-first CSS framework.
  </p>
</div>`,
    notes: [
      "Unprefixed utilities apply to all screen sizes.",
      "Breakpoint prefixes like md: apply from that width upward.",
      "ARIA and data variants help connect styling to accessible state.",
    ],
    resources: 6,
  },
  {
    id: "effects-animation",
    title: "Borders, Shadows, Effects & Animation",
    level: "Intermediate",
    summary: "Add borders, rings, shadows, transitions, transforms, animations, filters, and polished motion.",
    explanation:
      "Tailwind includes utilities for visual depth and motion: border, rounded, shadow, ring, transition, transform, animate, blur, backdrop, opacity, and filters. Motion should improve feedback and clarity, while respecting reduced-motion preferences when needed.",
    subtopics: ["Borders", "Radius", "Ring", "Shadow", "Transition", "Transform", "Animation", "Filters"],
    goals: [
      "Create focus rings and hover states that feel polished.",
      "Use transform and transition utilities for small UI feedback.",
      "Apply shadows and borders without overdecorating the interface.",
    ],
    practice: "Create a card grid with hover lift, focus-visible rings, and subtle shadows.",
    code: `<a
  href="/docs/all-roadmaps"
  className="block rounded-lg border border-slate-800 bg-slate-950 p-5 shadow-xl shadow-cyan-950/20 transition hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
>
  <h3 className="text-lg font-bold text-white">Interactive card</h3>
  <p className="mt-2 text-sm text-slate-400">Hover and focus states are built with utilities.</p>
</a>`,
    notes: [
      "focus-visible styles are essential for keyboard users.",
      "transition controls animated property changes.",
      "Use motion subtly; interaction feedback should not distract from content.",
    ],
    resources: 5,
  },
  {
    id: "customizing-tailwind",
    title: "Customizing Tailwind",
    level: "Advanced",
    summary: "Customize theme tokens, arbitrary values, CSS variables, official plugins, and custom plugins.",
    explanation:
      "Tailwind is most powerful when it reflects your design system. You can extend colors, spacing, font families, breakpoints, and more. Arbitrary values are useful for one-off precision, but repeated values should become tokens. Plugins let teams add reusable utilities or component patterns.",
    subtopics: ["Theme tokens", "Arbitrary values", "CSS variables", "Plugins", "tailwind.config.js", "@theme"],
    goals: [
      "Extend or replace the default theme safely.",
      "Use arbitrary values sparingly and promote repeated values to tokens.",
      "Understand official plugins such as typography and forms.",
    ],
    practice: "Create a brand theme with custom colors, font, spacing token, and reusable button class.",
    code: `/* Tailwind v4 CSS-first customization */
@import "tailwindcss";

@theme {
  --color-demon: #06b6d4;
  --color-demon-dark: #0e7490;
  --font-display: "Inter", sans-serif;
  --spacing-shell: 2.5rem;
}

.btn-primary {
  @apply rounded-md bg-demon px-4 py-2 font-bold text-black transition hover:bg-cyan-300;
}`,
    notes: [
      "Use semantic token names when a value has product meaning.",
      "@apply is best for small repeated component classes, not for recreating every utility.",
      "Arbitrary values like w-[37rem] are useful, but repeated arbitrary values are a smell.",
    ],
    resources: 8,
  },
  {
    id: "components-patterns",
    title: "Components & Patterns",
    level: "Advanced",
    summary: "Build reusable UI with component extraction, CVA, tailwind-merge, shadcn/ui, and accessible primitives.",
    explanation:
      "Tailwind does not prevent component architecture. In React and Next.js apps, repeated utility combinations should become components. Libraries like class-variance-authority help manage variants, tailwind-merge resolves conflicting classes, and shadcn/ui demonstrates a copy-paste component workflow built on Radix and Tailwind.",
    subtopics: ["Buttons", "Cards", "Forms", "CVA", "tailwind-merge", "shadcn/ui", "Headless UI"],
    goals: [
      "Extract repeated class combinations into reusable components.",
      "Create component variants without fragile string logic.",
      "Use accessible unstyled primitives when building complex UI.",
    ],
    practice: "Build a Button component with size and variant options, then use it in a pricing section.",
    code: `import { clsx } from "clsx";

type ButtonProps = {
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  className?: string;
  children: React.ReactNode;
};

export function Button({
  size = "md",
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-md font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base",
        variant === "primary"
          ? "bg-cyan-500 text-black hover:bg-cyan-400"
          : "border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10",
        className,
      )}
    >
      {children}
    </button>
  );
}`,
    notes: [
      "Component extraction keeps markup readable when patterns repeat.",
      "clsx helps combine conditional class names.",
      "tailwind-merge is useful when user-provided classes may conflict with defaults.",
    ],
    resources: 7,
  },
  {
    id: "performance-a11y",
    title: "Performance, Tooling & Accessibility",
    level: "Advanced",
    summary: "Keep bundles small, avoid dynamic class pitfalls, use IntelliSense, and build accessible Tailwind UI.",
    explanation:
      "Tailwind production builds are small when content scanning can see every class. Problems happen when classes are constructed dynamically in ways the compiler cannot detect. Accessibility still depends on good HTML, semantic controls, visible focus states, contrast, reduced motion, and proper ARIA.",
    subtopics: ["Purging", "Content config", "Safelist", "IntelliSense", "Contrast", "Focus", "Reduced motion"],
    goals: [
      "Avoid dynamic class names that cannot be detected at build time.",
      "Use tooling like Tailwind IntelliSense for autocomplete and linting.",
      "Build accessible focus, contrast, and motion states.",
    ],
    practice: "Audit a Tailwind page for dynamic class names, focus-visible styles, color contrast, and reduced motion support.",
    code: `// Avoid this: Tailwind may not see the full generated class.
const bad = "bg-" + color + "-500";

// Prefer a complete map of possible classes.
const colorClasses = {
  cyan: "bg-cyan-500 text-black",
  emerald: "bg-emerald-500 text-black",
  rose: "bg-rose-500 text-white",
} as const;

function StatusBadge({ color }: { color: keyof typeof colorClasses }) {
  return (
    <span className={"rounded px-2 py-1 text-xs font-bold " + colorClasses[color]}>
      Active
    </span>
  );
}

// Accessibility baseline
<button className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 motion-reduce:transition-none">
  Save
</button>`,
    notes: [
      "Tailwind scans source text, so complete class names should appear in your code.",
      "Safelist dynamic classes only when a finite map is not practical.",
      "Tailwind utilities do not replace accessibility fundamentals.",
    ],
    resources: 9,
  },
  {
    id: "real-projects",
    title: "Real World Projects",
    level: "Advanced",
    summary: "Apply Tailwind by building portfolios, landing pages, dashboards, ecommerce screens, and SaaS UI.",
    explanation:
      "The best way to learn Tailwind is to build real screens. Start with static HTML or React components, then introduce responsive states, dark mode, variants, extracted components, and production cleanup. Projects reveal where utility-first design feels fast and where component extraction becomes necessary.",
    subtopics: ["Portfolio", "Landing page", "Dashboard", "Ecommerce", "SaaS UI", "Admin panels"],
    goals: [
      "Turn design references into responsive Tailwind pages.",
      "Extract reusable components as patterns appear.",
      "Ship production-ready pages with accessibility and performance checks.",
    ],
    practice: "Build a portfolio, product landing page, admin dashboard, ecommerce store page, and SaaS pricing section.",
    code: `<main className="min-h-screen bg-slate-950 text-white">
  <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr]">
    <div>
      <p className="font-bold uppercase tracking-wider text-cyan-300">SaaS Starter</p>
      <h1 className="mt-4 text-4xl font-black leading-tight">
        Build production UI with Tailwind CSS
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-300">
        Responsive layout, strong spacing, and reusable components.
      </p>
    </div>
    <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-5">
      <p className="text-sm text-cyan-100">Project card</p>
    </div>
  </section>
</main>`,
    notes: [
      "Real pages teach responsive composition better than isolated utilities.",
      "Use components for repeated cards, buttons, fields, and nav items.",
      "Review final pages for mobile layout, keyboard focus, and production bundle size.",
    ],
    resources: 6,
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
  "--page-bg": "#020607",
  "--header-bg": "rgba(2, 6, 7, 0.92)",
  "--panel-bg": "rgba(8, 15, 18, 0.82)",
  "--panel-strong": "rgba(9, 22, 26, 0.95)",
  "--field-bg": "rgba(8, 15, 18, 0.88)",
  "--border": "rgba(34, 211, 238, 0.25)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#cbd5e1",
  "--text-muted": "#94a3b8",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#f0fdff",
  "--header-bg": "rgba(240, 253, 255, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(236, 254, 255, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(8, 145, 178, 0.25)",
  "--text-primary": "#083344",
  "--text-secondary": "#164e63",
  "--text-muted": "#64748b",
  "--shadow": "rgba(8, 51, 68, 0.08)",
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
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(34,211,238,0.24)]">
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
          Demon<span className="text-cyan-400">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function TailwindRoadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0];

  const levelCounts = useMemo(
    () =>
      topics.reduce<Record<Topic["level"], number>>(
        (counts, topic) => ({ ...counts, [topic.level]: counts[topic.level] + 1 }),
        { Beginner: 0, Intermediate: 0, Advanced: 0 },
      ),
    [],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300" style={theme}>
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(6,182,212,0.12),transparent_26%),linear-gradient(180deg,#020607_0%,#041012_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.16),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(6,182,212,0.1),transparent_25%),linear-gradient(180deg,#f0fdff_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-6 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-cyan-400 ${item === "Roadmaps" ? "text-cyan-400" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
                {item}
              </a>
            ))}
          </nav>
          <label className="hidden h-11 w-[230px] items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-4 text-sm text-[var(--text-muted)] xl:flex">
            <Icon className="h-5 w-5" name="search" />
            <span className="flex-1">Search anything...</span>
            <kbd className="rounded border border-[var(--border)] bg-[var(--panel-strong)] px-2 py-0.5 text-xs">K</kbd>
          </label>
          <button
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-cyan-400"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-cyan-400/50 bg-cyan-500 px-5 text-sm font-black text-black shadow-[0_0_28px_rgba(34,211,238,0.28)] transition hover:bg-cyan-300 md:inline-flex"
            href="https://discord.gg/yWtjK2Tb8T"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-5 w-5" name="discord" />
            Join Discord
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-[225px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-68px)] border-r border-[var(--border)] px-5 py-5 lg:block">
          <div className="sticky top-[102px] rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-cyan-400" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-cyan-400"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-cyan-400/25 bg-black/20 p-4">
              <div className="grid h-16 w-full place-items-center rounded-md border border-cyan-400/35 bg-black/40 text-4xl font-black text-cyan-400">
                TW
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Rapid UI. Clean code.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Build responsive websites faster with utility-first CSS.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-8">
          <div className="mx-auto max-w-[1040px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-cyan-400" name="home" />
              <Link className="hover:text-cyan-400" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">Tailwind CSS Roadmap</span>
            </div>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_255px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 bg-cyan-500 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-black">
                  <Icon className="h-4 w-4" name="spark" />
                  Tailwind CSS Learning Roadmap
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                  Tailwind CSS <span className="text-cyan-400">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A documentation-backed Tailwind CSS roadmap from utility-first fundamentals to responsive variants,
                  design tokens, reusable components, performance, accessibility, and real-world projects.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "1-2 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-cyan-400" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[250px] overflow-hidden rounded-lg border border-cyan-400/25 bg-black shadow-[0_0_80px_rgba(34,211,238,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/35 bg-cyan-950/45 shadow-[0_0_60px_rgba(34,211,238,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-cyan-300 drop-shadow-[0_0_28px_rgba(34,211,238,0.7)]">
                  ~
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_255px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-cyan-400/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-cyan-400/65" : "border-[var(--border)] hover:border-cyan-400/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-cyan-300 bg-cyan-500 text-black" : "border-cyan-400 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-lg font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-cyan-400">{topic.level}</span>
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
                            <Icon className="h-4 w-4 text-cyan-400" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-cyan-400" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-5">
                              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Topic Explanation</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{topic.explanation}</p>
                            </div>
                            <div className="mt-5 overflow-hidden rounded-md border border-cyan-400/25 bg-black">
                              <div className="flex items-center justify-between border-b border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Tailwind Code</h3>
                                <span className="rounded border border-cyan-400/25 px-2 py-1 text-xs font-bold text-cyan-200">TW</span>
                              </div>
                              <pre className="max-h-[460px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topic.code}</code>
                              </pre>
                            </div>
                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Code Notes</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.notes.map((note) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={note}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" name="check" />
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                              <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                <Icon className="h-4 w-4 text-cyan-400" name="target" />
                                Practice Task
                              </h3>
                              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{topic.practice}</p>
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-5 xl:sticky xl:top-[104px] xl:self-start">
                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Roadmap Progress</h2>
                  <div className="mt-5 grid place-items-center">
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-cyan-400/25 border-t-cyan-400 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Start with utilities, then build reusable components and design systems.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You&apos;ll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["Tailwind fundamentals", "Utility-first workflow", "Responsive design", "Custom components", "Theming and configuration", "Accessibility", "Real-world projects"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["Tailwind CSS Docs", "https://tailwindcss.com/docs"],
                      ["Tailwind Play", "https://play.tailwindcss.com/"],
                      ["Tailwind UI", "https://tailwindui.com/"],
                      ["Headless UI", "https://headlessui.com/"],
                      ["shadcn/ui", "https://ui.shadcn.com/"],
                      ["tailwind-merge", "https://github.com/dcastil/tailwind-merge"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-cyan-400/45 hover:text-cyan-400" href={href} key={name} rel="noreferrer" target="_blank">
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
