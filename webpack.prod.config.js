const { merge } = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = merge(common, {
  mode: "production",
  entry: {
    // Note: the name of this is important, since it's used when manifest-scripts.json
    // is generated, which is a dependency on the server-side
    client: ["./src/client/index.js"],
  },
  devtool: "source-map", // https://webpack.js.org/configuration/devtool/
  optimization: {
    // Minify the output
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        // Retain source map
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    ...config.plugins,
    // Define process.env.NODE_ENV for optimized React bundles
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
});
