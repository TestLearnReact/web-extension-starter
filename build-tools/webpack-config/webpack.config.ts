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

  // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  // externalsPresets: {
  //     node: true // in order to ignore built-in modules like path, fs, etc.
  // },

  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },

  mode: nodeEnv,

  // entry: {
  //   "background/index": res("background", "main.ts"),
  //   "contentScripts/index.global": res(
  //     "contentScripts",
  //     "cs-scripts",
  //     "main.ts"
  //   ),
  //   "contentScripts/index.toolbar": res(
  //     "contentScripts",
  //     "cs-scripts",
  //     "toolbar.ts"
  //   ),
  //   "contentScripts/index.sidebar": res(
  //     "contentScripts",
  //     "cs-scripts",
  //     "sidebar.ts"
  //   ),
  //   "popup/popup": res("popup", "main.tsx"),
  //   "options/options": res("options", "main.tsx"),
  // },

  entry: {
    //"contentScripts/vendor": { import: ["react", "react-dom"] },
    "background/index": { import: res("background", "main.ts") },
    //reactvendors: { import: ["react", "react-dom"] },
    "contentScripts/index.global": {
      import: res("contentScripts", "cs-scripts", "main.ts"),
      //dependOn: "vendor",
    },
    "contentScripts/index.toolbar": {
      import: res("contentScripts", "cs-scripts", "toolbar.ts"),
      //chunkLoading: "contentScripts/content-vendor-toolbar",
      //dependOn: "contentScripts/vendor",
    },
    "contentScripts/index.sidebar": {
      import: res("contentScripts", "cs-scripts", "sidebar.ts"),
      //dependOn: "shared",
    },
    "popup/popup": { import: res("popup", "main.tsx") },
    "options/options": { import: res("options", "main.tsx") },
    //"react-vendors": ["react", "react-dom"],
    //shared: "react",
  },

  //target: "node",

  output: {
    path: resRoot("extension", targetBrowser), //path.join(destPath, targetBrowser),
    filename: "dist/[name].js", //[contenthash]
    //clean: true,
    // chunkFilename: "dist/[name].js",
    // publicPath: "/dist/",
    //globalObject: "this",
    publicPath: "/",
    //ecmaVersion: 5,
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
    new webpack.ids.DeterministicChunkIdsPlugin({
      maxLength: 5,
    }),

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
    }),
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
    new HtmlWebpackPlugin({
      template: res("popup", "index.html"),
      inject: "body",
      chunks: ["popup/popup"],
      hash: true,
      filename: "dist/popup/index.html",
    }),
    new HtmlWebpackPlugin({
      template: res("options", "index.html"),
      inject: "body",
      chunks: ["options/options"],
      hash: true,
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
    // plugin to enable browser reloading in development mode
    /// extensionReloaderPlugin,

    // // // new webpack.ProvidePlugin({
    // // //   React: 'react'
    // // // }),

    // // // new Dotenv({
    // // //   path: './config/.env'
    // // // })
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   minSize: 10000,
    //   maxSize: 30000,
    // }),
  ],
  optimization: {
    chunkIds: false,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "async",
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "Vendors_Lodash_D3",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },
  context: __dirname,
  // optimization: {
  //   //minimize: false,
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     //minSize: 5000,
  //     cacheGroups: {
  //       /*
  //           // Manifest v3 doesn't seem to support bundle splitting
  //           backgroundVendor: {
  //               test: /[\\/]node_modules[\\/]/,
  //               name: "background-vendor",
  //               enforce: true,
  //               chunks: (chunk) => {
  //                   return chunk.name === "background";
  //               }
  //           },
  //           */
  //       // contentVendor: {
  //       //   test: /[\\/]node_modules[\\/]/,
  //       //   name: "contentScripts/content-vendor-global",
  //       //   enforce: true,
  //       //   chunks: (chunk) => {
  //       //     return (
  //       //       chunk.name === "contentScripts/index.global"
  //       //       //chunk.name === "contentScripts/index.toolbar" ||
  //       //       //chunk.name === "contentScripts/index.sidebar"
  //       //     );
  //       //   },
  //       // },

  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all",
  //       },
  //       // vendors: {
  //       //   //minChunks: 30,
  //       //   test: /[\\/]node_modules[\\/]/,
  //       //   name: "vendors",
  //       //   priority: -10,
  //       //   chunks: "initial",

  //       // },
  //       // // contentVendor1: {
  //       // //   test: /[\\/]node_modules[\\/]/,
  //       // //   name: "vendor-toolbar.js",
  //       // //   enforce: true,
  //       // //   chunks: (chunk) => {
  //       // //     return chunk.name === "contentScripts/index.toolbar";
  //       // //   },
  //       // // },
  //       // contentVendor2: {
  //       //   test: /[\\/]node_modules[\\/]/,
  //       //   name: "contentScripts/content-vendor-sidebar",
  //       //   enforce: true,
  //       //   chunks: (chunk) => {
  //       //     return chunk.name === "contentScripts/index.sidebar";
  //       //   },
  //       // },
  //       // optionsVendor: {
  //       //   test: /[\\/]node_modules[\\/]/,
  //       //   name: "options-vendor",
  //       //   enforce: true,
  //       //   chunks: (chunk) => {
  //       //     return chunk.name === "options";
  //       //   },
  //       // },
  //     },
  //   },
  // },

  // optimization: {
  //   minimizer: [
  //     new ESBuildMinifyPlugin({
  //       target: "ESNext", // Syntax to compile to (see options below for possible values)
  //     }),
  //   ],
  // },

  // optimization: {
  //   splitChunks: {
  //     chunks: "async",
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  // },
  // optimization: {
  //   // splitChunks: { chunks: "all" }, //

  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "initial",
  //       },
  //     },
  //   },

  //   minimize: true,
  //   minimizer: [
  //     // todo esbuild
  //     // //   new TerserPlugin({
  //     // //     parallel: true,
  //     // //     terserOptions: {
  //     // //       format: {
  //     // //         comments: false,
  //     // //       },
  //     // //     },
  //     // //     extractComments: false,
  //     // //   }),
  //     // new OptimizeCSSAssetsPlugin({
  //     //   cssProcessorPluginOptions: {
  //     //     preset: ["default", { discardComments: { removeAll: true } }],
  //     //   },
  //     // }),
  //     // @ts-ignore todo declare global
  //     // // new FilemanagerPlugin({
  //     // //   events: {
  //     // //     onEnd: {
  //     // //       archive: [
  //     // //         {
  //     // //           format: "zip",
  //     // //           source: path.join(destPath, targetBrowser),
  //     // //           destination: `${path.join(
  //     // //             destPath,
  //     // //             targetBrowser
  //     // //           )}.${getExtensionFileType(targetBrowser)}`,
  //     // //           options: { zlib: { level: 6 } },
  //     // //         },
  //     // //       ],
  //     // //     },
  //     // //   },
  //     // // }),
  //   ],
  // },

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
