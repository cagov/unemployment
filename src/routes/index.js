const { Router } = require("express");
const singlePageApp = require("./single-page-app");

const router = Router();

/**
 * Frontend web page router. This uses a wildcard, so we place it
 * after all other routes.
 */
router.use(singlePageApp);

module.exports = router;
