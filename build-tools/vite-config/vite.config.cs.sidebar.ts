import { resolve } from "path";
import { defineConfig } from "vite";
import { sharedConfig } from "./vite.config";
import packageJson from "../../package.json";
import { isDev, r } from "../dev-scripts/utils";

export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension-vite/dist/contentScripts"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false, //
    lib: {
      entry: r("src/browser-shell/contentScripts/cs-scripts/sidebar.ts"),
      name: packageJson.name,
      // fileName: "index", //
      formats: ["iife"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        entryFileNames: "index.sidebar.js",
        // assetFileNames: "[name].[ext]",
        // assetFileNames: "ribbon.css", // ??
        extend: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "react-dom",
        },
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
});
