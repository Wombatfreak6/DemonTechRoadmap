import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Start",
  description: "Get up and running with DemonTech Roadmap in just a few minutes. Follow simple steps to start your learning journey.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
