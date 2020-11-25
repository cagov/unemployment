/* eslint-disable no-console */
const { Router } = require("express");
const AUTH_STRINGS = require("../data/authStrings");
const cosmos = require("../data/cosmos");

function createRouter() {
  const router = Router();

  async function staffViewAuthStatus(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    const userRecord = await cosmos.getUserByNameDobSsn(
      postJson.lastName || "",
      postJson.dob,
      postJson.ssn
    );
    if (!userRecord) {
      console.log("failed staff view login");
      return responseJson;
    }

    console.log("staff view login", userRecord.id);
    userRecord.staffLastViewedAt = Date.now();
    await cosmos.updateUserData(userRecord);

    responseJson.status = AUTH_STRINGS.statusCode.ok;
    responseJson.weeksToCertify = userRecord.weeksToCertify;
    responseJson.programPlan = userRecord.programPlan;
    responseJson.lastName = postJson.lastName;

    const formRecord = await cosmos.getFormDataByUserId(userRecord.id);

    if (formRecord) {
      responseJson.formData = formRecord.formData;
      responseJson.confirmationNumber = formRecord.confirmationNumber;
      responseJson.authToken = !!formRecord.authToken;
    }

    return responseJson;
  }

  async function authWithToken(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    if (postJson.authToken) {
      const formRecord = await cosmos.getFormDataByAuthToken(
        postJson.authToken
      );
      if (formRecord) {
        console.log("data with token", formRecord.id);
        const userRecord = await cosmos.getUserById(formRecord.id);
        responseJson.status = AUTH_STRINGS.statusCode.ok;
        responseJson.weeksToCertify = userRecord.weeksToCertify;
        responseJson.programPlan = userRecord.programPlan;
        responseJson.formData = formRecord.formData;
        responseJson.confirmationNumber = formRecord.confirmationNumber;
      } else {
        console.log("data with invalid token", postJson.authToken);
      }
    }
    return responseJson;
  }

  router.post(AUTH_STRINGS.staffView.login, async (req, res) => {
    try {
      const responseJson = await staffViewAuthStatus(req.body, {});
      const httpStatus =
        responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401;

      res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
    } catch (e) {
      console.error("Error during staff-view/api/login", e);
      res.status(500).send();
    }
  });

  router.post(AUTH_STRINGS.apiPath.login, async (req, res) => {
    console.error("Login after end of retroactive certification period");
    res.status(500).send();
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

  router.post(AUTH_STRINGS.apiPath.save, async (req, res) => {
    console.error("Save after end of retroactive certification period");
    res.status(500).send();
  });

  return router;
}

module.exports = createRouter;
