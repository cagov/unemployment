/**
 * This file configures how client-side JS bundles are compiled
 * for local development and production. This configuration is
 * used by the webpack CLI command.
 */
const AssetsPlugin = require("assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBar = require("webpackbar");
const path = require("path");
const webpack = require("webpack");

// Identify what environment we're bundling for
const env = process.env.NODE_ENV || "development";
const IS_DEV = env === "development";

// Setup our paths
const resolveApp = relativePath => path.resolve(__dirname, relativePath);
const paths = {
  appData: resolveApp("src/data/"),
  appPublic: resolveApp("public"),
  appSrc: resolveApp("src"),
  sharedModule: resolveApp("shared-module")
};

/**
 * Base configuration
 */
const config = {
  devtool: IS_DEV ? "cheap-module-source-map" : "source-map",
  entry: {
    // Note: the name of this is important, since it's used when manifest-scripts.json
    // is generated, which is a dependency on the server-side
    client: ["./src/client/index.js"]
  },
  mode: env,
  module: {
    rules: [
      // Transform ES6 with Babel
      // See babel.config.js for info about what transformations are ran
      {
        test: /\.js$/,
        include: [paths.appSrc, paths.sharedModule],
        loader: require.resolve("babel-loader")
      }
    ]
  },
  output: {
    filename: "build/js/client.[chunkhash:8].js",
    chunkFilename: "build/js/[name].[chunkhash:8].js",
    path: paths.appPublic,
    publicPath: "/"
  },
  plugins: [
    // Output our JS file paths in a manifest file
    new AssetsPlugin({
      path: paths.appData,
      filename: "manifest-scripts.json"
    }),
    // Show a visual progress bar in the CLI
    new WebpackBar({
      name: "Client-side JS bundle"
    })
  ],
  resolve: {
    aliasFields: ["browser"]
  }
};

/**
 * Development configuration additions
 */
if (IS_DEV) {
  console.log(
    "👀 Webpack will run in watch mode and compile client-side JS files when they change"
  );
  config.stats = "errors-warnings";
  config.watch = true;
  config.watchOptions = {
    ignored: /node_modules/
  };
}

/**
 * Production configuration additions
 */
if (!IS_DEV) {
  console.log("📦 Webpack optimizations");

  config.optimization = {
    // Minify the output
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        // Retain source map
        sourceMap: true
      })
    ]
  };

  config.plugins = [
    ...config.plugins,
    // Define process.env.NODE_ENV for optimized React bundles
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ];
}

// Visualize the bundle and its dependencies
// Set `WEBPACK_ANALYZE_BUNDLE` on the command line to enable
if (process.env.WEBPACK_ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
