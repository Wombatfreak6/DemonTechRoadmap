import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Roadmaps",
  description: "Browse all available DemonTech roadmaps. Discover paths for frontend, backend, devops, data science, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
