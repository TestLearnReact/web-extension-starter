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

/// const TerserPlugin = require("terser-webpack-plugin");
/// const ExtensionReloader = require("webpack-extension-reloader");
/// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

//** */

const resRoot = (...args: string[]) => resolve(__dirname, "../../", ...args);
const res = (...args: string[]) =>
  resolve(__dirname, "../../src/browser-shell/", ...args);

const viewsPath = path.join(__dirname, "views");
const sourcePath = path.join(__dirname, "source");
const destPath = resRoot("extension"); // path.join(__dirname, "extension");
export const nodeEnv = (process.env.NODE_ENV ||
  "development") as Configuration["mode"];
const targetBrowser = process.env.TARGET_BROWSER || "";

// const ExtensionReloader = require('webpack-extension-reloader');
// const extensionReloaderPlugin =
//   nodeEnv === 'development'
//     ? new ExtensionReloader({
//         port: 9090,
//         reloadPage: true,
//         entries: {
//           // TODO: reload manifest on update
//           contentScript: 'contentScript',
//           background: 'background',
//           extensionPage: ['popup', 'options'],
//         },
//       })
//     : () => {
//         this.apply = () => {};
//       };

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
    "dist/background/background": res("background", "main.ts"),
    "dist/contentScripts/index.global": res(
      "contentScripts",
      "cs-scripts",
      "main.ts"
    ),
    "dist/contentScripts/index.toolbar": res(
      "contentScripts",
      "cs-scripts",
      "toolbar.ts"
    ),
    "dist/contentScripts/index.sidebar": res(
      "contentScripts",
      "cs-scripts",
      "sidebar.ts"
    ),
    // "dist/popup/popup": res("src", "popup", "main.tsx"),
    // "dist/options/options": res("src", "options", "main.tsx"),
    // manifest: path.join(sourcePath, "manifest.json"),
    // background: path.join(sourcePath, "Background", "index.ts"),
    // contentScript: path.join(sourcePath, "ContentScript", "index.ts"),
    // popup: path.join(sourcePath, "Popup", "index.tsx"),
    // options: path.join(sourcePath, "Options", "index.tsx"),
  },

  output: {
    path: path.join(destPath, targetBrowser),
    filename: "js/[name].bundle.js",
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
      // {
      //   test: /\.(js|ts)x?$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "ESNext", //"es2016",
          ///tsconfigRaw: require(resRoot("tsconfig.json")),
          // //   jsxFactory: "React.createElement",
          // //   jsxFragment: "React.Fragment",
          // //   sourcemap: true, //nodeEnv === "development",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // It creates a CSS file per JS file which contains CSS
          },
          {
            loader: "css-loader", // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "resolve-url-loader", // Rewrites relative paths in url() statements
          "sass-loader", // Takes the Sass/SCSS file and compiles to the CSS
        ],
      },
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
    new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET_BROWSER"]),
    // delete previous build files
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`
        ),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(viewsPath, "popup.html"),
    //   inject: "body",
    //   chunks: ["popup"],
    //   hash: true,
    //   filename: "popup.html",
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(viewsPath, "options.html"),
    //   inject: "body",
    //   chunks: ["options"],
    //   hash: true,
    //   filename: "options.html",
    // }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    // copy static assets
    // // new CopyWebpackPlugin({
    // //   patterns: [{ from: "source/assets", to: "assets" }],
    // // }),
    // plugin to enable browser reloading in development mode
    /// extensionReloaderPlugin,
  ],

  optimization: {
    minimize: true,
    minimizer: [
      // todo esbuild
      // //   new TerserPlugin({
      // //     parallel: true,
      // //     terserOptions: {
      // //       format: {
      // //         comments: false,
      // //       },
      // //     },
      // //     extractComments: false,
      // //   }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
      // @ts-ignore todo declare global
      // // new FilemanagerPlugin({
      // //   events: {
      // //     onEnd: {
      // //       archive: [
      // //         {
      // //           format: "zip",
      // //           source: path.join(destPath, targetBrowser),
      // //           destination: `${path.join(
      // //             destPath,
      // //             targetBrowser
      // //           )}.${getExtensionFileType(targetBrowser)}`,
      // //           options: { zlib: { level: 6 } },
      // //         },
      // //       ],
      // //     },
      // //   },
      // // }),
    ],
  },

  //** */

  //   entry: "./src/index.ts",
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(ts|js)?$/,
  //         exclude: /node_modules/,
  //         use: {
  //           loader: "babel-loader",
  //           options: {
  //             presets: ["@babel/preset-env", "@babel/preset-typescript"],
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   resolve: {
  //     extensions: [".ts", ".js"],
  //   },
  //   output: {
  //     path: path.resolve(__dirname, "dist"),
  //     filename: "bundle.js",
  //   },

  //   devServer: {
  //     static: path.join(__dirname, "dist"),
  //     compress: true,
  //     port: 4000,
  //   },
};

export {};

export default config;
