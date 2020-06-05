const { Router } = require("express");
const testAccounts = require("../data/test-accounts.json");

function createRouter() {
  const router = Router();

  function authStatus(postJson, responseJson) {
    responseJson.status = "user-not-found";
    for (const testAccount of testAccounts) {
      if ((postJson.lastName || "").toLowerCase() === testAccount.lastName
          && postJson.ssn === testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = "OK";
        responseJson.authToken = testAccount.authToken;
        responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
        break;
      } else if (postJson.ssn === testAccount.ssn
          && postJson.eddcan !== testAccount.eddcan) {
        responseJson.status = "wrong-eddcan";
        break;
      } else if (postJson.ssn !== testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = "wrong-ssn";
        break;
      }
    }
    return responseJson;
  }

  function authWithToken(postJson, responseJson) {
    responseJson.status = "user-not-found";
    if (postJson.authToken) {
      for (const testAccount of testAccounts) {
        if (postJson.authToken === testAccount.authToken) {
          responseJson.status = "OK";
          responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
          break;
        }
      }
    }
    return responseJson;
  }

  router.post("/retroactive-certification/api/login", (req, res) => {
    const responseJson = authStatus(req.body, {});
    const httpStatus = responseJson.status === "OK" ? 200 : 401

    res.status(httpStatus).type('json').send(JSON.stringify(responseJson));
  });

  router.post("/retroactive-certification/api/data", (req, res) => {
    const responseJson = authWithToken(req.body, {});
    const httpStatus = responseJson.status === "OK" ? 200 : 401

    res.status(httpStatus).type('json').send(JSON.stringify(responseJson));
  });

  return router;
}

module.exports = createRouter;
