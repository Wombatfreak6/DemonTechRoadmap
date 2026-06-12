import Image from "next/image";
import { getContributors } from "@/src/lib/github";

export default async function ContributorLeaderboard() {
  const contributors = await getContributors();

  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <section className="px-5 py-16 lg:px-8 border-t border-zinc-900 bg-[#020202]">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <p className="text-sm font-black text-red-400">Our Community</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Built by developers, for developers
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400 max-w-2xl mx-auto">
            DemonTech Roadmap is open source and community-driven. A huge thank you to all the amazing people who have contributed to our mission.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center rounded-lg border border-zinc-800 bg-[#090909] p-4 transition hover:border-red-500/50 hover:bg-zinc-900"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-zinc-800 transition group-hover:border-red-500/50">
                <Image
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm font-bold text-white line-clamp-1 text-center w-full">
                {contributor.login}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {contributor.contributions} commits
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
