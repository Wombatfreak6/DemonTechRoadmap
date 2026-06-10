import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "Explore structured learning paths to guide your journey from beginner to professional developer.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
