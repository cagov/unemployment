const { Router } = require("express");
const testAccounts = require("../data/test-accounts.json");
const auth = require("../data/auth");

function createRouter() {
  const router = Router();

  function authStatus(postJson, responseJson) {
    responseJson.status = auth.statusCode.userNotFound;
    for (const testAccount of testAccounts) {
      if ((postJson.lastName || "").toLowerCase() === testAccount.lastName
          && postJson.ssn === testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = auth.statusCode.OK;
        responseJson.authToken = testAccount.authToken;
        responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
        break;
      } else if (postJson.ssn === testAccount.ssn
          && postJson.eddcan !== testAccount.eddcan) {
        responseJson.status = auth.statusCode.wrongEddcan;
        break;
      } else if (postJson.ssn !== testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = auth.statusCode.wrongSsn;
        break;
      }
    }
    return responseJson;
  }

  function authWithToken(postJson, responseJson) {
    responseJson.status = auth.statusCode.userNotFound;
    if (postJson.authToken) {
      for (const testAccount of testAccounts) {
        if (postJson.authToken === testAccount.authToken) {
          responseJson.status = auth.statusCode.OK;
          responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
          break;
        }
      }
    }
    return responseJson;
  }

  router.post(auth.apiPath.login, (req, res) => {
    const responseJson = authStatus(req.body, {});
    const httpStatus = responseJson.status === auth.statusCode.OK ? 200 : 401

    res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
  });

  router.post(auth.apiPath.data, (req, res) => {
    const responseJson = authWithToken(req.body, {});
    const httpStatus = responseJson.status === auth.statusCode.OK ? 200 : 401

    res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
  });

  return router;
}

module.exports = createRouter;
