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
  subtopics: string[];
  goals: string[];
  practice: string[];
  command: string;
  resources: number;
};

const navItems = ["Roadmaps", "Resources", "Guides", "Docs", "Community"];

const topics: Topic[] = [
  {
    id: "intro-git",
    title: "Introduction to Git",
    level: "Beginner",
    summary: "Understand distributed version control, why Git matters, and how it tracks project history.",
    subtopics: ["Version control", "History", "Distributed VCS", "Why Git", "Terminology"],
    goals: [
      "Explain why teams use Git for collaboration and rollback safety.",
      "Describe repositories, commits, branches, remotes, and HEAD.",
      "Understand why Git works offline and syncs later.",
    ],
    practice: ["Compare Git with manual file copies.", "Inspect a repository history.", "Write definitions for common Git terms."],
    command: `git --version
git help
git help commit`,
    resources: 4,
  },
  {
    id: "setup-config",
    title: "Installing & Configuring Git",
    level: "Beginner",
    summary: "Install Git, set your identity, choose defaults, and understand config levels.",
    subtopics: ["Install Git", "User name", "Email", "Default branch", "Config scopes"],
    goals: [
      "Set global name and email before your first commit.",
      "Know system, global, and local config scopes.",
      "Choose a default branch name and editor.",
    ],
    practice: ["Install Git locally.", "Configure name and email.", "List your current Git config."],
    command: `git config --global user.name "Rishi Bhardwaj"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --list`,
    resources: 5,
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    level: "Beginner",
    summary: "Learn repositories, the working directory, staging area, commits, and the three-stage lifecycle.",
    subtopics: ["Repository", "Working tree", "Staging area", "Commit", ".gitignore"],
    goals: [
      "Separate modified, staged, and committed states.",
      "Use .gitignore to avoid committing generated files.",
      "Read git status and understand what Git is telling you.",
    ],
    practice: ["Create a repository from scratch.", "Stage only selected files.", "Write a useful .gitignore file."],
    command: `git init
git status
git add README.md
git commit -m "Add project README"`,
    resources: 6,
  },
  {
    id: "daily-commands",
    title: "Essential Daily Commands",
    level: "Beginner",
    summary: "Use the commands you will run every day: status, add, commit, diff, log, and ignore.",
    subtopics: ["status", "add", "commit", "diff", "log", "ignore"],
    goals: [
      "Review changes before committing.",
      "Create small commits with clear messages.",
      "Read a compact project history.",
    ],
    practice: ["Make three small commits.", "Compare unstaged and staged diffs.", "Rewrite vague commit messages before committing."],
    command: `git status
git diff
git diff --staged
git add .
git commit -m "Add roadmap card"
git log --oneline --graph --decorate`,
    resources: 5,
  },
  {
    id: "branching-merging",
    title: "Branching & Merging",
    level: "Intermediate",
    summary: "Create branches, switch work safely, merge changes, and resolve conflicts.",
    subtopics: ["branch", "switch", "merge", "fast-forward", "conflicts", "delete branches"],
    goals: [
      "Work on multiple features without mixing changes.",
      "Choose between fast-forward and merge commits.",
      "Resolve conflicts by editing marked files and completing the merge.",
    ],
    practice: ["Create a feature branch and merge it.", "Create a conflict intentionally.", "Delete merged and unmerged branches."],
    command: `git switch -c feature/git-roadmap
git branch
git switch main
git merge --no-ff feature/git-roadmap
git branch -d feature/git-roadmap`,
    resources: 7,
  },
  {
    id: "remote-repositories",
    title: "Remote Repositories",
    level: "Intermediate",
    summary: "Connect local repositories to GitHub or GitLab, then push, pull, fetch, and clone work.",
    subtopics: ["remote", "origin", "push", "pull", "fetch", "clone"],
    goals: [
      "Add and inspect remotes.",
      "Understand fetch versus pull.",
      "Push local branches and track remote branches.",
    ],
    practice: ["Clone a repository.", "Add an origin remote.", "Push a branch and open it on GitHub."],
    command: `git remote -v
git remote add origin https://github.com/user/project.git
git push -u origin main
git fetch origin
git pull --rebase origin main`,
    resources: 6,
  },
  {
    id: "undoing-changes",
    title: "Undoing Changes",
    level: "Intermediate",
    summary: "Use restore, reset, revert, clean, and stash without losing work accidentally.",
    subtopics: ["restore", "reset", "revert", "stash", "clean", "safety"],
    goals: [
      "Choose revert for shared history and reset for local cleanup.",
      "Use stash to switch context without committing unfinished work.",
      "Recover safely instead of deleting changes blindly.",
    ],
    practice: ["Stash local edits and reapply them.", "Revert a commit.", "Reset a local throwaway commit."],
    command: `git restore app.js
git restore --staged app.js
git revert HEAD
git stash push -m "WIP navbar"
git stash pop`,
    resources: 6,
  },
  {
    id: "collaboration",
    title: "Collaboration Workflow",
    level: "Intermediate",
    summary: "Use pull requests, code review, protected branches, and team-friendly commit habits.",
    subtopics: ["Pull requests", "Code review", "Protected branches", "CI checks", "Commit messages"],
    goals: [
      "Keep PRs small and reviewable.",
      "Write descriptions that explain what changed, why, and how to test.",
      "Protect main with reviews and required status checks.",
    ],
    practice: ["Open a draft PR.", "Self-review a diff.", "Write a Conventional Commit message."],
    command: `git switch -c feature/navbar
git add .
git commit -m "feat: add responsive navbar"
git push -u origin feature/navbar`,
    resources: 5,
  },
  {
    id: "advanced-history",
    title: "Advanced History Tools",
    level: "Advanced",
    summary: "Clean and inspect history with interactive rebase, cherry-pick, reflog, bisect, and advanced log.",
    subtopics: ["rebase -i", "cherry-pick", "reflog", "bisect", "advanced log"],
    goals: [
      "Use interactive rebase to edit, reorder, squash, or drop local commits.",
      "Cherry-pick a specific commit without merging a whole branch.",
      "Recover lost commits with reflog and find bugs with bisect.",
    ],
    practice: ["Squash three local commits.", "Cherry-pick a fix commit.", "Use bisect on a fake bug history."],
    command: `git rebase -i HEAD~3
git cherry-pick abc1234
git reflog
git bisect start
git bisect bad
git bisect good v1.0.0`,
    resources: 7,
  },
  {
    id: "workflows",
    title: "Team Workflows",
    level: "Advanced",
    summary: "Compare Git Flow, trunk-based development, release branches, feature flags, and CI/CD-friendly habits.",
    subtopics: ["Git Flow", "Trunk-based", "Feature flags", "Release branches", "CI/CD"],
    goals: [
      "Know when Git Flow fits versioned releases.",
      "Understand why modern SaaS teams prefer short-lived branches.",
      "Use feature flags to merge incomplete work safely.",
    ],
    practice: ["Sketch a branch strategy for a team.", "Convert a long branch into smaller PRs.", "Document merge rules."],
    command: `git switch main
git pull --rebase
git switch -c feature/small-change
git commit -m "feat: ship small reviewed change"`,
    resources: 5,
  },
  {
    id: "power-features",
    title: "Power Features",
    level: "Advanced",
    summary: "Use tags, hooks, submodules, worktrees, internals, and advanced configuration when projects grow.",
    subtopics: ["Tags", "Hooks", "Submodules", "Worktrees", "Internals", "Config"],
    goals: [
      "Mark releases with tags.",
      "Automate checks with hooks.",
      "Use worktrees to check out multiple branches at once.",
    ],
    practice: ["Create an annotated tag.", "Add a pre-commit hook.", "Open a second branch with worktree."],
    command: `git tag -a v1.0.0 -m "Release v1.0.0"
git worktree add ../project-hotfix hotfix/login
git submodule add https://github.com/user/theme.git themes/theme
git cat-file -p HEAD`,
    resources: 7,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting & Recovery",
    level: "Advanced",
    summary: "Solve merge conflicts, detached HEAD, lost commits, bad pulls, broken branches, and recovery scenarios.",
    subtopics: ["Merge conflicts", "Detached HEAD", "Lost commits", "Recovery", "Debugging"],
    goals: [
      "Read Git error messages calmly and identify the current state.",
      "Use status, log, and reflog before taking destructive action.",
      "Recover from common mistakes with minimal data loss.",
    ],
    practice: ["Recover a commit with reflog.", "Fix a detached HEAD state.", "Abort a failed merge safely."],
    command: `git status
git merge --abort
git rebase --abort
git reflog
git switch main
git switch -c recovered-work HEAD@{1}`,
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
  "--page-bg": "#030303",
  "--header-bg": "rgba(3, 3, 3, 0.92)",
  "--panel-bg": "rgba(10, 10, 10, 0.82)",
  "--panel-strong": "rgba(18, 13, 9, 0.95)",
  "--field-bg": "rgba(12, 10, 8, 0.88)",
  "--border": "rgba(249, 115, 22, 0.24)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#d4d4d8",
  "--text-muted": "#a1a1aa",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#fff7ed",
  "--header-bg": "rgba(255, 247, 237, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(255, 251, 235, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(234, 88, 12, 0.24)",
  "--text-primary": "#1c1917",
  "--text-secondary": "#44403c",
  "--text-muted": "#78716c",
  "--shadow": "rgba(67, 20, 7, 0.08)",
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
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(249,115,22,0.24)]">
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
          Demon<span className="text-orange-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function GitRoadmap() {
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
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(249,115,22,0.2),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(234,88,12,0.12),transparent_26%),linear-gradient(180deg,#020202_0%,#050505_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(251,146,60,0.18),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(249,115,22,0.1),transparent_25%),linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center gap-8 px-5 lg:px-8">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-orange-500 ${item === "Roadmaps" ? "text-orange-500" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
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
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-orange-500"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-orange-500/50 bg-orange-600 px-5 text-sm font-black text-white shadow-[0_0_28px_rgba(249,115,22,0.28)] transition hover:bg-orange-500 md:inline-flex"
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-orange-500" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-orange-500">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-orange-500"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-orange-500/25 bg-black/20 p-4">
              <div className="grid h-20 w-full place-items-center rounded-md border border-orange-500/35 bg-black/40 text-4xl font-black text-orange-500">
                Git
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Version control your success.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Learn Git, collaborate with teams, and ship with confidence.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-orange-500" name="home" />
              <Link className="hover:text-orange-500" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">Git Roadmap</span>
            </div>

            <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-orange-500/40 bg-orange-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  <Icon className="h-4 w-4" name="spark" />
                  Git Complete Documentation 2026
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  Git <span className="text-orange-500">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A documentation-backed Git roadmap from first commit to expert workflows: branches,
                  remotes, pull requests, history cleanup, hooks, worktrees, reflog, bisect, and recovery.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "2-4 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-orange-500" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-orange-500/25 bg-black shadow-[0_0_80px_rgba(249,115,22,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/35 bg-black/80 shadow-[0_0_60px_rgba(249,115,22,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-orange-500 drop-shadow-[0_0_28px_rgba(249,115,22,0.7)]">
                  Git
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-orange-500/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-orange-500/65" : "border-[var(--border)] hover:border-orange-500/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-orange-400 bg-orange-600 text-white" : "border-orange-500 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-xl font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-orange-500">{topic.level}</span>
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
                            <Icon className="h-4 w-4 text-orange-500" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-orange-500" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 overflow-hidden rounded-md border border-orange-500/25 bg-black">
                              <div className="flex items-center justify-between border-b border-orange-500/20 bg-orange-500/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-orange-500">Git Commands</h3>
                                <span className="rounded border border-orange-500/25 px-2 py-1 text-xs font-bold text-orange-300">CLI</span>
                              </div>
                              <pre className="max-h-[420px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topic.command}</code>
                              </pre>
                            </div>

                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-orange-500">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-orange-500">Practice Projects</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.practice.map((task) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={task}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" name="target" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                              </div>
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
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-orange-500/25 border-t-orange-500 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Start with daily commands, then master branches, remotes, and recovery.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You'll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["Git fundamentals", "Version control concepts", "Branching and merging", "Remote repositories", "Pull request workflow", "Advanced history tools", "Troubleshooting recovery"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["Git Official Docs", "https://git-scm.com/docs"],
                      ["Pro Git Book", "https://git-scm.com/book"],
                      ["GitHub Docs", "https://docs.github.com/"],
                      ["Learn Git Branching", "https://learngitbranching.js.org/"],
                      ["Conventional Commits", "https://www.conventionalcommits.org/"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-orange-500/45 hover:text-orange-500" href={href} key={name} rel="noreferrer" target="_blank">
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
