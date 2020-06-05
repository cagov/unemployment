const { Router } = require("express");
const { v4: uuidv4 } = require('uuid');
const testAccounts = require("../data/test-accounts.json");

function createRouter() {
  const router = Router();

  function authStatus(postJson) {
    for (const testAccount of testAccounts) {
      if ((postJson.lastName || "").toLowerCase() === testAccount.lastName
          && postJson.ssn === testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        return "OK";
      } else if (postJson.ssn === testAccount.ssn
          && postJson.eddcan !== testAccount.eddcan) {
        return "wrong-eddcan";
      } else if (postJson.ssn !== testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        return "wrong-ssn";
      }
    }
    return "user-not-found";
  }

  router.post("/retroactive-certification/api/login", (req, res) => {
    const status = authStatus(req.body);
    const httpStatus = status === "OK" ? 200 : 401

    const responseJson = {
      status
    };
    if (status === "OK") {
      responseJson.authToken = uuidv4();
    }
    res.status(httpStatus).type('json').send(JSON.stringify(responseJson));
  });

  return router;
}

module.exports = createRouter;
