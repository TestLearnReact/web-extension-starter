import fs from "fs-extra";
import { getManifest } from "../../src/browser-shell/manifest";
import { log, r } from "./utils";

export async function writeManifest() {
  await fs.ensureDir(r(`extension-vite/`));
  await fs.writeJSON(r("extension-vite/manifest.json"), await getManifest(), {
    spaces: 2,
  });
  log("PRE", "write manifest.json");
}

writeManifest();
