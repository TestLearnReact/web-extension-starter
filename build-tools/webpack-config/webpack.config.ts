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

// const Dotenv = require('dotenv-webpack')
// const nodeExternals = require("webpack-node-externals");

const resRoot = (...args: string[]) => resolve(__dirname, "../../", ...args);
const res = (...args: string[]) =>
  resolve(__dirname, "../../src/browser-shell/", ...args);

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
    "contentScripts/vendor": { import: res("contentScripts", "vendor.ts") },
    "background/index": { import: res("background", "prod.ts") },
    "contentScripts/index.global": {
      import: res("contentScripts", "cs-scripts", "main.ts"),
      //dependOn: "contentScripts/vendor",
    },
    "contentScripts/index.toolbar": {
      import: res("contentScripts", "cs-scripts", "toolbar.ts"),
      //dependOn: "contentScripts/vendor",
    },
    "contentScripts/index.sidebar": {
      import: res("contentScripts", "cs-scripts", "sidebar.ts"),
      //dependOn: "contentScripts/vendor",
    },
    "popup/popup": { import: res("popup", "main.tsx") },
    "options/options": { import: res("options", "main.tsx") },
  },

  output: {
    path: resRoot("extension", targetBrowser),
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
    modules: [path.resolve(__dirname, "../../node_modules"), "node_modules"],
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
    // new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET_BROWSER"]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      TARGET_BROWSER: "chrome",
      IS_WEBPACK: true,
      IS_VITE: false,
      IS_CRXJS: false,
    }),
    // new webpack.ProvidePlugin({
    //   NODE_ENV: "development",
    //   TARGET_BROWSER: "chrome",
    //   IS_WEBPACK: true,
    //   IS_VITE: false,
    //   IS_CRXJS: false,
    // }),
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
    new HtmlWebpackPlugin({
      template: res("popup", "index.html"),
      inject: "body",
      chunks: ["popup/popup"],
      //hash: true,
      filename: "dist/popup/index.html",
    }),
    new HtmlWebpackPlugin({
      template: res("options", "index.html"),
      inject: "body",
      chunks: ["options/options"],
      //hash: true,
      filename: "dist/options/index.html",
    }),
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
