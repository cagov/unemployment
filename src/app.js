/**
 * @file Express application configuration and setup, including our
 *  middleware, routes, and authentication.
 */
const express = require("express");
const ipfilter = require("express-ipfilter").IpFilter;
const IpDeniedError = require("express-ipfilter").IpDeniedError;
const helmet = require("helmet");
const createRouter = require("./routes");
const AUTH_STRINGS = require("./data/authStrings");
const { createRetroCertDatabase } = require("./data/cosmos");

const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = 50;
https.globalAgent.maxSockets = 50;

/**
 * @returns {object} Express application
 */
function init(env = process.env) {
  createRetroCertDatabase();

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
  if (env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.dev.config.js");
    const webpackCompiler = webpack(webpackConfig);

    app.use(
      require("webpack-dev-middleware")(webpackCompiler, {
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

  const clientIp = function (req, res) {
    return req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0]
      : "";
  };

  if (env.NODE_ENV !== "development") {
    const allowedIps = [];

    if (env.INDIVIDUAL_ALLOWED_IPS) {
      env.INDIVIDUAL_ALLOWED_IPS.split(" ").forEach((ip) =>
        allowedIps.push(ip)
      );
    }

    if (env.ALLOWED_IP_RANGES) {
      env.ALLOWED_IP_RANGES.split(" ").forEach((ipRange) => {
        allowedIps.push(ipRange.split("-"));
      });
    } else if (env.NODE_ENV !== "test") {
      // This needs to be set on all non-development environments for Staff View
      console.error(
        "env.ALLOWED_IP_RANGES has not been set on " + env.NODE_ENV
      );
    }

    app.use(
      AUTH_STRINGS.staffView.root,
      ipfilter(allowedIps, { mode: "allow", detectIp: clientIp })
    );
  }

  // Setup our routes
  app.use("/", createRouter());

  // If a non-EDD IP address tries to access staff view, log and redirect to home
  app.use((err, req, res, next) => {
    if (err instanceof IpDeniedError) {
      // eslint-disable-next-line no-console
      console.log("Access to staff view from non-EDD IP address denied");
      res.redirect("/");
    } else {
      next(err);
    }
  });

  return app;
}

module.exports = { init };
