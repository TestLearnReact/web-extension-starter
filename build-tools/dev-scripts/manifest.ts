import fs from 'fs-extra';
import { getManifest } from '../../src/browser-shell/manifest';
import { OUTDIR_WEBPACK_NAME, res, log } from 'build-tools/shared-config';

export async function writeManifest() {
  await fs.ensureDir(
    res(`${OUTDIR_WEBPACK_NAME}/${process.env.TARGET_BROWSER}/`),
  );
  await fs.writeJSON(
    res(`${OUTDIR_WEBPACK_NAME}/${process.env.TARGET_BROWSER}/manifest.json`),
    await getManifest(),
    {
      spaces: 2,
    },
  );
  log('PRE', 'write manifest.json');
}

writeManifest();
