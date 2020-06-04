const { Router } = require("express");

function createRouter() {
  const router = Router();

  router.post("/retroactive-certification/api/login", (req, res) => {
    // TODO: Validate the login information and send back an auth token.
    res.status(200).type('json').send(JSON.stringify({
      status: "OK",
      // For now, just echo the data back.
      echo: req.body
    }));
  });

  return router;
}

module.exports = createRouter;
