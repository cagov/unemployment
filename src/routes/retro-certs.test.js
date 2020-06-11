import { init } from "../app";
import AUTH_STRINGS from "../data/authStrings";
import fflip from "fflip";
import request from "supertest";

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
    const server = init();
    const testPaths = Object.values(AUTH_STRINGS.apiPath);

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({status: AUTH_STRINGS.statusCode.userNotFound});
    }
  });

  it("retro-certs /api/login tests", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    const testCases = [
      [{}, 401, {status: AUTH_STRINGS.statusCode.userNotFound}],
      [{lastName: "Last", eddcan: "1234567890", ssn: "123456789"}, 200, {
        status: AUTH_STRINGS.statusCode.ok,
        authToken: "e882639f-07b9-423d-9e1e-5f6b594b60eb",
        lastName: "Last",
        weeksToCertify: [0, 1]}],
      [{lastName: "Incorrect", eddcan: "1234567890", ssn: "0"}, 401, {
        status: AUTH_STRINGS.statusCode.wrongSsn}],
      [{lastName: "Incorrect", eddcan: "0", ssn: "123456789"}, 401, {
        status: AUTH_STRINGS.statusCode.wrongEddcan}],
      [{lastName: "Incorrect", eddcan: "1234567890", ssn: "123456789"}, 401, {
        status: AUTH_STRINGS.statusCode.userNotFound}],
      [{lastName: "LaSt", eddcan: "1111122222", ssn: "888990000"}, 200, {
        status: AUTH_STRINGS.statusCode.ok,
        authToken: "0be63615-6f3f-4e1f-a104-f1fab45c126b",
        lastName: "Last",
        weeksToCertify: [2]}]
    ];

    for (const testCase of testCases) {
      const [reqJson, httpStatus, responseJson] = testCase;
      const res = await request(server)
          .post(AUTH_STRINGS.apiPath.login)
          .send(JSON.stringify(reqJson))
          .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);
    }
  });

  it("retro-certs /api/data tests", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    const testCases = [
      [{}, 401, {status: AUTH_STRINGS.statusCode.userNotFound}],
      [{authToken: "26bdb68a-7e0b-42aa-9b5b-d820507eddc9"}, 401, {
        status: AUTH_STRINGS.statusCode.userNotFound}],
      [{authToken: "e882639f-07b9-423d-9e1e-5f6b594b60eb"}, 200, {
        status: AUTH_STRINGS.statusCode.ok,
        lastName: "Last",
        weeksToCertify: [0, 1]}],
      [{authToken: "0be63615-6f3f-4e1f-a104-f1fab45c126b"}, 200, {
        status: AUTH_STRINGS.statusCode.ok,
        lastName: "Last",
        weeksToCertify: [2]}]
      ];

    for (const testCase of testCases) {
      const [reqJson, httpStatus, responseJson] = testCase;
      const res = await request(server)
          .post(AUTH_STRINGS.apiPath.data)
          .send(JSON.stringify(reqJson))
          .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);
    }
  });
});
