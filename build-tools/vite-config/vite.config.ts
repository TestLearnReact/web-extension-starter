// /// <reference types="vitest" />

import { dirname, relative } from "path";
import { splitVendorChunkPlugin, UserConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { isDev, port, r } from "../dev-scripts/utils";

export const sharedConfig: UserConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __IS_WEBPACK__: false,
    __IS_VITE__: true,
    __IS_CRXJS__: false,
  },
  plugins: [
    splitVendorChunkPlugin(),
    react(), //{ fastRefresh: true }
    AutoImport({
      imports: [
        {
          "webextension-polyfill": [["*", "browser"]],
          "styled-components": [["*", "styled"]],
        },
      ],
      dts: r("src/auto-imports.d.ts"),
    }),

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      },
    },
  ],
  optimizeDeps: {
    include: ["webextension-polyfill", "styled-components"],
  },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost",
    },
  },
  build: {
    outDir: r("extension-vite/dist"),
    emptyOutDir: false,
    //sourcemap: isDev ? "inline" : false,
    // manifest: true, //
    //ssrManifest: true, //
    rollupOptions: {
      input: {
        //background: r("src/browser-shell/background/index.html"),
        options: r("src/browser-shell/options/index.html"),
        popup: r("src/browser-shell/popup/index.html"),
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
}));
