import { resolve } from "path";
import { Configuration } from "webpack";
import {
  getExtensionFileType,
  nodeEnv,
  sharedWebpackconfig,
  targetBrowser,
} from "./sharedWebpackConfig";

// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FilemanagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

const res = (...args: string[]) => resolve(__dirname, "../../", ...args);

const config: Configuration = {
  //devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342
  devtool: nodeEnv !== "production" ? "inline-source-map" : false,
  mode: nodeEnv,
  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },
  ...sharedWebpackconfig,

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],

    fallback: {
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      // // Check the initiating folder's node_modules
      // fallback: [path.join(__dirname, "node_modules")],
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
          target: "es2016",
          tsconfigRaw: require(res("./tsconfig.json")),
          jsxFactory: "React.createElement",
          jsxFragment: "React.Fragment",
          sourcemap: true, //nodeEnv === "development",
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
              // modules: true, //
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
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset/resource",
        // generator: {
        //   filename: "static/assets/images/[contenthash][ext][query]",
        // },
      },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
      // {
      //   test: /\.svg$/,
      //   use: ['@svgr/webpack']
      // },
      // {
      //   test: /\.(ogg|mp3|wav|mpe?g)$/i,
      //   // use: 'file-loader'
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/assets/audio/[contenthash][ext][query]'
      //   }
      // },
      {
        test: /favicon\.(png|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // Plugin to not generate js bundle for manifest entry
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({ filename: false }),
    // environmental variables
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "BUILD_TOOL",
      "TARGET_BROWSER",
      "CS_BUILD",
    ]),
    // global vars
    new webpack.DefinePlugin({
      __DEV__: false, // todo
      __BUILD_TOOL__: JSON.stringify("webpack"),
      __CS_BUILD__: process.env.CS_BUILD,
    }),
    // delete previous build files
    new CleanWebpackPlugin(),
    //
    new HtmlWebpackPlugin({
      template: res("scripts", "webpack", "htmlTemplates", "popup.html"),
      chunks: ["dist/popup/popup"],
      hash: true,
      filename: "dist/popup/index.html",
    }),
    new HtmlWebpackPlugin({
      template: res("scripts", "webpack", "htmlTemplates", "options.html"),
      chunks: ["dist/options/options"],
      hash: true,
      filename: "dist/options/index.html",
    }),
    new HtmlWebpackPlugin({
      template: res("scripts", "webpack", "htmlTemplates", "background.html"),
      chunks: ["dist/background/background"],
      hash: true,
      filename: "dist/background/index.html",
    }),
    new HtmlWebpackTagsPlugin({
      tags: ["lib/browser-polyfill.js"],
      append: false,
    }),
    // write css file(s) to build folder
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: res("../../public/assets"), to: "assets" },
        {
          from: res(
            "../../node_modules",
            "webextension-polyfill/dist/browser-polyfill.js"
          ),
          to: "lib",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2018", // Syntax to compile to (see options below for possible values)
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
      new FilemanagerPlugin({
        events: {
          onEnd: {
            archive: [
              {
                format: "zip",
                source: res("../../extWeb", targetBrowser),
                destination: `${res(
                  "../../extWeb",
                  targetBrowser
                )}.${getExtensionFileType(targetBrowser)}`,
                options: { zlib: { level: 6 } },
              },
            ],
          },
        },
      }),
    ],
  },
};

export default config;
