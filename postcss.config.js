/**
 * @file PostCSS configuration file, used for defining how our CSS files are compiled.
 * @see https://github.com/postcss/postcss
 * @see https://github.com/postcss/postcss-cli
 */
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const hash = require("postcss-hash");
const path = require("path");
const sass = require("@csstools/postcss-sass");

// Path to file where the generated CSS filenames will be stored for reference by our server
const manifestPath = "./src/data/manifest-styles.json";
const sassOptions = {
  includePaths: ["./src/client", "./node_modules"],
  sourceMap: true
};
const sourceMapOptions = { annotation: true, inline: false };

module.exports = context => {
  const isDevelopment = context.env === "development";

  return {
    map: sourceMapOptions,
    parser: "postcss-scss",
    plugins: [
      // Compile Sass to CSS
      sass(sassOptions),
      // Add browser prefixes to newer CSS properties
      autoprefixer,
      // Minify the .css file
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }]
      }),
      // Append cache-buster hash to filename and create the manifest file
      hash({
        manifest: manifestPath,
        name: generateHashedFilename(isDevelopment)
      })
    ]
  };
};

function generateHashedFilename(isDevelopment) {
  return function({ dir, name, hash, ext }) {
    if (isDevelopment) {
      // During development, we don't want to generate a new file
      // every time the CSS changes since that prevents live reloading
      return path.join(dir, name + ext);
    }

    return path.join(dir, name + "." + hash + ext);
  };
}
