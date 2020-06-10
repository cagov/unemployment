const { Router } = require("express");
const testAccounts = require("../data/test-accounts.json");
const AUTH_STRINGS = require("../data/authStrings");

function createRouter() {
  const router = Router();

  function authStatus(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    for (const testAccount of testAccounts) {
      if ((postJson.lastName || "").toLowerCase() === testAccount.lastName.toLowerCase()
          && postJson.ssn === testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = AUTH_STRINGS.statusCode.ok;
        responseJson.authToken = testAccount.authToken;
        responseJson.lastName = testAccount.lastName;
        responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
        break;
      } else if (postJson.ssn === testAccount.ssn
          && postJson.eddcan !== testAccount.eddcan) {
        responseJson.status = AUTH_STRINGS.statusCode.wrongEddcan;
        break;
      } else if (postJson.ssn !== testAccount.ssn
          && postJson.eddcan === testAccount.eddcan) {
        responseJson.status = AUTH_STRINGS.statusCode.wrongSsn;
        break;
      }
    }
    return responseJson;
  }

  function authWithToken(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    if (postJson.authToken) {
      for (const testAccount of testAccounts) {
        if (postJson.authToken === testAccount.authToken) {
          responseJson.status = AUTH_STRINGS.statusCode.ok;
          responseJson.lastName = testAccount.lastName;
          responseJson.weeksToCertify = Array.from(testAccount.weeksToCertify);
          break;
        }
      }
    }
    return responseJson;
  }

  router.post(AUTH_STRINGS.apiPath.login, (req, res) => {
    const responseJson = authStatus(req.body, {});
    const httpStatus = responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401

    res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
  });

  router.post(AUTH_STRINGS.apiPath.data, (req, res) => {
    const responseJson = authWithToken(req.body, {});
    const httpStatus = responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401

    res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
  });

  return router;
}

module.exports = createRouter;
