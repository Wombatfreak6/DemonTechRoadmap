import { spawnSync } from "node:child_process";

const repo = "Demon-Die/DemonTechRoadmap";

const labels = [
  {
    name: "good first issue",
    color: "7057FF",
    description: "Small, beginner-friendly work for first-time contributors.",
  },
  {
    name: "beginner friendly",
    color: "0E8A16",
    description: "Clear scope and low project knowledge required.",
  },
  {
    name: "priority: low",
    color: "C2E0C6",
    description: "Helpful improvement that is not urgent.",
  },
  {
    name: "priority: medium",
    color: "FBCA04",
    description: "Useful improvement worth picking up soon.",
  },
  {
    name: "type: documentation",
    color: "0075CA",
    description: "Documentation, README, guide, or wording improvement.",
  },
  {
    name: "type: content",
    color: "5319E7",
    description: "Adds or improves educational content.",
  },
  {
    name: "type: resources",
    color: "1D76DB",
    description: "Adds or updates learning resources.",
  },
  {
    name: "type: accessibility",
    color: "BFD4F2",
    description: "Improves accessibility or inclusive UX.",
  },
  {
    name: "area: docs",
    color: "D4C5F9",
    description: "Related to docs pages or project documentation.",
  },
  {
    name: "area: roadmaps",
    color: "B60205",
    description: "Related to roadmap pages or roadmap content.",
  },
];

const issues = [
  {
    title: "Improve README setup instructions for first-time contributors",
    priority: "Medium",
    type: "Documentation",
    labels: ["good first issue", "beginner friendly", "priority: medium", "type: documentation", "area: docs"],
    body: `## Overview
Make the README easier for new contributors who want to run the project locally.

## Why this helps
Clear setup steps reduce confusion for first-time contributors and make it easier for people to submit their first pull request.

## Suggested scope
- Review the current README setup section.
- Add or improve the install, dev, build, and lint commands.
- Mention that the main app lives inside the \`project\` workspace.
- Keep the wording short and beginner-friendly.

## Acceptance criteria
- [ ] README includes clear local setup steps.
- [ ] README includes the command to start the dev server.
- [ ] README includes the command to run a production build.
- [ ] The updated instructions are easy to follow for someone new to the repo.

## Priority
Medium

## Type
Documentation`,
  },
  {
    title: "Add beginner-friendly Python learning resources",
    priority: "Low",
    type: "Resources",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: resources"],
    body: `## Overview
Add more beginner-friendly Python learning resources to the project.

## Why this helps
Python is a common first programming language, so better starter resources can help new learners use the roadmap more effectively.

## Suggested scope
- Update \`project/src/data/resources/python.json\`.
- Add free tutorials, documentation, videos, or practice resources.
- Prefer resources that are useful for absolute beginners.

## Acceptance criteria
- [ ] Add 5-8 Python resources.
- [ ] Avoid duplicate URLs.
- [ ] Keep the existing JSON structure and formatting.
- [ ] Prefer free and beginner-friendly resources.

## Priority
Low

## Type
Resources`,
  },
  {
    title: "Add beginner-friendly JavaScript resources",
    priority: "Low",
    type: "Resources",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: resources"],
    body: `## Overview
Add beginner-friendly JavaScript resources for learners starting web development.

## Why this helps
JavaScript is one of the core skills for frontend and full-stack learners, so a stronger resource list will make the roadmaps more useful.

## Suggested scope
- Add free JavaScript tutorials, documentation, or practice links.
- Use official or widely trusted resources where possible.
- Keep resource entries consistent with the existing data format.

## Acceptance criteria
- [ ] Add at least 5 JavaScript resources.
- [ ] Include beginner-friendly resources.
- [ ] Avoid duplicate links.
- [ ] Keep JSON valid and consistently formatted.

## Priority
Low

## Type
Resources`,
  },
  {
    title: "Add more beginner project ideas to the docs",
    priority: "Low",
    type: "Content",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: content", "area: docs"],
    body: `## Overview
Expand the project ideas documentation with simple project ideas for beginners.

## Why this helps
New learners often need small, practical ideas to apply what they are learning from a roadmap.

## Suggested scope
- Update the project ideas docs page.
- Add ideas across areas like frontend, backend, Python, and AI/ML.
- Keep each idea short and easy to understand.

## Acceptance criteria
- [ ] Add 6-10 beginner project ideas.
- [ ] Each idea has a short one-line description.
- [ ] Ideas are realistic for beginners.
- [ ] The page keeps the existing tone and layout.

## Priority
Low

## Type
Content`,
  },
  {
    title: "Add common beginner questions to the FAQ page",
    priority: "Low",
    type: "Content",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: content", "area: docs"],
    body: `## Overview
Add more common beginner questions and answers to the FAQ page.

## Why this helps
A stronger FAQ helps new users understand how to choose a roadmap, how to study, and how to make progress without feeling lost.

## Suggested scope
- Update the common questions docs page.
- Focus on questions that new learners usually ask.
- Keep answers short, direct, and encouraging.

## Acceptance criteria
- [ ] Add at least 5 new FAQ entries.
- [ ] Answers are clear and beginner-friendly.
- [ ] Content focuses on learning paths, roadmap usage, or choosing a skill.
- [ ] Existing page style is preserved.

## Priority
Low

## Type
Content`,
  },
  {
    title: "Fix typos and small wording issues in docs pages",
    priority: "Low",
    type: "Documentation",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: documentation", "area: docs"],
    body: `## Overview
Review the documentation pages and fix small typos, grammar issues, or unclear wording.

## Why this helps
Small documentation improvements are a great first contribution and make the project feel more polished for new users.

## Suggested scope
- Review docs pages under \`project/src/app/docs\`.
- Fix spelling, grammar, punctuation, or small clarity issues.
- Avoid large rewrites or design changes.

## Acceptance criteria
- [ ] Fix at least 5 small text issues.
- [ ] Do not rewrite entire pages.
- [ ] Do not change unrelated layout or styling.
- [ ] Keep the tone simple and friendly.

## Priority
Low

## Type
Documentation`,
  },
  {
    title: "Improve image alt text for accessibility",
    priority: "Medium",
    type: "Accessibility",
    labels: ["good first issue", "beginner friendly", "priority: medium", "type: accessibility"],
    body: `## Overview
Review image usage in the app and improve alt text where it is missing or unclear.

## Why this helps
Better alt text improves accessibility and makes the project friendlier for people using assistive technology.

## Suggested scope
- Search for image components or image tags.
- Improve vague alt text like "image" or empty alt text where the image is meaningful.
- Do not change layout or visual styling.

## Acceptance criteria
- [ ] Meaningful images have descriptive alt text.
- [ ] Decorative images, if any, are handled appropriately.
- [ ] No layout or styling changes are introduced.
- [ ] The app still builds successfully.

## Priority
Medium

## Type
Accessibility`,
  },
  {
    title: "Add beginner tips to one roadmap page",
    priority: "Low",
    type: "Content",
    labels: ["good first issue", "beginner friendly", "priority: low", "type: content", "area: roadmaps"],
    body: `## Overview
Add a short beginner tips section to one roadmap page.

## Why this helps
Small practical tips can help learners understand how to start, what to avoid, and how to use the roadmap effectively.

## Suggested scope
- Choose one roadmap page, such as frontend, backend, Python, or React.
- Add 3-5 short beginner tips.
- Match the existing page style and tone.

## Acceptance criteria
- [ ] One roadmap page includes a short beginner tips section.
- [ ] Tips are practical and beginner-friendly.
- [ ] Existing layout and styling remain consistent.
- [ ] The change is focused on one roadmap only.

## Priority
Low

## Type
Content`,
  },
];

function run(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    console.error(`\nCommand failed: ${command} ${args.join(" ")}`);
    if (result.stdout) console.error(result.stdout.trim());
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

for (const label of labels) {
  run("gh", [
    "label",
    "create",
    label.name,
    "--repo",
    repo,
    "--color",
    label.color,
    "--description",
    label.description,
    "--force",
  ]);
  console.log(`Upserted label: ${label.name}`);
}

for (const issue of issues) {
  const args = ["issue", "create", "--repo", repo, "--title", issue.title, "--body", issue.body];

  for (const label of issue.labels) {
    args.push("--label", label);
  }

  const url = run("gh", args);
  console.log(`Created issue: ${issue.title}`);
  console.log(url);
}
