/**
 * @file Express application configuration and setup, including our
 *  middleware, routes, and authentication.
 */
const express = require("express");
const helmet = require("helmet");
const createRouter = require("./routes");
const fflip = require("fflip");
const fflipConfig = require("./data/fflipConfig");
const { createRetroCertDatabaseIfNeeded } = require("./data/cosmos");

const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = 50;
https.globalAgent.maxSockets = 50;

// Load default feature flag values.
fflip.config(fflipConfig);

/**
 * @returns {object} Express application
 */
function init() {
  retroCertsIfEnabled();

  const app = express();

  /**
   * Ensure we're accurately setting req.ip, which is important
   * if we're rate-limiting by IP address.
   * @see https://expressjs.com/en/guide/behind-proxies.html
   */
  app.set("trust proxy", true);

  /**
   * Set various HTTP headers to reduce security vulnerabilities
   */
  app.use(helmet());

  // Enable parsing JSON sent in requests.
  app.use(express.json());

  // On dev, enable hot reloading
  if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.dev.config.js");
    const webpackCompiler = webpack(webpackConfig);

    app.use(
      require("webpack-dev-middleware")(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
      })
    );
    app.use(
      require("webpack-hot-middleware")(webpackCompiler, {
        path: "/__webpack_hmr",
      })
    );
  }

  /**
   * Serve static assets from the public/ directory. This middleware should
   * be included *before* our session middleware so that static asset requests
   * end here.
   *
   * On the frontend, these assets are referenced using CDN URLs, which
   * caches them and sets response headers according to our settings here.
   * If you need to bust the cache for things like fonts or images, use the
   * CDN Profile's "Purge" feature in Azure Portal.
   */
  app.use(
    express.static("public", {
      // ms format (https://www.npmjs.com/package/ms)
      maxAge: "14 days",
      setHeaders: (res, filePath) => {
        // Enable CORS to support loading font files from the CDN
        if (filePath.match(/\/fonts\//)) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "*");
        }
      },
    })
  );

  // Setup our routes
  app.use("/", createRouter());

  return app;
}

async function retroCertsIfEnabled() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.ENABLE_RETRO_CERTS === "1"
  ) {
    fflip.features.retroCerts.enabled = true;
    await createRetroCertDatabaseIfNeeded();
  }
}

module.exports = { init };
