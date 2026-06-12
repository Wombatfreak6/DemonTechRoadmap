import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { cp } from "node:fs/promises";
import { ensureVercelRoutesManifest, watchVercelRoutesManifest } from "./ensure-vercel-routes-manifest.mjs";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const projectRoot = new URL("../", import.meta.url);
const controller = new AbortController();

const watcher = watchVercelRoutesManifest({ signal: controller.signal });
const build = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  cwd: projectRoot,
  stdio: "inherit",
});

const exitCode = await new Promise((resolve) => {
  build.on("close", resolve);
});

controller.abort();

if (exitCode === 0) {
  await watcher;
  await ensureVercelRoutesManifest();

  // Copy project/.next to root .next directory so Vercel can find all assets/manifests
  const rootNextPath = new URL("../../.next", import.meta.url);
  const projectNextPath = new URL("../.next", import.meta.url);
  try {
    await cp(projectNextPath, rootNextPath, { recursive: true });
    console.log("Successfully copied project/.next to root .next directory");
  } catch (err) {
    console.error("Failed to copy project/.next to root:", err);
  }
}

process.exit(exitCode ?? 1);
