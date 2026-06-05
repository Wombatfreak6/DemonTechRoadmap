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
    id: "intro-sass",
    title: "Introduction to Sass",
    level: "Beginner",
    summary: "Understand Sass as CSS with variables, nesting, mixins, functions, modules, and architecture patterns.",
    explanation:
      "Sass is a CSS preprocessor that compiles into normal browser-compatible CSS. It adds authoring features such as variables, nesting, mixins, functions, control flow, and modules, helping teams write maintainable styles before CSS reaches the browser.",
    subtopics: ["What is Sass", "SCSS syntax", "Sass vs CSS", "Why Sass", "Compilation"],
    goals: [
      "Explain Sass as a build-time extension of CSS.",
      "Understand the difference between Sass syntax and SCSS syntax.",
      "Know which Sass features help maintain large stylesheets.",
    ],
    practice: "Convert a plain CSS file into SCSS and compile it back to CSS.",
    code: `// SCSS syntax looks like CSS plus Sass features.
$brand: #ec4899;
$surface: #111827;

.card {
  background: $surface;
  border: 1px solid rgba($brand, 0.35);
  border-radius: 8px;
  padding: 1.5rem;

  h2 {
    color: $brand;
  }
}`,
    notes: [
      "SCSS is the most common Sass syntax because every valid CSS file is valid SCSS.",
      "Sass has zero runtime cost because it compiles to CSS.",
      "Use Sass when stylesheet architecture and reusable style logic matter.",
    ],
    resources: 4,
  },
  {
    id: "installation-setup",
    title: "Installation & Setup",
    level: "Beginner",
    summary: "Install Dart Sass, set up file structure, compile SCSS, and connect Sass to your workflow.",
    explanation:
      "Modern Sass uses Dart Sass as the primary implementation. You can compile Sass directly from the CLI or through build tools like Vite, Webpack, and framework integrations. A clear file structure makes Sass easier to scale before the stylesheet becomes large.",
    subtopics: ["Dart Sass", "CLI", "Vite", "File structure", "Compile", "Watch mode"],
    goals: [
      "Install Sass locally in a project.",
      "Compile SCSS into CSS from the command line.",
      "Create a maintainable folder structure for styles.",
    ],
    practice: "Set up src/styles/main.scss and compile it to public/styles.css in watch mode.",
    code: `npm install --save-dev sass

# Compile once
npx sass src/styles/main.scss public/styles.css

# Watch for changes
npx sass --watch src/styles/main.scss public/styles.css

// Recommended structure idea
src/styles/
  abstracts/_variables.scss
  abstracts/_mixins.scss
  base/_reset.scss
  components/_button.scss
  pages/_home.scss
  main.scss`,
    notes: [
      "Files beginning with underscore are partials and are not compiled directly.",
      "main.scss is commonly the single entry point that loads other modules.",
      "Prefer Dart Sass; older Node Sass is deprecated.",
    ],
    resources: 4,
  },
  {
    id: "variables",
    title: "Variables & Design Tokens",
    level: "Beginner",
    summary: "Store reusable colors, fonts, spacing, breakpoints, and design tokens with Sass variables.",
    explanation:
      "Sass variables use the dollar-sign prefix and are resolved at compile time. They are ideal for values that do not need to change in the browser, such as design tokens, breakpoint values, font stacks, and shared spacing constants.",
    subtopics: ["$variables", "defaults", "scope", "tokens", "CSS custom properties"],
    goals: [
      "Use variables for repeated design values.",
      "Understand compile-time Sass variables versus runtime CSS custom properties.",
      "Organize tokens by category.",
    ],
    practice: "Create color, spacing, font, and breakpoint variables for a small design system.",
    code: `// abstracts/_tokens.scss
$color-primary: #ec4899 !default;
$color-surface: #111827 !default;
$font-sans: Inter, system-ui, sans-serif;
$space-4: 1rem;
$radius-md: 8px;

.button {
  font-family: $font-sans;
  padding: $space-4;
  border-radius: $radius-md;
  color: white;
  background: $color-primary;
}

// CSS variables are better when values must change at runtime.
:root {
  --color-accent: #ec4899;
}`,
    notes: [
      "!default lets consumers override a variable before loading a module.",
      "Sass variables disappear after compilation; CSS custom properties remain in the browser.",
      "Use semantic token names when values represent product meaning.",
    ],
    resources: 5,
  },
  {
    id: "nesting",
    title: "Nesting & Parent Selector",
    level: "Beginner",
    summary: "Write nested styles, use the parent selector, and avoid over-nesting.",
    explanation:
      "Nesting lets you write styles that mirror component structure. The parent selector, &, references the current selector and is essential for pseudo-classes, modifiers, BEM naming, and nested media queries. The danger is over-nesting, which creates overly specific selectors.",
    subtopics: ["Basic nesting", "& selector", "BEM modifiers", "Pseudo-classes", "Media queries"],
    goals: [
      "Use nesting to group related component styles.",
      "Use & for hover states, modifiers, and pseudo-elements.",
      "Avoid deep selectors that become hard to override.",
    ],
    practice: "Write a card component with nested title, body, hover state, and featured modifier.",
    code: `.card {
  padding: 1.5rem;
  border: 1px solid #334155;
  border-radius: 8px;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &:hover {
    border-color: #ec4899;
  }

  &--featured {
    box-shadow: 0 20px 60px rgba(236, 72, 153, 0.25);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
}`,
    notes: [
      "Keep nesting shallow; two or three levels is usually enough.",
      "&--featured compiles to .card--featured.",
      "Nested media queries keep responsive rules close to the component.",
    ],
    resources: 5,
  },
  {
    id: "modules-partials",
    title: "Partials, @use & @forward",
    level: "Intermediate",
    summary: "Split Sass into modules, load members with @use, re-export modules with @forward, and avoid global leaking.",
    explanation:
      "The modern Sass module system replaces older @import patterns. @use loads a file as a module and namespaces its variables, mixins, and functions. @forward re-exports modules from an index file, making a clean public API for your styles.",
    subtopics: ["Partials", "@use", "@forward", "Namespaces", "Private members", "Index files"],
    goals: [
      "Use @use instead of legacy @import.",
      "Create index files that forward design tokens and helpers.",
      "Understand namespacing and private members.",
    ],
    practice: "Create abstracts/_index.scss that forwards variables, mixins, and functions, then use it in main.scss.",
    code: `// abstracts/_colors.scss
$brand: #ec4899;
$surface: #111827;
$_internal-debug-color: red; // private member

// abstracts/_index.scss
@forward "colors";
@forward "mixins";

// main.scss
@use "abstracts" as a;

.button {
  background: a.$brand;
  color: white;
}`,
    notes: [
      "@use loads a module once and namespaces members by default.",
      "Members starting with - or _ are private to the module.",
      "@forward helps create a single entry point for related style utilities.",
    ],
    resources: 6,
  },
  {
    id: "mixins",
    title: "Mixins",
    level: "Intermediate",
    summary: "Create reusable CSS blocks with arguments, default values, content blocks, and variable arguments.",
    explanation:
      "Mixins output CSS declarations or rule blocks wherever they are included. They are best for repeated patterns that need parameters, such as media queries, flex centering, visually hidden styles, or button variants. @content lets a mixin wrap a block of styles.",
    subtopics: ["@mixin", "@include", "Arguments", "Defaults", "@content", "Variadic mixins"],
    goals: [
      "Create mixins for repeated style patterns.",
      "Pass arguments and default values to mixins.",
      "Use @content for wrapper patterns like media queries.",
    ],
    practice: "Create mixins for flex centering, responsive breakpoints, and focus rings.",
    code: `@mixin flex-center($gap: 0) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $gap;
}

@mixin respond($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.toolbar {
  @include flex-center(1rem);

  @include respond(768px) {
    justify-content: space-between;
  }
}`,
    notes: [
      "Mixins duplicate CSS output, so avoid including huge mixins everywhere.",
      "@content acts like a slot for nested styles.",
      "Use mixins for behavior-like patterns, not every small declaration.",
    ],
    resources: 6,
  },
  {
    id: "functions-modules",
    title: "Functions & Built-in Modules",
    level: "Intermediate",
    summary: "Write custom functions and use Sass built-in modules like sass:math, sass:color, sass:list, and sass:map.",
    explanation:
      "Sass functions compute and return values. Unlike mixins, they cannot output full CSS rules. They are useful for unit conversion, design token lookups, color manipulation, and calculations. Built-in modules provide safer, namespaced helpers.",
    subtopics: ["@function", "sass:math", "sass:color", "sass:map", "Return values", "Calculations"],
    goals: [
      "Write functions that return CSS values.",
      "Use built-in modules instead of old global functions.",
      "Store and retrieve design tokens with maps.",
    ],
    practice: "Write a rem() function and a color-token() function backed by a Sass map.",
    code: `@use "sass:math";
@use "sass:map";
@use "sass:color";

@function rem($pixels, $base: 16) {
  @return math.div($pixels, $base) * 1rem;
}

$colors: (
  "primary": #ec4899,
  "surface": #111827,
);

@function color-token($name) {
  @return map.get($colors, $name);
}

.title {
  font-size: rem(32);
  color: color.adjust(color-token("primary"), $lightness: 8%);
}`,
    notes: [
      "Use math.div instead of slash division.",
      "Functions should return values, not blocks of CSS.",
      "Maps are powerful for design token systems.",
    ],
    resources: 7,
  },
  {
    id: "extend-placeholders",
    title: "Extend & Placeholders",
    level: "Intermediate",
    summary: "Share common rule sets with @extend and placeholder selectors while avoiding selector bloat.",
    explanation:
      "@extend merges selectors that share the same declarations. Placeholder selectors start with % and do not appear in the compiled CSS unless extended. This is useful for shared abstract patterns, but mixins are often clearer when you need parameters or predictable output.",
    subtopics: ["@extend", "%placeholder", "Selector merging", "Extend vs mixin", "Best practices"],
    goals: [
      "Use placeholders for shared abstract rule sets.",
      "Know when @extend is appropriate.",
      "Avoid surprising selector output from excessive extends.",
    ],
    practice: "Create shared placeholders for alerts and extend them into success, warning, and error alerts.",
    code: `%alert-base {
  border-radius: 8px;
  padding: 1rem;
  font-weight: 700;
}

.alert-success {
  @extend %alert-base;
  background: #dcfce7;
  color: #166534;
}

.alert-error {
  @extend %alert-base;
  background: #fee2e2;
  color: #991b1b;
}`,
    notes: [
      "Placeholders do not emit CSS unless extended.",
      "Use mixins when the shared pattern needs arguments.",
      "@extend can create complex merged selectors, so inspect compiled CSS.",
    ],
    resources: 4,
  },
  {
    id: "control-flow",
    title: "Control Directives & Operators",
    level: "Advanced",
    summary: "Use @if, @for, @each, @while, @error, @warn, @debug, and Sass operators for programmatic CSS.",
    explanation:
      "Control directives let Sass generate repetitive CSS from data. They are useful for utility classes, theme variants, spacing scales, and design token outputs. Error and warning directives make your Sass APIs safer by catching invalid usage during compilation.",
    subtopics: ["@if", "@for", "@each", "@while", "@error", "@warn", "operators"],
    goals: [
      "Generate classes from lists and maps.",
      "Use @if and @error to validate mixin arguments.",
      "Understand arithmetic, comparison, boolean, and string operators.",
    ],
    practice: "Generate spacing utility classes from a Sass map and throw an error for invalid tokens.",
    code: `$spaces: (
  "1": 0.25rem,
  "2": 0.5rem,
  "4": 1rem,
  "8": 2rem,
);

@each $name, $value in $spaces {
  .p-#{$name} {
    padding: $value;
  }

  .mt-#{$name} {
    margin-top: $value;
  }
}

@mixin theme($mode) {
  @if $mode == "dark" {
    background: #111827;
    color: white;
  } @else if $mode == "light" {
    background: white;
    color: #111827;
  } @else {
    @error "Unknown theme: #{$mode}";
  }
}`,
    notes: [
      "Interpolation with #{} inserts Sass values into selectors or strings.",
      "@each is ideal for maps and design token loops.",
      "@error stops compilation and makes invalid usage obvious.",
    ],
    resources: 6,
  },
  {
    id: "architecture",
    title: "Architecture & 7-1 Pattern",
    level: "Advanced",
    summary: "Organize Sass with the 7-1 pattern, main entry files, module boundaries, and scalable folder structure.",
    explanation:
      "Sass becomes most valuable in medium and large stylesheets when architecture matters. The 7-1 pattern organizes styles into abstracts, base, components, layout, pages, themes, vendors, and one main entry file. Modern @use and @forward make this structure safer than old global @import.",
    subtopics: ["7-1 pattern", "main.scss", "abstracts", "components", "layout", "themes", "vendors"],
    goals: [
      "Structure Sass files for growth.",
      "Use a main entry file that loads modules in a clear order.",
      "Keep tokens, mixins, base styles, components, and page styles separate.",
    ],
    practice: "Refactor a single large SCSS file into the 7-1 architecture with a main.scss entry point.",
    code: `styles/
  abstracts/
    _index.scss
    _tokens.scss
    _mixins.scss
    _functions.scss
  base/
    _reset.scss
    _typography.scss
  components/
    _button.scss
    _card.scss
  layout/
    _header.scss
    _footer.scss
  pages/
    _home.scss
  themes/
    _dark.scss
  vendors/
    _normalize.scss
  main.scss

// main.scss
@use "abstracts";
@use "base/reset";
@use "base/typography";
@use "components/button";
@use "components/card";`,
    notes: [
      "Not every small project needs all seven folders.",
      "Architecture should help people find styles quickly.",
      "Keep abstracts free of CSS output where possible.",
    ],
    resources: 7,
  },
  {
    id: "real-world-components",
    title: "Design Tokens & Real Components",
    level: "Advanced",
    summary: "Build real component styles using Sass maps, modules, mixins, functions, and clean component boundaries.",
    explanation:
      "Real Sass projects combine several features: maps for design tokens, mixins for patterns, functions for calculations, modules for organization, and components for reusable UI. The goal is not to use every feature everywhere, but to create maintainable CSS that scales with the product.",
    subtopics: ["Design tokens", "Sass maps", "Components", "Buttons", "Cards", "Themes"],
    goals: [
      "Build reusable components backed by design tokens.",
      "Use maps and functions for consistent token access.",
      "Create component APIs with modifiers and states.",
    ],
    practice: "Build a button and card system with size, variant, theme, and responsive behavior.",
    code: `@use "sass:map";

$button-variants: (
  "primary": (
    "bg": #ec4899,
    "text": white,
  ),
  "ghost": (
    "bg": transparent,
    "text": #ec4899,
  ),
);

.button {
  border: 0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-weight: 700;

  @each $name, $tokens in $button-variants {
    &--#{$name} {
      background: map.get($tokens, "bg");
      color: map.get($tokens, "text");
    }
  }
}`,
    notes: [
      "Maps make component variants data-driven.",
      "BEM-style modifiers pair naturally with Sass nesting.",
      "Inspect compiled CSS to make sure abstractions stay efficient.",
    ],
    resources: 5,
  },
  {
    id: "best-practices",
    title: "Best Practices & Common Mistakes",
    level: "Advanced",
    summary: "Write clean Sass by avoiding over-nesting, legacy @import, global leaks, giant mixins, and unclear architecture.",
    explanation:
      "Sass can make CSS cleaner, but it can also hide complexity if misused. The best Sass code keeps nesting shallow, prefers @use over @import, avoids massive mixins, limits @extend, and organizes files around clear ownership. Treat Sass as a maintainability tool, not a way to make CSS overly clever.",
    subtopics: ["@use over @import", "Over-nesting", "Specificity", "Linting", "Compiled CSS", "Maintainability"],
    goals: [
      "Identify and fix common Sass anti-patterns.",
      "Keep compiled CSS predictable and efficient.",
      "Use linting and formatting tools for consistency.",
    ],
    practice: "Audit a Sass file for over-nesting, duplicate tokens, global imports, and oversized mixins.",
    code: `// Avoid deep nesting:
.page {
  .section {
    .card {
      .title {
        span {
          color: #ec4899;
        }
      }
    }
  }
}

// Prefer flatter component selectors:
.card-title-highlight {
  color: #ec4899;
}

// Prefer @use:
@use "abstracts/tokens" as tokens;

.card {
  color: tokens.$color-primary;
}`,
    notes: [
      "Deep nesting creates high specificity and brittle CSS.",
      "Legacy @import can leak globals and duplicate output.",
      "Stylelint with stylelint-scss helps enforce project conventions.",
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
  "--page-bg": "#070206",
  "--header-bg": "rgba(7, 2, 6, 0.92)",
  "--panel-bg": "rgba(16, 8, 14, 0.82)",
  "--panel-strong": "rgba(28, 12, 23, 0.95)",
  "--field-bg": "rgba(16, 8, 14, 0.88)",
  "--border": "rgba(236, 72, 153, 0.26)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#d4d4d8",
  "--text-muted": "#a1a1aa",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#fff5fb",
  "--header-bg": "rgba(255, 245, 251, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(253, 242, 248, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(219, 39, 119, 0.24)",
  "--text-primary": "#500724",
  "--text-secondary": "#831843",
  "--text-muted": "#71717a",
  "--shadow": "rgba(80, 7, 36, 0.08)",
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
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(236,72,153,0.24)]">
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
          Demon<span className="text-pink-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function SassRoadmap() {
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
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(236,72,153,0.2),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(219,39,119,0.12),transparent_26%),linear-gradient(180deg,#070206_0%,#0c0409_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(244,114,182,0.16),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(219,39,119,0.1),transparent_25%),linear-gradient(180deg,#fff5fb_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center gap-8 px-5 lg:px-8">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-pink-500 ${item === "Roadmaps" ? "text-pink-500" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
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
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-pink-500"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-pink-500/50 bg-pink-600 px-5 text-sm font-black text-white shadow-[0_0_28px_rgba(236,72,153,0.28)] transition hover:bg-pink-500 md:inline-flex"
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-500">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-pink-500" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-pink-500">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-pink-500"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-pink-500/25 bg-black/20 p-4">
              <div className="grid h-20 w-full place-items-center rounded-md border border-pink-500/35 bg-black/40 text-4xl font-black text-pink-500">
                Sass
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Write less. Style more.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">The mature way to extend CSS with maintainable patterns.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-pink-500" name="home" />
              <Link className="hover:text-pink-500" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">Sass Roadmap</span>
            </div>

            <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-pink-500/40 bg-pink-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  <Icon className="h-4 w-4" name="spark" />
                  Sass / SCSS Complete Documentation
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  Sass <span className="text-pink-500">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A documentation-backed Sass roadmap from SCSS basics and variables to modules,
                  mixins, functions, placeholders, control directives, architecture, and real components.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "1-2 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-pink-500" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-pink-500/25 bg-black shadow-[0_0_80px_rgba(236,72,153,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/35 bg-pink-950/45 shadow-[0_0_60px_rgba(236,72,153,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-pink-400 drop-shadow-[0_0_28px_rgba(236,72,153,0.7)]">
                  Sass
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-pink-500/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-pink-500/65" : "border-[var(--border)] hover:border-pink-500/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-pink-400 bg-pink-600 text-white" : "border-pink-500 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-xl font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-pink-500">{topic.level}</span>
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
                            <Icon className="h-4 w-4 text-pink-500" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-pink-500" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-5">
                              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">Topic Explanation</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{topic.explanation}</p>
                            </div>
                            <div className="mt-5 overflow-hidden rounded-md border border-pink-500/25 bg-black">
                              <div className="flex items-center justify-between border-b border-pink-500/20 bg-pink-500/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">SCSS Code</h3>
                                <span className="rounded border border-pink-500/25 px-2 py-1 text-xs font-bold text-pink-300">SCSS</span>
                              </div>
                              <pre className="max-h-[460px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topic.code}</code>
                              </pre>
                            </div>
                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">Code Notes</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.notes.map((note) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={note}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" name="check" />
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                              <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                <Icon className="h-4 w-4 text-pink-500" name="target" />
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
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-pink-500/25 border-t-pink-500 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Start with variables, then build toward modules and architecture.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You&apos;ll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["Sass fundamentals", "Variables and tokens", "Nesting and partials", "Mixins and functions", "Control directives", "Architecture patterns", "Best practices"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["Sass Official Docs", "https://sass-lang.com/documentation/"],
                      ["Sass Playground", "https://sass-lang.com/playground/"],
                      ["Sass Guidelines", "https://sass-guidelin.es/"],
                      ["Sass GitHub", "https://github.com/sass/dart-sass"],
                      ["CSS Tricks Sass", "https://css-tricks.com/sass-style-guide/"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-pink-500/45 hover:text-pink-500" href={href} key={name} rel="noreferrer" target="_blank">
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
