/**
 * This file configures how client-side JS bundles are compiled
 * for local development and production. This configuration is
 * used by the webpack CLI command.
 */
const AssetsPlugin = require("assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");

// Setup our paths
const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);
const paths = {
  appData: resolveApp("src/data/"),
  appPublic: resolveApp("public"),
  appSrc: resolveApp("src"),
  sharedModule: resolveApp("shared-module"),
};

/**
 * Base configuration
 */
const config = {
  module: {
    rules: [
      // Transform ES6 with Babel
      // See babel.config.js for info about what transformations are ran
      {
        test: /\.js$/,
        include: [paths.appSrc, paths.sharedModule],
        loader: require.resolve("babel-loader"),
      },
    ],
  },
  output: {
    filename: "build/js/client.js",
    chunkFilename: "build/js/[name].js",
    path: paths.appPublic,
    publicPath: "/",
  },
  plugins: [
    // Output our JS file paths in a manifest file
    new AssetsPlugin({
      path: paths.appData,
      filename: "manifest-scripts.json",
    }),
  ],
  resolve: {
    aliasFields: ["browser"],
  },
};

// Visualize the bundle and its dependencies
// Set `WEBPACK_ANALYZE_BUNDLE` on the command line to enable
if (process.env.WEBPACK_ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
