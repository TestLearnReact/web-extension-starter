// generate stub index.html files for dev entry
import { relative, resolve } from "path";
import { execSync } from "child_process";
import fs from "fs-extra";
import chokidar from "chokidar";
import { isDev, log, port, r } from "./utils";

// import RefreshRuntime from '/@react-refresh'
// RefreshRuntime.injectIntoGlobalHook(window)

// window.$RefreshReg$ = () => {}
// window.$RefreshSig$ = () => (type) => type
// window.__vite_plugin_react_preamble_installed__ = true

// .replace(
//   "<!-- HMR replace -->",
//   `<base href="http://${config.server.host}:${config.server.port}" />
//   <script type="module" src="/@vite/client"></script>`
// )

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ["options", "popup", "background"];

  const config = { server: { host: "localhost", port } };

  for (const view of views) {
    await fs.ensureDir(r(`extension-vite/dist/${view}`));
    let data = await fs.readFile(
      r(`src/browser-shell/${view}/index.html`),
      "utf-8"
    );
    data = data
      .replace(
        "<!-- HMR replace -->",
        `<base href="http://${config.server.host}:${config.server.port}" />
        <script type="module" src="/@vite/client"></script>
        <script type="module">
          import RefreshRuntime from '/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>`
      )
      .replace(
        '"./main.ts"',
        `"http://localhost:${port}/browser-shell/${view}/main.ts"`
      )
      .replace(
        '"./main.tsx"',
        `"http://localhost:${port}/browser-shell/${view}/main.tsx"`
      )
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>'
      );
    await fs.writeFile(
      r(`extension-vite/dist/${view}/index.html`),
      data,
      "utf-8"
    );
    log("PRE", `stub ${view}`);
  }
}

function writeManifest() {
  execSync("npx esno ./build-tools/dev-scripts/manifest.ts", {
    stdio: "inherit",
  });
}

writeManifest();

export const copyPatterns = [
  {
    from: r("public/assets"),
    to: r("extension-vite/assets"),
  },
  {
    from: r("node_modules/webextension-polyfill/dist/browser-polyfill.js"),
    to: r("extension-vite/lib/browser-polyfill.js"),
  },
];

async function copyPublicAssets(from: string, to: string) {
  await fs.copy(from, to);
  let t = relative(from, to);
  log("PRE", `copy assets... to ${t}`);
}

for (let index = 0; index < copyPatterns.length; index++) {
  const element = copyPatterns[index];
  copyPublicAssets(element.from, element.to);
}

if (isDev) {
  stubIndexHtml();
  chokidar.watch(r("src/browser-shell/**/*.html")).on("change", () => {
    stubIndexHtml();
  });
  chokidar
    .watch([r("src/browser-shell/manifest.ts"), r("package.json")])
    .on("change", () => {
      writeManifest();
    });
}
