/**
 * @jest-environment node
 */

import { init } from "../app";
import AUTH_STRINGS from "../data/authStrings";
import cosmos from "../data/cosmos";
import request from "supertest";
import ReCaptcha from "../services/reCaptcha";
import programPlan from "../data/programPlan";

describe("Router: API tests", () => {
  it("retro-certs POST feature enabled", async () => {
    const getUserByNameDobSsnMock = jest.spyOn(cosmos, "getUserByNameDobSsn");
    getUserByNameDobSsnMock.mockImplementation(
      jest.fn(() => Promise.resolve(null))
    );

    const server = init();
    const testPaths = Object.values(AUTH_STRINGS.apiPath);

    for (const testPath of testPaths.slice(0, 1)) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        status: AUTH_STRINGS.statusCode.userNotFound,
      });
    }
    expect(getUserByNameDobSsnMock.mock.calls).toEqual([
      ["", undefined, undefined],
    ]);

    getUserByNameDobSsnMock.mockRestore();
  });

  it("retro-certs /api/login tests", async () => {
    const server = init();
    // Format of each test case is:
    //   post body,
    //   recaptchaResponse,
    //   getUserByNameDobSsn promise response,
    //   getFormDataByUserIdWithNewAuthToken promise response,
    //   expected http status,
    //   expected request response
    const testCases = [
      [
        {},
        true,
        null,
        null,
        401,
        { status: AUTH_STRINGS.statusCode.userNotFound },
      ],
      [
        {},
        false,
        null,
        null,
        401,
        { status: AUTH_STRINGS.statusCode.recaptchaInvalid },
      ],
      // User has correct credentials.
      [
        { lastName: "Last", dob: "2000-01-01", ssn: "123456789" },
        true,
        {
          id: "hash",
          weeksToCertify: [0, 1],
          programPlan: ["UI full time", "UI part time"],
        },
        { authToken: "test auth token" },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          authToken: "test auth token",
          weeksToCertify: [0, 1],
          programPlan: ["UI full time", "UI part time"],
        },
      ],
      // User has correct credentails, but recaptcha is not valid.
      [
        { lastName: "Last", dob: "2000-0101", ssn: "123456789" },
        false,
        {
          id: "hash",
          weeksToCertify: [0, 1],
          programPlan: ["UI full time", "UI part time"],
        },
        { authToken: "test auth token" },
        401,
        {
          status: AUTH_STRINGS.statusCode.recaptchaInvalid,
        },
      ],
    ];

    for (const testCase of testCases) {
      const [
        reqJson,
        recaptchaResponse,
        getUserResponse,
        getFormDataByUserIdWithNewAuthTokenResponse,
        httpStatus,
        responseJson,
      ] = testCase;
      const validateUserMock = jest.spyOn(ReCaptcha.prototype, "validateUser");
      validateUserMock.mockImplementation(() => recaptchaResponse);
      const getUserByNameDobSsnMock = jest.spyOn(cosmos, "getUserByNameDobSsn");
      getUserByNameDobSsnMock.mockImplementation(
        jest.fn(() => Promise.resolve(getUserResponse))
      );
      const getFormDataByUserIdWithNewAuthTokenMock = jest.spyOn(
        cosmos,
        "getFormDataByUserIdWithNewAuthToken"
      );
      getFormDataByUserIdWithNewAuthTokenMock.mockImplementation(
        jest.fn(() =>
          Promise.resolve(getFormDataByUserIdWithNewAuthTokenResponse)
        )
      );

      const res = await request(server)
        .post(AUTH_STRINGS.apiPath.login)
        .send(JSON.stringify(reqJson))
        .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);

      validateUserMock.mockRestore();
      getUserByNameDobSsnMock.mockRestore();
      getFormDataByUserIdWithNewAuthTokenMock.mockRestore();
    }
  });

  it("retro-certs /api/data tests", async () => {
    const server = init();
    // Format of each test case is:
    //   post body,
    //   getFormDataByAuthToken promise response,
    //   getUserById promise response,
    //   expected http status,
    //   expected request response

    const testCases = [
      [{}, null, null, 401, { status: AUTH_STRINGS.statusCode.userNotFound }],
      [
        { authToken: "invalid token" },
        null,
        null,
        401,
        {
          status: AUTH_STRINGS.statusCode.userNotFound,
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        {
          id: "hash",
          weeksToCertify: [0, 1],
          programPlan: ["UI full time", "UI part time"],
        },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
          programPlan: ["UI full time", "UI part time"],
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        {
          id: "hash",
          weeksToCertify: [0, 1],
          programPlan: ["UI full time"],
        },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
          programPlan: ["UI full time"],
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        { id: "hash", weeksToCertify: [2], programPlan: ["PUA full time"] },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [2],
          programPlan: ["PUA full time"],
        },
      ],
    ];

    for (const testCase of testCases) {
      const [
        reqJson,
        getFormDataByAuthTokenResponse,
        getUserByIdResponse,
        httpStatus,
        responseJson,
      ] = testCase;
      const getFormDataByAuthTokenMock = jest.spyOn(
        cosmos,
        "getFormDataByAuthToken"
      );
      getFormDataByAuthTokenMock.mockImplementation(
        jest.fn(() => Promise.resolve(getFormDataByAuthTokenResponse))
      );
      const getUserByIdMock = jest.spyOn(cosmos, "getUserById");
      getUserByIdMock.mockImplementation(
        jest.fn(() => Promise.resolve(getUserByIdResponse))
      );

      const res = await request(server)
        .post(AUTH_STRINGS.apiPath.data)
        .send(JSON.stringify(reqJson))
        .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);

      getFormDataByAuthTokenMock.mockRestore();
      getUserByIdMock.mockRestore();
    }
  });

  it("retro-certs /api/save tests", async () => {
    const server = init();
    // Format of each test case is:
    //   post body,
    //   getFormDataByAuthToken promise response,
    //   getUserById promise response,
    //   expected http status,
    //   expected request response

    const weekOfAnswers = {
      tooSick: false,
      couldNotAcceptWork: false,
      didYouLook: false,
      refuseWork: false,
      schoolOrTraining: false,
      workOrEarn: false,
    };

    const testCases = [
      [{}, null, null, 401, {}],
      [{ authToken: "INVALID_TOKEN" }, null, null, 401, {}],
      // Test the malicious input filter.
      [
        { authTOken: "TOKEN", formData: "<script>alert('hi')</script>" },
        { id: "ID" },
        { programPlan: [programPlan.uiFullTime], weeksToCertify: [0, 1] },
        400,
        "",
      ],
      // Save one week of 2.
      [
        {
          authToken: "TOKEN",
          formData: [weekOfAnswers],
          completed: false,
        },
        { id: "ID" },
        { programPlan: [programPlan.uiFullTime], weeksToCertify: [0, 1] },
        200,
        { status: "ok" },
      ],
      // Save 2 weeks of 2.
      [
        {
          authToken: "TOKEN",
          formData: [weekOfAnswers, weekOfAnswers],
          completed: true,
        },
        { id: "ID" },
        { programPlan: [programPlan.uiFullTime], weeksToCertify: [0, 1] },
        200,
        {
          status: "ok",
          confirmationNumber: "00000000-fake-mock-fake-123456789012",
        },
      ],
      // Save 2 weeks of 2, but not submitting the final page (user went back to week 1, then forward).
      [
        {
          authToken: "TOKEN",
          formData: [weekOfAnswers, weekOfAnswers],
          completed: false,
        },
        { id: "ID" },
        { programPlan: [programPlan.uiFullTime], weeksToCertify: [0, 1] },
        200,
        {
          status: "ok",
        },
      ],
      // Already have a confirmation number.
      [
        {
          authToken: "TOKEN",
          formData: [weekOfAnswers, weekOfAnswers],
          completed: true,
        },
        { id: "ID", confirmationNumber: "alreadyExists" },
        { programPlan: [programPlan.uiFullTime], weeksToCertify: [0, 1] },
        200,
        { status: "ok", confirmationNumber: "alreadyExists" },
      ],
    ];

    for (const testCase of testCases) {
      const [
        reqJson,
        getFormDataByAuthTokenResponse,
        getUserByIdResponse,
        httpStatus,
        responseJson,
      ] = testCase;
      const getFormDataByAuthTokenMock = jest.spyOn(
        cosmos,
        "getFormDataByAuthToken"
      );
      getFormDataByAuthTokenMock.mockImplementation(
        jest.fn(() => Promise.resolve(getFormDataByAuthTokenResponse))
      );
      const getUserByIdMock = jest.spyOn(cosmos, "getUserById");
      getUserByIdMock.mockImplementation(
        jest.fn(() => Promise.resolve(getUserByIdResponse))
      );
      const upsertFormDataMock = jest.spyOn(cosmos, "upsertFormData");
      upsertFormDataMock.mockImplementation(jest.fn(() => Promise.resolve()));

      const res = await request(server)
        .post(AUTH_STRINGS.apiPath.save)
        .send(JSON.stringify(reqJson))
        .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);

      getFormDataByAuthTokenMock.mockRestore();
      getUserByIdMock.mockRestore();
      upsertFormDataMock.mockRestore();
    }
  });

  describe("retro-certs staff view login", () => {
    const randomIpAddress = "70.191.9.39";
    const eddIpAddress = "192.168.2.33";
    const env = Object.assign({}, process.env);
    env.ALLOWED_IP_RANGES = "192.168.2.1-192.168.2.100";
    const server = init(env);
    const testPath = AUTH_STRINGS.staffView.login;

    it("redirects IPs that aren't allowed", async () => {
      const res = await request(server)
        .post(testPath)
        .set("X-Forwarded-For", randomIpAddress);
      expect(res.status).toBe(302);
    });

    it("returns user information for IPs that are allowed", async () => {
      const getUserByNameDobSsnMock = jest.spyOn(cosmos, "getUserByNameDobSsn");
      getUserByNameDobSsnMock.mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            id: "hash",
            weeksToCertify: [0, 1],
            programPlan: ["UI full time", "UI part time"],
          })
        )
      );

      const getFormDataByUserIdMock = jest.spyOn(cosmos, "getFormDataByUserId");
      getFormDataByUserIdMock.mockImplementation(
        jest.fn(() => Promise.resolve({ authToken: "test auth token" }))
      );

      const updateUserDataMock = jest.spyOn(cosmos, "updateUserData");
      updateUserDataMock.mockImplementation(jest.fn(() => Promise.resolve()));

      const res = await request(server)
        .post(testPath)
        .set("X-Forwarded-For", eddIpAddress)
        .send(
          JSON.stringify({
            lastName: "Last",
            dob: "2000-01-01",
            ssn: "123456789",
          })
        )
        .type("json");
      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual({
        status: AUTH_STRINGS.statusCode.ok,
        authToken: true,
        lastName: "Last",
        weeksToCertify: [0, 1],
        programPlan: ["UI full time", "UI part time"],
      });

      getUserByNameDobSsnMock.mockRestore();
      getFormDataByUserIdMock.mockRestore();
    });
  });
});
