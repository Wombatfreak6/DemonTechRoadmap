import SearchableResources from "@/src/components/SearchableResources";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950 dark:bg-slate-950 dark:text-white lg:px-8">
      <section className="mx-auto max-w-[1180px]">
        <div className="mb-8">
          <p className="text-sm font-bold text-cyan-700 dark:text-cyan-400">Browse</p>
          <h1 className="mt-3 text-4xl font-black">Learning Resources</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Curated references, tutorials, roadmaps, and practice resources to support every DemonTech learning path.
          </p>
        </div>
        <SearchableResources />
      </section>
    </main>
  );
}
