const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const path = require("path");
const webpack = require("webpack");
const { I18NextHMRPlugin } = require("i18next-hmr/plugin");

// 👀 Webpack will run in watch mode and compile client-side JS files when they change

module.exports = merge(common, {
  mode: "development",
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
    new webpack.HotModuleReplacementPlugin(),
    new I18NextHMRPlugin({
      localesDir: path.resolve(__dirname, "src/data/locales"),
    }),
  ],
  stats: "errors-warnings",
  watch: true,
  watchOptions: {
    ignored: "/node_modules",
  },
});
