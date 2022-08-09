import path from "path";
const resolve = path.resolve;
import webpack, { Configuration } from "webpack";

import FilemanagerPlugin from "filemanager-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WextManifestWebpackPlugin from "wext-manifest-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

import { ESBuildMinifyPlugin } from "esbuild-loader";

import { isDev } from "../dev-scripts/utils";

////const Dotenv = require('dotenv-webpack')
const nodeExternals = require("webpack-node-externals");

const resRoot = (...args: string[]) => resolve(__dirname, "../../", ...args);
const res = (...args: string[]) =>
  resolve(__dirname, "../../src/browser-shell/", ...args);

const viewsPath = path.join(__dirname, "views");
const sourcePath = path.join(__dirname, "source");
//const destPath = resRoot("extension"); // path.join(__dirname, "extension");
export const nodeEnv = (process.env.NODE_ENV ||
  "development") as Configuration["mode"];
const targetBrowser = process.env.TARGET_BROWSER || "";

export const getExtensionFileType = (browser) => {
  if (browser === "opera") return "crx";
  if (browser === "firefox") return "xpi";
  return "zip";
};

const config: Configuration = {
  devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342

  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },

  mode: nodeEnv,

  entry: {
    // "vendor-xxx": {
    //   import: "react", //res("contentScripts", "vendor.ts"),
    //   runtime: "runtime",
    // },
    // "vendor-yyy": {
    //   import: "react-dom", //res("contentScripts", "vendor.ts"),
    //   runtime: "runtime",
    // },
    "background/index": { import: res("background", "main.ts") },
    "contentScripts/index.global": {
      import: res("contentScripts", "cs-scripts", "main.ts"),
      //dependOn: "vendor-xxx", //["react", "react-dom", "styled-components"],
    },
    "contentScripts/index.toolbar": {
      import: res("contentScripts", "cs-scripts", "toolbar.ts"),
      //dependOn: ["vendor-xxx", "vendor-yyy"], //["react", "react-dom", "styled-components"],
    },
    "contentScripts/index.sidebar": {
      import: res("contentScripts", "cs-scripts", "sidebar.ts"),
      //dependOn: ["vendor-xxx", "vendor-yyy"], //["react", "react-dom", "styled-components"],
    },
  },

  optimization: {
    splitChunks: {
      chunks: "all",

      // cacheGroups: {
      //   vendor: {
      //     name: "node_vendors",
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: "all",
      //   },
      // },
      // cacheGroups: {
      //   react: {
      //     test: /[\\/]node_modules[\\/]react[\\/]/,
      //     name: "react",
      //     chunks: "all",
      //   },
      //   "react-dom": {
      //     test: /[\\/]node_modules[\\/]react-dom[\\/]/,
      //     name: "react-dom",
      //     chunks: "all",
      //   },
      //   "styled-components": {
      //     test: /[\\/]node_modules[\\/]styled-components[\\/]/,
      //     name: "styled-components",
      //     chunks: "all",
      //   },
      // },
    },
  },

  output: {
    path: resRoot("extension-vite", targetBrowser),
    filename: "dist/[name].js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "webextension-polyfill": resRoot(
        "node_modules/webextension-polyfill/dist",
        "browser-polyfill.js"
      ),
      "~": resRoot("src"),
    },
  },

  module: {
    rules: [
      {
        type: "javascript/auto", // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: "wext-manifest-loader",
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "ESNext", //"es2016",
          ///tsconfigRaw: require(resRoot("tsconfig.json")),
          jsxFactory: "React.createElement",
          jsxFragment: "React.Fragment",
          // //   sourcemap: true, //nodeEnv === "development",
        },
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader, // It creates a CSS file per JS file which contains CSS
      //     },
      //     {
      //       loader: "css-loader", // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             [
      //               "autoprefixer",
      //               {
      //                 // Options
      //               },
      //             ],
      //           ],
      //         },
      //       },
      //     },
      //     "resolve-url-loader", // Rewrites relative paths in url() statements
      //     "sass-loader", // Takes the Sass/SCSS file and compiles to the CSS
      //   ],
      // },
    ],
  },

  plugins: [
    // Plugin to not generate js bundle for manifest entry
    // @ts-ignore
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({ filename: false }),
    /// new ForkTsCheckerWebpackPlugin(),
    // environmental variables
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      TARGET_BROWSER: "chrome",
    }),
    new webpack.DefinePlugin({
      __DEV__: isDev,
      __IS_WEBPACK__: true,
      __IS_VITE__: false,
      __IS_CRXJS__: false,
    }),
    // delete previous build files
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     path.join(process.cwd(), `extension/${targetBrowser}`),
    //     path.join(
    //       process.cwd(),
    //       `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
    //     ),
    //   ],
    //   cleanStaleWebpackAssets: false,
    //   verbose: true,
    // }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    // copy static assets
    new CopyWebpackPlugin({
      patterns: [
        { from: "../../public/assets", to: "assets" },
        {
          from: "../../node_modules/webextension-polyfill/dist/browser-polyfill.js",
          to: "lib/browser-polyfill.js",
        },
      ],
    }),
  ],

  context: __dirname,
};

export {};

export default config;
