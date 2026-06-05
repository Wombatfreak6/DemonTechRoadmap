import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { ensureVercelRoutesManifest, watchVercelRoutesManifest } from "./ensure-vercel-routes-manifest.mjs";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const projectRoot = new URL("../", import.meta.url);

const watcher = watchVercelRoutesManifest();
const build = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  cwd: projectRoot,
  stdio: "inherit",
});

const exitCode = await new Promise((resolve) => {
  build.on("close", resolve);
});

if (exitCode === 0) {
  await watcher;
  await ensureVercelRoutesManifest();
}

process.exit(exitCode ?? 1);
