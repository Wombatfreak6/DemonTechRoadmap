import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { symlink, rm } from "node:fs/promises";
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

  // Symlink root .next directory to project/.next so Vercel can find all assets/manifests
  // while preserving node_modules path resolution via the symlink's realpath
  const rootNextPath = new URL("../../.next", import.meta.url);
  try {
    await rm(rootNextPath, { recursive: true, force: true });
    await symlink("./project/.next", rootNextPath, "dir");
    console.log("Successfully symlinked root .next directory to project/.next");
  } catch (err) {
    console.error("Failed to symlink root .next directory:", err);
  }
}

process.exit(exitCode ?? 1);
