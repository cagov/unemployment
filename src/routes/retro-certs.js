const { Router } = require("express");

function createRouter() {
  const router = Router();

  // An example post handler.
  router.post("/retroactive-certification/save-data", (req, res) => {
    res.status(501).send("Not implemented\n");
  });

  return router;
}

module.exports = createRouter;
