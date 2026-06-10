import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Common Questions",
  description: "Find answers to frequently asked questions about DemonTech roadmaps, learning paths, and best practices.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
