/**
 * Constants used by authentication.
 */

const retroCertsBasePath = "/retroactive-certification";

const auth = {
  AUTHTOKEN: "authToken", // Session storage key.
  apiPath: {
    login: retroCertsBasePath + "/api/login",
    data: retroCertsBasePath + "/api/data",
  },
  statusCode: {
    OK: "ok",
    notLoggedIn: "not-logged-in",
    userNotFound: "user-not-found",
    wrongEddcan: "wrong-eddcan",
    wrongSsn: "wrong-ssn",
  }
}

module.exports = auth;