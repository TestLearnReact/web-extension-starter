import { defineConfig } from "vite";
import { sharedConfig } from "./vite.config";
import packageJson from "../../package.json";
import { isDev, r } from "../dev-scripts/utils";

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension-vite/dist/background"),
    //cssCodeSplit: false,
    emptyOutDir: false,
    /// sourcemap: isDev ? "inline" : false, //
    lib: {
      entry: r("src/browser-shell/background/main.ts"),
      name: packageJson.name,
      // fileName: "index", //
      /// formats: ["iife"],
      //formats: ["es"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        // assetFileNames: "[name].[ext]",
        // assetFileNames: "ribbon.css", // ??
        extend: true,
      },
    },
  },
  //plugins: [...sharedConfig.plugins!],
});
