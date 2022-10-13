import fs from "fs-extra";
import { getManifest } from "../../src/manifest";
import { log, res } from "../shared";

export async function writeManifest() {
  await fs.ensureDir(res(`../../extension/${process.env.TARGET_BROWSER}/`));
  await fs.writeJSON(
    res(`../../extension/${process.env.TARGET_BROWSER}/manifest.json`),
    await getManifest(),
    {
      spaces: 2,
    }
  );
  log("PRE", "write manifest.json");
}

writeManifest();
