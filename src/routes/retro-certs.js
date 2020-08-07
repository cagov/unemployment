/* eslint-disable no-console */
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const AUTH_STRINGS = require("../data/authStrings");
const ReCaptcha = require("../services/reCaptcha");
const cosmos = require("../data/cosmos");
const weeksCompleted = require("../utils/checkFormData");

function createRouter() {
  const router = Router();

  async function staffViewAuthStatus(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;
    const [userRecord] = await Promise.all([
      cosmos.getUserByNameDobSsn(
        postJson.lastName || "",
        postJson.dob,
        postJson.ssn
      ),
    ]);
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
    }

    return responseJson;
  }

  async function authStatus(postJson, responseJson) {
    responseJson.status = AUTH_STRINGS.statusCode.userNotFound;

    const reCaptcha = new ReCaptcha(postJson.reCaptcha);
    const isDev = process.env.NODE_ENV === "development";
    const [reCaptchaResponse, userRecord] = await Promise.all([
      isDev || reCaptcha.validateUser(),
      cosmos.getUserByNameDobSsn(
        postJson.lastName || "",
        postJson.dob,
        postJson.ssn
      ),
    ]);

    if (!reCaptchaResponse) {
      console.log("failed recaptcha");
      responseJson.status = AUTH_STRINGS.statusCode.recaptchaInvalid;
      return responseJson;
    }

    if (userRecord) {
      console.log("login", userRecord.id);
      const formRecord = await cosmos.getFormDataByUserIdWithNewAuthToken(
        userRecord.id
      );
      responseJson.status = AUTH_STRINGS.statusCode.ok;
      responseJson.authToken = formRecord.authToken;
      responseJson.weeksToCertify = userRecord.weeksToCertify;
      responseJson.programPlan = userRecord.programPlan;
      responseJson.formData = formRecord.formData;
      responseJson.confirmationNumber = formRecord.confirmationNumber;
    } else {
      console.log("failed login");
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

  async function saveFormData(postJson, responseJson) {
    if (postJson.authToken) {
      const formRecord = await cosmos.getFormDataByAuthToken(
        postJson.authToken
      );
      if (formRecord) {
        responseJson.status = AUTH_STRINGS.statusCode.ok;
        // If the user already submitted data, don't overwrite it.
        if (formRecord.confirmationNumber) {
          responseJson.confirmationNumber = formRecord.confirmationNumber;
        } else {
          const userRecord = await cosmos.getUserById(formRecord.id);

          formRecord.formData = postJson.formData;
          if (
            userRecord.weeksToCertify.length ===
              weeksCompleted(formRecord.formData, userRecord.programPlan) &&
            postJson.completed === true
          ) {
            formRecord.completedAt = Date.now();
            formRecord.confirmationNumber = uuidv4();
            responseJson.confirmationNumber = formRecord.confirmationNumber;
          }
          await cosmos.upsertFormData(formRecord);
          console.log(
            "saved data",
            postJson.authToken,
            responseJson.confirmationNumber || ""
          );
        }
      } else {
        console.log("save with invalid token", postJson.authToken);
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

  router.post(AUTH_STRINGS.apiPath.save, async (req, res) => {
    const formDataAsString = JSON.stringify(req.body.formData || {});
    // Reject inputs that might be trying to inject malicious scripts.
    if (formDataAsString.match(/<[^ ]/)) {
      console.log("rejected input", req.body.authToken);
      res.status(400).type("json").send();
      return;
    }

    try {
      const responseJson = await saveFormData(req.body, {});
      const httpStatus =
        responseJson.status === AUTH_STRINGS.statusCode.ok ? 200 : 401;

      res.status(httpStatus).type("json").send(JSON.stringify(responseJson));
    } catch (e) {
      console.error("Error during /api/save", e);
      res.status(500).send();
    }
  });

  return router;
}

module.exports = createRouter;
