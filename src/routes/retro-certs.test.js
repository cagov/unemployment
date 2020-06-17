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
    const getUserByNameEddcanSsnMock = jest.spyOn(
      cosmos,
      "getUserByNameEddcanSsn"
    );
    getUserByNameEddcanSsnMock.mockImplementation(
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
    expect(getUserByNameEddcanSsnMock.mock.calls).toEqual([
      ["", undefined, undefined],
    ]);

    getUserByNameEddcanSsnMock.mockRestore();
  });

  it("retro-certs /api/login tests", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    // Format of each test case is:
    //   post body,
    //   recaptchaResponse,
    //   getUserByNameEddcanSsn promise response,
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
        { lastName: "Last", eddcan: "1234567890", ssn: "123456789" },
        true,
        { id: "hash", weeksToCertify: [0, 1] },
        { authToken: "test auth token" },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          authToken: "test auth token",
          weeksToCertify: [0, 1],
        },
      ],
      // User has correct credentails, but recaptcha is not valid.
      [
        { lastName: "Last", eddcan: "1234567890", ssn: "123456789" },
        false,
        { id: "hash", weeksToCertify: [0, 1] },
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
      const getUserByNameEddcanSsnMock = jest.spyOn(
        cosmos,
        "getUserByNameEddcanSsn"
      );
      getUserByNameEddcanSsnMock.mockImplementation(
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
      getUserByNameEddcanSsnMock.mockRestore();
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
        { id: "hash", weeksToCertify: [0, 1] },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
        },
      ],
      [
        { authToken: "valid uuid" },
        { id: "hash", authToken: "auth token" },
        { id: "hash", weeksToCertify: [2] },
        200,
        {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [2],
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
