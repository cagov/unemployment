/**
 * @file Wildcard routes that render static HTML. See App.js for specifics
 * on what routes are valid and the content each renders
 */
const { Router } = require("express");
const getCdnPath = require("../utils/getCdnPath");
const manifestScripts = require("../data/manifest-scripts.json");
const manifestStyles = require("../data/manifest-styles.json");
const pageRoutes = require("../data/routes");

const singlePageAppRouter = Router();

singlePageAppRouter.get("/*", (req, res) => {
  const cssURL = getCdnPath(`/build/css/${manifestStyles["App.css"]}`);

  const shouldRedirect = !Object.values(pageRoutes)
    .map((r) => r.path)
    .includes(req.path);
  if (shouldRedirect) {
      res.status(301).location(pageRoutes.home.path).send();
      return;
  }

  res.status(200).send(
    `<!doctype html>
    <html lang="en">
    <head>
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-3419582-2"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        // For details see: https://support.google.com/analytics/answer/9310895?hl=en
        gtag('config', 'UA-3419582-2'); // www.ca.gov
        gtag('config', 'UA-3419582-31'); // edd.ca.gov
      </script>
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
