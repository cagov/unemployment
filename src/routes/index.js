const { Router } = require("express");
const singlePageApp = require("./single-page-app");
const createRetroCertsRouter = require("./retro-certs");

function createRouter() {
  const router = Router();

  router.use(createRetroCertsRouter());

  /**
   * Frontend web page router. This uses a wildcard, so we place it
   * after all other routes.
   */
  router.use(singlePageApp);

  return router;
}

module.exports = createRouter;
