/**
 * @file Wildcard routes that render static HTML. See App.js for specifics
 * on what routes are valid and the content each renders
 */
const { Router } = require("express");
const getCdnPath = require("../utils/getCdnPath");
const manifestScripts = require("../data/manifest-scripts.json");
const manifestStyles = require("../data/manifest-styles.json");
const pageRoutes = require("../data/routes");

const cryptoRandomString = require("crypto-random-string");
const buildPolicies = require("../utils/csp");

const singlePageAppRouter = Router();

singlePageAppRouter.get("/*", (req, res) => {
  const nonce = cryptoRandomString({ length: 32, type: "base64" });
  const contentSecurityPolicy = buildPolicies(nonce);

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
      <script src="/gtag.js" nonce="${nonce}"></script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Guide to applying for unemployment benefits</title>
      <meta name="description" content="" />

      <link rel="stylesheet" href="${cssURL}" />
      <link rel="icon" href="${getCdnPath(
        "/favicon.ico"
      )}" type="image/x-icon" />
      <script src="${getCdnPath(
        manifestScripts.client.js
      )}" nonce="${nonce}" defer></script>
    </head>
    <body>
      <div id="root"></div>
    </body>
</html>`
    );
});

module.exports = singlePageAppRouter;
