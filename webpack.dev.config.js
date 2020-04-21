const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  entry: {
    client: [
      path.join(__dirname, "src/client/index.js"),
      "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
    ],
  },
  output: {
    hotUpdateChunkFilename: ".hot/hot-update.js",
    hotUpdateMainFilename: ".hot/hot-update.json",
  },
  watchOptions: {
    ignored: "/node_modules/",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
