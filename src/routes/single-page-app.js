/**
 * @file Wildcard routes that render static HTML. See App.js for specifics
 * on what routes are valid and the content each renders
 */
const { Router } = require("express");
const cdnPath = require("../utils/cdnPath");
const manifestScripts = require("../data/manifest-scripts.json");
const manifestStyles = require("../data/manifest-styles.json");
const pageRoutes = require("../data/routes");

const singlePageAppRouter = Router();

singlePageAppRouter.get("/*", (req, res) => {
  const cssURL = cdnPath(`/build/css/${manifestStyles["App.css"]}`);

  const is404 = !Object.values(pageRoutes)
    .map(r => r.path)
    .includes(req.path);
  const statusCode = is404 ? 404 : 200;

  res.status(statusCode).send(
    `<!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Benefits Screener</title>
      <meta name="description" content="Use this site to determine if you may be eligible for benefits!" />

      <link rel="stylesheet" href="${cssURL}" />
      <link rel="icon" href="${cdnPath("/favicon.ico")}" type="image/x-icon" />
      <script src="${cdnPath(manifestScripts.client.js)}" defer></script>
    </head>
    <body>
      <div id="root"></div>
    </body>
</html>`
  );
});

module.exports = singlePageAppRouter;
