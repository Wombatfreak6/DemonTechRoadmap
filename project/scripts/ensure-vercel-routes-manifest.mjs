import { copyFile, access } from "node:fs/promises";
import { constants } from "node:fs";

const source = new URL("../.next/routes-manifest.json", import.meta.url);
const target = new URL("../.next/routes-manifest-deterministic.json", import.meta.url);

try {
  await access(target, constants.F_OK);
} catch {
  await copyFile(source, target);
}
