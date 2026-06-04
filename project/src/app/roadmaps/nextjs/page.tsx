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
    id: "intro-nextjs",
    title: "Introduction to Next.js",
    level: "Beginner",
    summary: "Understand Next.js as the production React framework for full-stack web apps.",
    explanation:
      "Next.js extends React with routing, rendering strategies, server components, API endpoints, metadata, image and font optimization, caching, and deployment conventions. Instead of assembling many libraries by hand, you get a framework that handles common production needs while still letting you write React components.",
    subtopics: ["React framework", "Full-stack apps", "App Router", "Rendering", "Vercel", "Use cases"],
    goals: [
      "Explain why Next.js is useful beyond plain React.",
      "Identify where routing, rendering, APIs, and optimization fit.",
      "Know the prerequisites: HTML, CSS, JavaScript, React, and basic TypeScript.",
    ],
    practice: "Write a short comparison of React-only SPA routing versus a Next.js app with server rendering and file-based routes.",
    code: `// Next.js gives you pages, layouts, metadata, APIs, and server logic
// in one React project.

export default function HomePage() {
  return (
    <main>
      <h1>Build with Next.js</h1>
      <p>React UI, server rendering, routing, and deployment together.</p>
    </main>
  );
}`,
    notes: [
      "Next.js still uses React; it adds framework features around React.",
      "The App Router is the modern routing model based on the app directory.",
      "Server Components can render on the server and send less JavaScript to the browser.",
    ],
    resources: 4,
  },
  {
    id: "project-setup",
    title: "Project Setup",
    level: "Beginner",
    summary: "Create a Next.js project, understand the folder structure, scripts, and TypeScript setup.",
    explanation:
      "A good Next.js project starts with predictable structure. The app directory contains routes, layouts, loading states, errors, and route handlers. TypeScript is commonly enabled from the beginning so components, data fetching, and server logic have clear contracts.",
    subtopics: ["create-next-app", "Project structure", "TypeScript", "Scripts", "Public assets"],
    goals: [
      "Create a new project with TypeScript and App Router.",
      "Understand app, public, next.config, package scripts, and tsconfig.",
      "Run dev, build, and start commands correctly.",
    ],
    practice: "Create a new Next.js app with TypeScript, add a home page, and run a production build.",
    code: `npx create-next-app@latest demon-next-app --typescript
cd demon-next-app
npm run dev
npm run build
npm run start

// Typical App Router structure
app/
  layout.tsx
  page.tsx
  loading.tsx
  error.tsx
  not-found.tsx
public/
next.config.ts
tsconfig.json`,
    notes: [
      "npm run dev starts the development server with hot reload.",
      "npm run build verifies production compilation and route generation.",
      "Files in public are served from the site root, such as /logo.png.",
    ],
    resources: 4,
  },
  {
    id: "routing-navigation",
    title: "Routing & Navigation",
    level: "Beginner",
    summary: "Use file-based routing, dynamic routes, Link, active states, and route groups.",
    explanation:
      "Next.js routing is file-system driven. A page.tsx file creates a route, folders create URL segments, and bracketed folders create dynamic params. The Link component enables client-side navigation with prefetching for faster route changes.",
    subtopics: ["File-based routing", "Dynamic routes", "Link", "useRouter", "Active links", "Route groups"],
    goals: [
      "Create static and dynamic routes in the app directory.",
      "Use Link instead of normal anchors for internal navigation.",
      "Read route params in server and client components.",
    ],
    practice: "Build /blog, /blog/[slug], and /dashboard/settings routes with navigation links.",
    code: `// app/blog/page.tsx
import Link from "next/link";

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <Link href="/blog/nextjs-routing">Read routing guide</Link>
    </main>
  );
}

// app/blog/[slug]/page.tsx
type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}`,
    notes: [
      "Folders map to URL segments in the App Router.",
      "Dynamic segments use square brackets, such as [slug].",
      "Use Link for internal navigation so Next.js can optimize transitions.",
    ],
    resources: 5,
  },
  {
    id: "layouts-components",
    title: "Layouts, Templates & UI States",
    level: "Intermediate",
    summary: "Build shared layouts, nested layouts, templates, loading UI, error boundaries, and not-found screens.",
    explanation:
      "Layouts let you share UI across routes without rerendering everything on navigation. Special files like loading.tsx, error.tsx, and not-found.tsx make route-level states feel polished and predictable. This is one of the App Router's biggest ergonomic wins.",
    subtopics: ["layout.tsx", "template.tsx", "nested layouts", "loading.tsx", "error.tsx", "not-found.tsx"],
    goals: [
      "Create a root layout with global structure.",
      "Add nested layouts for dashboard or docs sections.",
      "Handle loading, errors, and missing pages with special files.",
    ],
    practice: "Create a dashboard layout with sidebar navigation, loading skeleton, and error reset button.",
    code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-shell">
      <aside>Dashboard Nav</aside>
      <main>{children}</main>
    </section>
  );
}

// app/dashboard/loading.tsx
export default function Loading() {
  return <p>Loading dashboard...</p>;
}

// app/dashboard/error.tsx
"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <button onClick={reset}>Try again</button>;
}`,
    notes: [
      "Layouts preserve state across navigation inside their segment.",
      "error.tsx must be a Client Component because it handles reset interaction.",
      "loading.tsx is automatically shown while route data or UI is pending.",
    ],
    resources: 5,
  },
  {
    id: "server-client-components",
    title: "Server & Client Components",
    level: "Intermediate",
    summary: "Understand when code runs on the server, when to use client components, and how to pass data safely.",
    explanation:
      "Server Components are the default in the App Router. They can fetch data and access server-only resources without shipping their code to the browser. Client Components are needed for state, effects, browser APIs, and event handlers. Good Next.js apps keep as much UI server-rendered as practical and isolate interactivity into focused client components.",
    subtopics: ["Server Components", "Client Components", "use client", "Props", "Browser APIs", "Boundaries"],
    goals: [
      "Know that App Router components are Server Components by default.",
      "Use use client only when interactivity or browser APIs are needed.",
      "Pass serializable data from server components into client components.",
    ],
    practice: "Build a server-rendered product page with a small client AddToCart button.",
    code: `// app/products/[id]/page.tsx - Server Component
import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
  return { id, title: "Next.js Course", price: 999 };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main>
      <h1>{product.title}</h1>
      <AddToCartButton productId={product.id} />
    </main>
  );
}

// AddToCartButton.tsx - Client Component
"use client";

export default function AddToCartButton({ productId }: { productId: string }) {
  return <button onClick={() => console.log(productId)}>Add to cart</button>;
}`,
    notes: [
      "Only the button needs to be client-side because it uses onClick.",
      "Server Components can await data directly.",
      "Props crossing the server-client boundary should be serializable.",
    ],
    resources: 6,
  },
  {
    id: "data-fetching-rendering",
    title: "Data Fetching & Rendering",
    level: "Intermediate",
    summary: "Fetch data on the server and choose between static, dynamic, revalidated, streamed, and client rendering.",
    explanation:
      "Next.js lets each route choose the rendering behavior that fits the data. Static rendering is fastest for stable content. Dynamic rendering is useful for request-specific content. Revalidation gives you static speed with periodic updates. Streaming sends ready UI early while slower sections continue loading.",
    subtopics: ["fetch", "SSG", "SSR", "ISR", "Caching", "Revalidation", "Streaming"],
    goals: [
      "Fetch data in Server Components.",
      "Choose static, dynamic, or revalidated rendering intentionally.",
      "Use Suspense to stream slower UI sections.",
    ],
    practice: "Build a courses page that revalidates every hour and streams a recommendations panel.",
    code: `// Revalidated data fetching
async function getCourses() {
  const response = await fetch("https://api.example.com/courses", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to load courses");
  }

  return response.json() as Promise<Array<{ id: string; title: string }>>;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </main>
  );
}`,
    notes: [
      "next.revalidate controls how often cached data should refresh.",
      "Throwing inside a route can be handled by an error.tsx boundary.",
      "Use dynamic rendering for per-user or request-specific data.",
    ],
    resources: 7,
  },
  {
    id: "server-actions-forms",
    title: "Server Actions & Forms",
    level: "Advanced",
    summary: "Mutate data from forms using server actions, validation, revalidation, and error handling.",
    explanation:
      "Server Actions let forms and client components call server-side functions without manually creating a separate API endpoint. They are excellent for mutations such as creating records, updating settings, or submitting contact forms. Always validate inputs and revalidate affected pages or data after a mutation.",
    subtopics: ["use server", "Forms", "Validation", "Revalidation", "Mutations", "Errors"],
    goals: [
      "Create a server action for form submission.",
      "Validate form data before writing to a database.",
      "Revalidate routes after successful mutations.",
    ],
    practice: "Create a newsletter signup form with a server action and validation errors.",
    code: `// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  if (title.length < 3) {
    return { error: "Title must be at least 3 characters." };
  }

  // await db.course.create({ data: { title } });
  revalidatePath("/courses");
  return { success: true };
}

// app/courses/new/page.tsx
import { createCourse } from "@/app/actions";

export default function NewCoursePage() {
  return (
    <form action={createCourse}>
      <input name="title" required />
      <button>Create course</button>
    </form>
  );
}`,
    notes: [
      "Server Actions run on the server, so they can access databases and secrets.",
      "FormData values are untrusted and must be validated.",
      "revalidatePath refreshes cached pages affected by the mutation.",
    ],
    resources: 5,
  },
  {
    id: "api-routes-middleware",
    title: "API Routes, Route Handlers & Middleware",
    level: "Advanced",
    summary: "Create backend endpoints with route handlers and intercept requests with middleware.",
    explanation:
      "Route Handlers give you backend endpoints inside the app directory. They are useful for webhooks, custom APIs, integrations, and non-UI responses. Middleware runs before routes and can redirect, rewrite, add headers, or protect routes at the edge.",
    subtopics: ["Route Handlers", "GET", "POST", "Dynamic routes", "Middleware", "Edge"],
    goals: [
      "Create GET and POST route handlers.",
      "Return typed JSON responses.",
      "Use middleware for redirects, auth checks, or headers.",
    ],
    practice: "Build /api/courses with GET and POST handlers, then add middleware to protect /dashboard.",
    code: `// app/api/courses/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "nextjs", title: "Next.js Roadmap" },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ created: true, body }, { status: 201 });
}

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = Boolean(request.cookies.get("session"));

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};`,
    notes: [
      "Route handlers live in route.ts files.",
      "Middleware should stay lightweight because it can run very frequently.",
      "Use route handlers for backend APIs and Server Actions for form-style mutations.",
    ],
    resources: 5,
  },
  {
    id: "styling-assets-metadata",
    title: "Styling, Images, Fonts & Metadata",
    level: "Intermediate",
    summary: "Use CSS Modules, Tailwind, next/image, next/font, and Metadata API for polished production pages.",
    explanation:
      "Next.js includes optimizations for common front-end needs. next/image helps prevent layout shift and optimize image delivery. next/font self-hosts fonts and reduces layout shift. The Metadata API centralizes titles, descriptions, Open Graph data, and robots metadata.",
    subtopics: ["CSS Modules", "Tailwind", "next/image", "next/font", "Metadata API", "SEO"],
    goals: [
      "Optimize images with explicit size or fill layout.",
      "Load fonts without causing layout shift.",
      "Define static and dynamic metadata for SEO and sharing.",
    ],
    practice: "Create a blog post page with optimized hero image, custom font, and dynamic metadata.",
    code: `import Image from "next/image";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js Roadmap",
  description: "Learn Next.js from basics to production deployment.",
  openGraph: {
    title: "Next.js Roadmap",
    images: ["/nextjs-og.png"],
  },
};

export default function Page() {
  return (
    <main className={inter.className}>
      <Image
        src="/roadmap-journey-bg.png"
        alt="Roadmap journey"
        width={1200}
        height={640}
        priority
      />
    </main>
  );
}`,
    notes: [
      "Always provide meaningful alt text for content images.",
      "Use priority only for important above-the-fold images.",
      "Metadata can be static or generated dynamically per route.",
    ],
    resources: 6,
  },
  {
    id: "auth-database",
    title: "Authentication, Databases & Full-Stack Patterns",
    level: "Advanced",
    summary: "Add auth, Prisma or database access, protected routes, credentials, OAuth, and server-side data models.",
    explanation:
      "Production Next.js apps often need authentication and persistent data. Auth.js handles providers, sessions, and credentials. Prisma gives typed database access. Keep database and secrets on the server, validate inputs, and protect routes before rendering private content.",
    subtopics: ["Auth.js", "OAuth", "Credentials", "Prisma", "Protected routes", "Server-only code"],
    goals: [
      "Understand session-based route protection.",
      "Keep database access in server-only code.",
      "Use typed data models and validated inputs.",
    ],
    practice: "Create a protected dashboard page that reads the current session and loads user projects.",
    code: `// Server Component pattern
import { redirect } from "next/navigation";

async function getSession() {
  return { user: { id: "1", name: "Rishi" } };
}

async function getProjects(userId: string) {
  return [
    { id: "p1", title: "Portfolio" },
    { id: "p2", title: "Dashboard" },
  ];
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const projects = await getProjects(session.user.id);

  return (
    <main>
      <h1>Welcome, {session.user.name}</h1>
      {projects.map((project) => (
        <p key={project.id}>{project.title}</p>
      ))}
    </main>
  );
}`,
    notes: [
      "redirect can be called during server rendering.",
      "Database queries should stay on the server unless exposed through safe APIs.",
      "Authentication protects access; authorization decides what a user may do.",
    ],
    resources: 7,
  },
  {
    id: "optimization-caching",
    title: "Optimization, Caching & Core Web Vitals",
    level: "Advanced",
    summary: "Improve performance with caching, code splitting, dynamic imports, bundle analysis, and web vitals.",
    explanation:
      "Next.js optimizes many things by default, but production apps still need measurement. Use the rendering strategy that matches the data, split heavy code, optimize images and fonts, inspect bundles, and track Core Web Vitals like LCP, CLS, and INP.",
    subtopics: ["Caching", "Code splitting", "next/dynamic", "Bundle analyzer", "LCP", "CLS", "INP"],
    goals: [
      "Use caching intentionally instead of guessing.",
      "Lazy-load heavy client-only components.",
      "Measure performance with Lighthouse or real user monitoring.",
    ],
    practice: "Lazy-load a chart component and compare bundle size before and after.",
    code: `import dynamic from "next/dynamic";

const AnalyticsChart = dynamic(() => import("./AnalyticsChart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
});

export default function AnalyticsPage() {
  return (
    <main>
      <h1>Analytics</h1>
      <AnalyticsChart />
    </main>
  );
}

// next.config.ts idea
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
};

export default nextConfig;`,
    notes: [
      "dynamic imports are useful for heavy components that are not needed immediately.",
      "ssr: false should be reserved for components that truly need the browser.",
      "Core Web Vitals should be measured in production, not only locally.",
    ],
    resources: 6,
  },
  {
    id: "deployment-production",
    title: "Deployment & Production Checklist",
    level: "Advanced",
    summary: "Deploy to Vercel or Docker, configure environment variables, CI/CD, security headers, and monitoring.",
    explanation:
      "Deployment is more than pushing code. Production Next.js apps need correct environment variables, HTTPS, content security policy, error monitoring, database connection pooling, rate limiting, performance checks, and a reliable CI/CD flow.",
    subtopics: ["Vercel", "Docker", "Environment variables", "CI/CD", "Security headers", "Monitoring"],
    goals: [
      "Deploy a Next.js app to Vercel.",
      "Use environment variables for secrets.",
      "Create a production checklist before launch.",
    ],
    practice: "Deploy a small app to Vercel with environment variables and verify the production build.",
    code: `// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;`,
    notes: [
      "Use output: standalone when building smaller Docker images.",
      "Never hardcode secrets; use environment variables.",
      "Run npm run build before deployment to catch route and type errors.",
    ],
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
  "--page-bg": "#020403",
  "--header-bg": "rgba(2, 4, 3, 0.92)",
  "--panel-bg": "rgba(8, 14, 10, 0.82)",
  "--panel-strong": "rgba(12, 20, 14, 0.95)",
  "--field-bg": "rgba(8, 14, 10, 0.88)",
  "--border": "rgba(74, 222, 128, 0.24)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#d1d5db",
  "--text-muted": "#9ca3af",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#f7fff8",
  "--header-bg": "rgba(247, 255, 248, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(240, 253, 244, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(34, 197, 94, 0.24)",
  "--text-primary": "#052e16",
  "--text-secondary": "#14532d",
  "--text-muted": "#4b5563",
  "--shadow": "rgba(20, 83, 45, 0.08)",
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
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(74,222,128,0.24)]">
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
          Demon<span className="text-green-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function NextJSRoadmap() {
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
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(74,222,128,0.18),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(34,197,94,0.12),transparent_26%),linear-gradient(180deg,#020403_0%,#050805_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(74,222,128,0.16),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(34,197,94,0.1),transparent_25%),linear-gradient(180deg,#f7fff8_0%,#ffffff_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center gap-8 px-5 lg:px-8">
          <DemonTechLogo />
          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a className={`transition hover:text-green-500 ${item === "Roadmaps" ? "text-green-500" : ""}`} href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"} key={item}>
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
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-green-500"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-green-500/50 bg-green-600 px-5 text-sm font-black text-white shadow-[0_0_28px_rgba(74,222,128,0.28)] transition hover:bg-green-500 md:inline-flex"
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-500">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "How Roadmaps Work", "Learning Paths", "Quick Start"].map((item) => (
                <a className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-green-500" href={item === "Quick Start" ? "/docs/quick-start" : "#"} key={item}>
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-green-500">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-green-500"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-green-500/25 bg-black/20 p-4">
              <div className="grid h-20 w-full place-items-center rounded-md border border-green-500/35 bg-black/40 text-4xl font-black text-green-500">
                Next
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Build. Deploy. Scale.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">The React framework for production full-stack apps.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-green-500" name="home" />
              <Link className="hover:text-green-500" href="/docs/all-roadmaps">Roadmaps</Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">Next.js Roadmap</span>
            </div>

            <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-green-500/40 bg-green-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  <Icon className="h-4 w-4" name="spark" />
                  Next.js Learning Roadmap 2026
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  Next.js <span className="text-green-500">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A documentation-backed Next.js roadmap from project setup and App Router fundamentals to
                  server components, data fetching, Server Actions, authentication, caching, SEO, and deployment.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "2-3 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-green-500" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-green-500/25 bg-black shadow-[0_0_80px_rgba(74,222,128,0.16)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.14)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/35 bg-green-950/45 shadow-[0_0_60px_rgba(74,222,128,0.28)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-white drop-shadow-[0_0_28px_rgba(74,222,128,0.7)]">
                  NEXT
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-green-500/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${isActive ? "border-green-500/65" : "border-[var(--border)] hover:border-green-500/40"}`} key={topic.id}>
                        <button aria-expanded={isActive} className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]" onClick={() => setActiveTopicId(topic.id)} type="button">
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-lg border text-lg font-black ${isActive ? "border-green-400 bg-green-600 text-white" : "border-green-500 bg-black text-white"}`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-xl font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-green-500">{topic.level}</span>
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
                            <Icon className="h-4 w-4 text-green-500" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-green-500" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-5">
                              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-green-500">Topic Explanation</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{topic.explanation}</p>
                            </div>
                            <div className="mt-5 overflow-hidden rounded-md border border-green-500/25 bg-black">
                              <div className="flex items-center justify-between border-b border-green-500/20 bg-green-500/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-green-500">Next.js Code</h3>
                                <span className="rounded border border-green-500/25 px-2 py-1 text-xs font-bold text-green-300">Next.js</span>
                              </div>
                              <pre className="max-h-[460px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topic.code}</code>
                              </pre>
                            </div>
                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-green-500">Learning Goals</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.goals.map((goal) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={goal}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-green-500" name="check" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-green-500">Code Notes</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.notes.map((note) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={note}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-green-500" name="check" />
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                              <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                <Icon className="h-4 w-4 text-green-500" name="target" />
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
                    <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-green-500/25 border-t-green-500 text-3xl font-black">0%</div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-6 text-[var(--text-muted)]">Start with routing, then move into server rendering and full-stack features.</p>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You'll Learn</h2>
                  <div className="mt-5 space-y-4">
                    {["Next.js fundamentals", "File-based routing", "Server Components", "Data fetching", "Server Actions", "API routes and middleware", "Deployment and scaling"].map((item) => (
                      <div className="flex gap-3" key={item}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" name="check" />
                        <p className="text-sm font-bold text-[var(--text-secondary)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["Next.js Docs", "https://nextjs.org/docs"],
                      ["Learn Next.js", "https://nextjs.org/learn"],
                      ["Vercel Templates", "https://vercel.com/templates"],
                      ["Next.js GitHub", "https://github.com/vercel/next.js"],
                      ["Vercel Docs", "https://vercel.com/docs"],
                    ].map(([name, href]) => (
                      <a className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-green-500/45 hover:text-green-500" href={href} key={name} rel="noreferrer" target="_blank">
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
