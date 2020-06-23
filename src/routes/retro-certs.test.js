/**
 * @jest-environment node
 */

import { init } from "../app";
import AUTH_STRINGS from "../data/authStrings";
import cosmos from "../data/cosmos";
import fflip from "fflip";
import request from "supertest";
import ReCaptcha from "../services/reCaptcha";

describe("Router: API tests", () => {
  it("retro-certs POST feature disabled", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = Object.values(AUTH_STRINGS.apiPath);

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(404);
      expect(res.text).toMatch(/Cannot POST/);
    }
  });

  it("retro-certs POST feature enabled", async () => {
    fflip.features.retroCerts.enabled = true;
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
    fflip.features.retroCerts.enabled = true;
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
          seekWorkPlan: ["UI full time", "UI part time"],
        },
        { authToken: "test auth token" },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          authToken: "test auth token",
          weeksToCertify: [0, 1],
          seekWorkPlan: ["UI full time", "UI part time"],
        },
      ],
      // User has correct credentails, but recaptcha is not valid.
      [
        { lastName: "Last", dob: "2000-0101", ssn: "123456789" },
        false,
        {
          id: "hash",
          weeksToCertify: [0, 1],
          seekWorkPlan: ["UI full time", "UI part time"],
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
    fflip.features.retroCerts.enabled = true;
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
          seekWorkPlan: ["UI full time", "UI part time"],
        },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
          seekWorkPlan: ["UI full time", "UI part time"],
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        {
          id: "hash",
          weeksToCertify: [0, 1],
          seekWorkPlan: ["UI full time"],
        },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
          seekWorkPlan: ["UI full time"],
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        { id: "hash", weeksToCertify: [2], seekWorkPlan: ["PUA full time"] },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [2],
          seekWorkPlan: ["PUA full time"],
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
});
