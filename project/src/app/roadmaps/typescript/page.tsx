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
    id: "intro-setup",
    title: "Introduction & Setup",
    level: "Beginner",
    summary: "Understand why TypeScript exists, install it, and configure a strict project.",
    explanation:
      "TypeScript is JavaScript with a static type system layered on top. It catches many mistakes before runtime, gives editors better autocomplete and refactoring, and makes large codebases easier to change. Since TypeScript compiles to plain JavaScript, the runtime is still the same JavaScript environment you already know.",
    subtopics: ["Why TypeScript", "Installation", "tsconfig.json", "strict mode", "Compilation"],
    goals: [
      "Explain TypeScript as a typed superset of JavaScript.",
      "Install TypeScript locally and compile a file.",
      "Enable strict mode before building real projects.",
    ],
    practice: "Create a new TypeScript project with src and dist folders, then compile a hello.ts file.",
    code: `npm install --save-dev typescript
npx tsc --init

// hello.ts
const language: string = "TypeScript";
const year: number = 2012;

console.log(language + " was released in " + year);

// tsconfig.json essentials
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "sourceMap": true
  }
}`,
    notes: [
      "Install TypeScript as a dev dependency so each project controls its compiler version.",
      "strict enables the checks that make TypeScript valuable.",
      "TypeScript checks types at build time; it does not add runtime validation automatically.",
    ],
    resources: 5,
  },
  {
    id: "primitive-core-types",
    title: "Primitive & Core Types",
    level: "Beginner",
    summary: "Use primitive types, arrays, tuples, objects, unions, intersections, and special types.",
    explanation:
      "The first skill in TypeScript is describing values accurately. Start with primitives and inference, then move into arrays, tuples, object shapes, unions, and intersections. Good types should document intent without adding noise where TypeScript can infer the obvious.",
    subtopics: ["string", "number", "boolean", "arrays", "tuples", "unions", "unknown"],
    goals: [
      "Use inference when the value makes the type obvious.",
      "Model lists with arrays and fixed positions with tuples.",
      "Choose unknown over any when input really is unknown.",
    ],
    practice: "Model a course catalog with primitive fields, tags, tuple coordinates, and nullable values.",
    code: `let title = "TypeScript Roadmap"; // inferred as string
let lessons: number = 12;
let published: boolean = true;

const tags: string[] = ["types", "generics", "react"];
const point: [x: number, y: number] = [10, 20];

type CourseId = string | number;
type PublishedCourse = {
  id: CourseId;
  title: string;
  tags: string[];
  metadata?: Record<string, string>;
};

function parseInput(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  return String(value);
}`,
    notes: [
      "Use type annotations for function boundaries and complex objects.",
      "unknown forces you to narrow before using a value.",
      "Record<string, string> describes an object with dynamic string keys and string values.",
    ],
    resources: 7,
  },
  {
    id: "functions",
    title: "Functions",
    level: "Beginner",
    summary: "Type parameters, return values, callbacks, optional/default parameters, rest parameters, void, and never.",
    explanation:
      "Functions are where TypeScript becomes practical because they define contracts between pieces of code. A good function signature tells callers what values are accepted, what comes back, and which cases are optional. This makes refactoring safer and reduces guesswork.",
    subtopics: ["Parameters", "Return types", "Callbacks", "Optional params", "Rest params", "void", "never"],
    goals: [
      "Write clear function type expressions.",
      "Use optional and default parameters safely.",
      "Understand void for side effects and never for impossible returns.",
    ],
    practice: "Build typed helpers for formatting prices, filtering courses, and logging events.",
    code: `type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

type CourseFilter = (course: Course) => boolean;

function filterCourses(courses: Course[], filter: CourseFilter): Course[] {
  return courses.filter(filter);
}

function formatPrice(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
}

function logMessage(message: string): void {
  console.log(message);
}

function fail(message: string): never {
  throw new Error(message);
}`,
    notes: [
      "Type callback parameters so callers know what your function will pass in.",
      "Default parameters do not need a separate optional marker.",
      "never is useful for functions that always throw and for exhaustive checks.",
    ],
    resources: 6,
  },
  {
    id: "objects-types",
    title: "Objects, Type Aliases & Interfaces",
    level: "Intermediate",
    summary: "Model object shapes with type aliases, interfaces, optional fields, readonly fields, and index signatures.",
    explanation:
      "Most application data is object-shaped: users, products, settings, API responses, and component props. Type aliases and interfaces both describe those shapes. Interfaces are excellent for public object contracts and extension; type aliases are stronger for unions, intersections, and type transformations.",
    subtopics: ["type aliases", "interfaces", "optional properties", "readonly", "index signatures", "extension"],
    goals: [
      "Know when to use type and when to use interface.",
      "Use readonly to protect values that should not change.",
      "Model dynamic keys with index signatures or Record.",
    ],
    practice: "Create User, AdminUser, Settings, and ApiResponse types for a dashboard app.",
    code: `interface User {
  readonly id: string;
  name: string;
  email?: string;
  createdAt: Date;
}

interface AdminUser extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

type Theme = "light" | "dark" | "system";

type Settings = {
  theme: Theme;
  shortcuts: Record<string, string>;
};

type ApiResponse<T> = {
  data: T;
  error: string | null;
};`,
    notes: [
      "Optional properties are not the same as properties that always exist but can be undefined.",
      "Record is a clean way to type key-value maps.",
      "Generic response wrappers reduce duplication across API types.",
    ],
    resources: 7,
  },
  {
    id: "classes-oop",
    title: "Classes & Object-Oriented TypeScript",
    level: "Intermediate",
    summary: "Use classes with access modifiers, readonly properties, getters, setters, inheritance, and abstract classes.",
    explanation:
      "TypeScript adds type checking to JavaScript classes. Access modifiers like public, private, and protected describe how class members should be used. Classes are useful when you need instances with state and behavior, while interfaces can describe the contract those classes satisfy.",
    subtopics: ["Classes", "public/private/protected", "readonly", "getters", "inheritance", "abstract classes"],
    goals: [
      "Use constructor parameter properties to reduce boilerplate.",
      "Protect internal state with private fields.",
      "Create abstract base classes when subclasses share behavior.",
    ],
    practice: "Build Course, PaidCourse, and CourseRepository classes with typed methods.",
    code: `abstract class ContentItem {
  constructor(
    public readonly id: string,
    public title: string,
  ) {}

  abstract getSummary(): string;
}

class Course extends ContentItem {
  private enrolledCount = 0;

  constructor(id: string, title: string, public level: string) {
    super(id, title);
  }

  enroll(): void {
    this.enrolledCount += 1;
  }

  get students(): number {
    return this.enrolledCount;
  }

  getSummary(): string {
    return this.title + " - " + this.level;
  }
}`,
    notes: [
      "Constructor parameter properties create and assign class fields automatically.",
      "private is checked by TypeScript and helps prevent accidental misuse.",
      "Abstract classes can contain shared implementation plus required methods.",
    ],
    resources: 6,
  },
  {
    id: "advanced-types",
    title: "Advanced Types & Narrowing",
    level: "Advanced",
    summary: "Master literal types, type guards, discriminated unions, exhaustiveness checks, conditional types, and infer.",
    explanation:
      "Advanced TypeScript is about teaching the compiler exactly which case you are handling. Narrowing turns broad unions into specific types inside branches. Discriminated unions make complex state machines safe because every variant has a clear tag.",
    subtopics: ["literal types", "type guards", "discriminated unions", "never", "conditional types", "infer"],
    goals: [
      "Use type guards to narrow unknown or union values.",
      "Model UI and API states as discriminated unions.",
      "Use never to catch missing cases.",
    ],
    practice: "Model loading, success, and error states for a course API and render each case safely.",
    code: `type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(value));
}

function renderState(state: LoadState<string[]>): string {
  switch (state.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return state.data.join(", ");
    case "error":
      return state.message;
    default:
      return assertNever(state);
  }
}

type UnwrapPromise<T> = T extends Promise<infer Value> ? Value : T;
type Result = UnwrapPromise<Promise<string>>; // string`,
    notes: [
      "The status field is the discriminant that tells TypeScript which variant is active.",
      "assertNever makes missing switch cases fail during type checking.",
      "infer extracts a type from inside another type in conditional types.",
    ],
    resources: 8,
  },
  {
    id: "generics",
    title: "Generics",
    level: "Advanced",
    summary: "Write reusable type-safe functions, interfaces, classes, constraints, and API wrappers.",
    explanation:
      "Generics let you write code that works with many types while preserving the exact type passed in. They are the foundation for reusable repositories, API helpers, form utilities, data structures, and strongly typed component APIs.",
    subtopics: ["Generic functions", "Constraints", "keyof", "Generic interfaces", "Generic classes", "Reusable APIs"],
    goals: [
      "Preserve input and output relationships with type parameters.",
      "Constrain generic types when a function needs certain properties.",
      "Use keyof for safe property access.",
    ],
    practice: "Create a generic API client and a reusable Stack<T> class.",
    code: `function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

type Course = {
  id: string;
  title: string;
  duration: number;
};

const course: Course = {
  id: "ts-101",
  title: "TypeScript Basics",
  duration: 12,
};

const title = getProperty(course, "title"); // string

interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
}

class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}`,
    notes: [
      "T[K] means the return type depends on the specific key passed in.",
      "Constraints let you use known properties without losing generic flexibility.",
      "Generic classes keep collections and data structures type-safe.",
    ],
    resources: 7,
  },
  {
    id: "utility-types",
    title: "Utility Types",
    level: "Advanced",
    summary: "Use built-in utility types to transform object, union, function, and promise types.",
    explanation:
      "Utility types are TypeScript's built-in type transformation toolbox. They help you avoid duplicating similar types, such as create payloads, update payloads, public views, readonly objects, and async result types.",
    subtopics: ["Partial", "Required", "Readonly", "Pick", "Omit", "Record", "ReturnType", "Awaited"],
    goals: [
      "Transform existing types instead of manually duplicating them.",
      "Build safer API payload types.",
      "Understand common function and promise utility types.",
    ],
    practice: "Create public, create, and update DTO types from a single User model.",
    code: `type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

type PublicUser = Omit<User, "passwordHash">;
type CreateUserInput = Pick<User, "name" | "email"> & {
  password: string;
};
type UpdateUserInput = Partial<Pick<User, "name" | "email">>;
type UserMap = Record<string, PublicUser>;
type LockedUser = Readonly<PublicUser>;

async function fetchUser(): Promise<PublicUser> {
  return {
    id: "1",
    name: "Rishi",
    email: "rishi@example.com",
    createdAt: new Date(),
  };
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;`,
    notes: [
      "Omit is useful for hiding server-only or sensitive fields.",
      "Partial is common for patch/update payloads.",
      "ReturnType and Awaited derive types from real functions, reducing drift.",
    ],
    resources: 10,
  },
  {
    id: "modules-tooling",
    title: "Modules, Declaration Files & Tooling",
    level: "Advanced",
    summary: "Organize code with modules, configure tsconfig deeply, consume types, and write declaration files.",
    explanation:
      "Real TypeScript projects need module boundaries and compiler configuration. Modules organize code with imports and exports. Declaration files describe JavaScript that TypeScript cannot inspect directly, including legacy libraries and global APIs.",
    subtopics: ["ES modules", "CommonJS", "type imports", ".d.ts", "@types", "project references"],
    goals: [
      "Use type-only imports where appropriate.",
      "Understand how @types packages provide third-party library types.",
      "Create declaration files for untyped JavaScript.",
    ],
    practice: "Split a project into modules, add path aliases, and write one declaration file for a global helper.",
    code: `// course.ts
export type Course = {
  id: string;
  title: string;
};

export function createCourse(title: string): Course {
  return {
    id: crypto.randomUUID(),
    title,
  };
}

// app.ts
import { createCourse } from "./course";
import type { Course } from "./course";

const course: Course = createCourse("TypeScript Modules");

// globals.d.ts
declare global {
  interface Window {
    analytics: {
      track(eventName: string): void;
    };
  }
}

export {};`,
    notes: [
      "import type makes it clear an import is erased at runtime.",
      "Declaration files describe shapes; they do not implement behavior.",
      "Project references help large monorepos type-check in smaller chunks.",
    ],
    resources: 6,
  },
  {
    id: "react-typescript",
    title: "TypeScript with React",
    level: "Advanced",
    summary: "Type props, state, events, refs, children, custom hooks, context, and reusable components.",
    explanation:
      "React and TypeScript work best when component props are explicit and state is modeled carefully. TypeScript helps you catch missing props, wrong event handlers, unsafe context usage, and invalid component states before they become UI bugs.",
    subtopics: ["Props", "State", "Events", "Refs", "Children", "Context", "Custom hooks"],
    goals: [
      "Type component props without overusing React.FC.",
      "Use React event and ref types correctly.",
      "Create custom hooks with precise return types.",
    ],
    practice: "Convert a JavaScript React form component into fully typed TypeScript.",
    code: `import { FormEvent, ReactNode, useRef, useState } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
};

function Button({ variant = "primary", children, onClick }: ButtonProps) {
  return (
    <button className={"btn btn-" + variant} onClick={onClick}>
      {children}
    </button>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button>Join</Button>
    </form>
  );
}`,
    notes: [
      "ReactNode is useful when a component accepts renderable children.",
      "useRef needs the element type when referencing DOM nodes.",
      "Event types prevent mistakes when reading form and input values.",
    ],
    resources: 8,
  },
  {
    id: "node-runtime-validation",
    title: "TypeScript with Node.js & Runtime Validation",
    level: "Advanced",
    summary: "Build server-side TypeScript with typed environment variables, API payloads, async code, and validation.",
    explanation:
      "TypeScript does not validate external data at runtime. Anything from requests, databases, environment variables, or third-party APIs can still be wrong. Production TypeScript usually pairs static types with runtime validation libraries such as Zod.",
    subtopics: ["Node.js", "async", "environment variables", "API payloads", "Zod", "runtime safety"],
    goals: [
      "Separate trusted internal types from untrusted external data.",
      "Validate inputs before treating them as typed values.",
      "Use inferred types from schemas to avoid duplicate definitions.",
    ],
    practice: "Create a typed Express-style handler that validates request body input before saving it.",
    code: `import { z } from "zod";

const CreateCourseSchema = z.object({
  title: z.string().min(3),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  price: z.number().nonnegative(),
});

type CreateCourseInput = z.infer<typeof CreateCourseSchema>;

async function createCourse(input: unknown) {
  const data: CreateCourseInput = CreateCourseSchema.parse(input);

  return {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date(),
  };
}

await createCourse({
  title: "TypeScript APIs",
  level: "Advanced",
  price: 999,
});`,
    notes: [
      "unknown is the correct type for untrusted external data.",
      "Schema parsing converts unknown input into validated typed data.",
      "z.infer keeps the TypeScript type synchronized with the runtime schema.",
    ],
    resources: 7,
  },
  {
    id: "best-practices",
    title: "Best Practices & Common Errors",
    level: "Advanced",
    summary: "Write maintainable TypeScript with strict mode, safe naming, clear boundaries, and practical error fixes.",
    explanation:
      "Good TypeScript is not about making every type clever. The best code uses simple types at boundaries, precise unions for state, generics where reuse needs them, and runtime validation for outside data. Avoid any, prefer unknown, and let the compiler help you refactor.",
    subtopics: ["strict mode", "avoid any", "type safety", "naming", "errors", "organization"],
    goals: [
      "Fix common errors without weakening types.",
      "Keep types readable and close to the domain.",
      "Use compiler feedback as a design tool.",
    ],
    practice: "Refactor an any-heavy file into unknown, unions, interfaces, and utility types.",
    code: `// Common issue: value might be null
const title = document.querySelector("h1")?.textContent ?? "Untitled";

// Common issue: object key access
type Theme = {
  primary: string;
  secondary: string;
};

function getThemeValue<K extends keyof Theme>(theme: Theme, key: K): Theme[K] {
  return theme[key];
}

// Common issue: exhaustive union handling
type Status = "idle" | "loading" | "success" | "error";

function labelForStatus(status: Status): string {
  switch (status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading";
    case "success":
      return "Done";
    case "error":
      return "Failed";
  }
}`,
    notes: [
      "Optional chaining and nullish coalescing handle nullable values safely.",
      "keyof prevents invalid object key access.",
      "Readable types beat overly abstract type puzzles in most app code.",
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
  "--page-bg": "#02040a",
  "--header-bg": "rgba(2, 4, 10, 0.92)",
  "--panel-bg": "rgba(8, 12, 20, 0.82)",
  "--panel-strong": "rgba(11, 18, 32, 0.95)",
  "--field-bg": "rgba(8, 12, 20, 0.88)",
  "--border": "rgba(49, 120, 198, 0.28)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#cbd5e1",
  "--text-muted": "#94a3b8",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#f8fbff",
  "--header-bg": "rgba(248, 251, 255, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(235, 243, 251, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(49, 120, 198, 0.26)",
  "--text-primary": "#0f172a",
  "--text-secondary": "#334155",
  "--text-muted": "#64748b",
  "--shadow": "rgba(15, 23, 42, 0.08)",
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
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(49,120,198,0.24)]">
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
          Demon<span className="text-blue-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function TypeScriptRoadmap() {
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
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(49,120,198,0.22),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(37,99,235,0.12),transparent_26%),linear-gradient(180deg,#02040a_0%,#05070d_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(96,165,250,0.18),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(49,120,198,0.1),transparent_25%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-6 px-5 lg:px-6">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-blue-500 ${item === "Roadmaps" ? "text-blue-500" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
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
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-blue-500"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-blue-500/50 bg-blue-600 px-5 text-sm font-black text-white shadow-[0_0_28px_rgba(49,120,198,0.28)] transition hover:bg-blue-500 md:inline-flex"
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-blue-500" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-blue-500">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-blue-500"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-blue-500/25 bg-black/20 p-4">
              <div className="grid h-16 w-full place-items-center rounded-md border border-blue-500/35 bg-black/40 text-4xl font-black text-blue-500">
                TS
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Strongly typed.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Better code, safer refactors, and smarter editor help.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-8">
          <div className="mx-auto max-w-[1040px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-blue-500" name="home" />
              <Link className="hover:text-blue-500" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">TypeScript Roadmap</span>
            </div>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_255px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-500/40 bg-blue-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  <Icon className="h-4 w-4" name="spark" />
                  TypeScript Complete Documentation
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                  TypeScript <span className="text-blue-500">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A proper TypeScript documentation roadmap from setup and basic annotations to generics,
                  advanced types, utility types, modules, React, Node.js, runtime validation, and best practices.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "2-4 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-blue-500" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[250px] overflow-hidden rounded-lg border border-blue-500/25 bg-black shadow-[0_0_80px_rgba(49,120,198,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(49,120,198,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(49,120,198,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-blue-500/35 bg-blue-950/80 shadow-[0_0_60px_rgba(49,120,198,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-white drop-shadow-[0_0_28px_rgba(49,120,198,0.7)]">
                  TS
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_255px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-blue-500/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-blue-500/65" : "border-[var(--border)] hover:border-blue-500/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-blue-400 bg-blue-600 text-white" : "border-blue-500 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-lg font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-blue-500">{topic.level}</span>
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
                            <Icon className="h-4 w-4 text-blue-500" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-blue-500" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-5">
                              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-blue-500">Topic Explanation</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{topic.explanation}</p>
                            </div>

                            <div className="mt-5 overflow-hidden rounded-md border border-blue-500/25 bg-black">
                              <div className="flex items-center justify-between border-b border-blue-500/20 bg-blue-500/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-blue-500">TypeScript Code</h3>
                                <span className="rounded border border-blue-500/25 px-2 py-1 text-xs font-bold text-blue-300">TS</span>
                              </div>
                              <pre className="max-h-[460px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topic.code}</code>
                              </pre>
                            </div>

                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-blue-500">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-blue-500">Code Notes</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.notes.map((note) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={note}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" name="check" />
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                              <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                <Icon className="h-4 w-4 text-blue-500" name="target" />
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
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-blue-500/25 border-t-blue-500 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Start with strict mode, then build up to advanced type modeling.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You&apos;ll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["TypeScript fundamentals", "Types and annotations", "Generics and utility types", "Advanced type system", "React with TypeScript", "Runtime validation", "Best practices"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"],
                      ["TypeScript Playground", "https://www.typescriptlang.org/play"],
                      ["TypeScript Deep Dive", "https://basarat.gitbook.io/typescript/"],
                      ["Total TypeScript", "https://www.totaltypescript.com/"],
                      ["Type Challenges", "https://type-challenges.netlify.app/"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-blue-500/45 hover:text-blue-500" href={href} key={name} rel="noreferrer" target="_blank">
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
