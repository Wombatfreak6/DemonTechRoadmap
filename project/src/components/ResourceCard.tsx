import React from "react";
import Badge from "./Badge";

type ResourceCardProps = {
  title: string;
  description?: string;
  href?: string;
  tags?: string[];
};

export default function ResourceCard({
  title,
  description,
  href = "#",
  tags = [],
}: ResourceCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} – opens in a new tab`}
      className="block rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-cyan-300/50"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}
    </a>
  );
}
