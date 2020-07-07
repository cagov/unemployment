/**
 * @file Wildcard routes that render static HTML. See App.js for specifics
 * on what routes are valid and the content each renders
 */
const { Router } = require("express");
const getCdnPath = require("../utils/getCdnPath");
const manifestScripts = require("../data/manifest-scripts.json");
const manifestStyles = require("../data/manifest-styles.json");
const pageRoutes = require("../data/routes");

const buildPolicies = require("../utils/csp");

const singlePageAppRouter = Router();

singlePageAppRouter.get(
  "^/locales/:lang([a-zA-Z]{2})/translation.json",
  (req, res) => {
    try {
      const translation = require(`../data/locales/${req.params.lang}/translation.json`);
      res
        .status(200)
        .set({ Accept: "application/json" })
        .set("Cache-Control", "public, must-revalidate")
        .set("Referrer-Policy", "strict-origin-when-cross-origin")
        .send(translation);
    } catch {
      // Handles a request where the desired language does not exist
      res
        .status(404)
        .set("Referrer-Policy", "strict-origin-when-cross-origin")
        .send();
    }
  }
);

singlePageAppRouter.get("/*", (req, res) => {
  const contentSecurityPolicy = buildPolicies();

  const cssURL = getCdnPath(`/build/css/${manifestStyles["App.css"]}`);

  const is404 = Object.values(pageRoutes).indexOf(req.path) === -1;
  const statusCode = is404 ? 404 : 200;

  res
    .status(statusCode)
    .set("Referrer-Policy", "strict-origin-when-cross-origin")
    .send(
      `<!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}" >
      <base href="/">
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-3419582-2"></script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Guide to applying for unemployment benefits</title>
      <meta name="description" content="" />

      <link rel="stylesheet" href="${cssURL}" />
      <link rel="icon" href="${getCdnPath(
        "/favicon.ico"
      )}" type="image/x-icon" />
      <script src="${getCdnPath(manifestScripts.client.js)}" defer></script>
    </head>
    <body>
      <div id="root"></div>
    </body>
</html>`
    );
});

module.exports = singlePageAppRouter;
