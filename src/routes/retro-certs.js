const { Router } = require("express");
const AUTH_STRINGS = require("../data/authStrings");
const ReCaptcha = require("../services/reCaptcha");
const cosmos = require("../data/cosmos");

function createRouter() {
  const router = Router();

  async function authStatus(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;

    const reCaptcha = new ReCaptcha(postJson.reCaptcha);

    const [reCaptchaResponse, record] = await Promise.all([
      reCaptcha.validateUser(),
      cosmos.getUserByNameEddcanSsn(
        postJson.lastName || "",
        postJson.eddcan,
        postJson.ssn
      ),
    ]);

    if (!reCaptchaResponse) {
      responseJson.status = AUTH_STRINGS.statusCode.recaptchaInvalid;
      return responseJson;
    }

    if (record) {
      responseJson.status = AUTH_STRINGS.statusCode.ok;
      responseJson.authToken = await cosmos.createAuthTokenForUser(record.id);
      responseJson.weeksToCertify = Array.from(record.weeksToCertify);
    }
    return responseJson;
  }

  async function authWithToken(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    if (postJson.authToken) {
      const record = await cosmos.getUserByAuthToken(postJson.authToken);
      if (record) {
        responseJson.status = AUTH_STRINGS.statusCode.ok;
        responseJson.weeksToCertify = Array.from(record.weeksToCertify);
      }
    }
    return responseJson;
  }

  router.post(AUTH_STRINGS.apiPath.login, async (req, res) => {
    try {
      const responseJson = await authStatus(req.body, {});
      const httpStatus =
        responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401;

      res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
    } catch (e) {
      console.error("Error during /api/login", e);
      res.status(500).send();
    }
  });

  router.post(AUTH_STRINGS.apiPath.data, async (req, res) => {
    try {
      const responseJson = await authWithToken(req.body, {});
      const httpStatus =
        responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401;

      res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
    } catch (e) {
      console.error("Error during /api/data", e);
      res.status(500).send();
    }
  });

  return router;
}

module.exports = createRouter;
