const { Router } = require("express");
const singlePageApp = require("./single-page-app");
const createRetroCertsRouter = require("./retro-certs");
const fflip = require("fflip");

function createRouter() {
  const router = Router();

  if (fflip.features.retroCerts.enabled) {
    router.use(createRetroCertsRouter())
  }

  /**
   * Frontend web page router. This uses a wildcard, so we place it
   * after all other routes.
   */
  router.use(singlePageApp);

  return router;
}

module.exports = createRouter;
