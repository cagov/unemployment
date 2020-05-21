const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");

const { I18NextHMRPlugin } = require("i18next-hmr/plugin");

const env = "development";

module.exports = merge(common, {
  mode: env,
  entry: {
    client: [
      path.join(__dirname, "src/client/index.js"),
      "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
    ],
  },
  devtool: "eval-cheap-module-source-map", // https://webpack.js.org/configuration/devtool/
  output: {
    hotUpdateChunkFilename: ".hot/hot-update.js",
    hotUpdateMainFilename: ".hot/hot-update.json",
  },
  plugins: [
    // Show a visual progress bar in the CLI
    new WebpackBar({
      name: "Client-side JS bundle",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new I18NextHMRPlugin({
      localesDir: path.resolve(__dirname, "public/locales"),
    }),
  ],
  stats: "errors-warnings",
  // 👀 Webpack will run in watch mode and compile client-side JS files when they change
  watch: true,
  watchOptions: {
    ignored: "/node_modules",
  },
});
