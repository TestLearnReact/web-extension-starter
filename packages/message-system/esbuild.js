// const { build } = require("esbuild");
// const { dependencies } = require("./package.json");

import { build } from 'esbuild';

// const define = {};

// for (const k in process.env) {
//   if (k.startsWith("NODE_ENV")) {
//     define[`process.env.${k}`] = JSON.stringify(process.env[k]);
//   }
// }

// const external = Object.entries(dependencies).map(([key]) => key);

const sharedConfig = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  // platform: "node",
  outbase: 'src',
  // define,
  tsconfig: './tsconfig.json',
  sourcemap: process.env.NODE_ENV === 'production',
  watch: process.env.NODE_ENV === 'development',
  // external: [...external, "esbuild", "rollup", "vite"],
};

console.log(process.env.NODE_ENV);

async function buildCommon() {
  return build({
    ...sharedConfig,
    format: 'cjs',
    outfile: 'dist/index.cjs.js',
  });
}

async function buildEsm() {
  return build({
    ...sharedConfig,
    format: 'esm',
    outfile: 'dist/index.es.js',
  });
}

async function buildBundle() {
  await buildCommon();
  await buildEsm();
}

buildBundle();
