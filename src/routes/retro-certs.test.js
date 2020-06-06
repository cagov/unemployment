import { init } from "../app";
import fflip from "fflip";
import request from "supertest";

describe("Router: API tests", () => {
  it("retro-certs POST feature disabled", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = [
      "/retroactive-certification/api/login",
      "/retroactive-certification/api/data",
    ];

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(404);
      expect(res.text).toMatch(/Cannot POST/);
    }
  });

  it("retro-certs POST feature enabled", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    const testPaths = [
      "/retroactive-certification/api/login",
      "/retroactive-certification/api/data",
    ];

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({"status": "user-not-found"});
    }
  });

  it("retro-certs /api/login tests", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    const testCases = [
      [{}, 401, {status:"user-not-found"}],
      [{lastName: "Last", eddcan: "1234567890", ssn: "123456789"}, 200, {
        status: "OK",
        authToken: "e882639f-07b9-423d-9e1e-5f6b594b60eb",
        weeksToCertify: ["2020-04-03", "2020-04-10"]}],
      [{lastName: "Incorrect", eddcan: "1234567890", ssn: "0"}, 401, {
        status: "wrong-ssn"}],
      [{lastName: "Incorrect", eddcan: "0", ssn: "123456789"}, 401, {
        status: "wrong-eddcan"}],
      [{lastName: "Incorrect", eddcan: "1234567890", ssn: "123456789"}, 401, {
        status: "user-not-found"}],
      [{lastName: "LaSt", eddcan: "1111122222", ssn: "888990000"}, 200, {
        status: "OK",
        authToken: "0be63615-6f3f-4e1f-a104-f1fab45c126b",
        weeksToCertify: ["2020-03-27"]}]
    ];

    for (const testCase of testCases) {
      const [reqJson, httpStatus, responseJson] = testCase;
      const res = await request(server)
          .post("/retroactive-certification/api/login")
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
      [{}, 401, {status:"user-not-found"}],
      [{authToken: "26bdb68a-7e0b-42aa-9b5b-d820507eddc9"}, 401, {
        status:"user-not-found"}],
      [{authToken: "e882639f-07b9-423d-9e1e-5f6b594b60eb"}, 200, {
        status:"OK",
        weeksToCertify: ["2020-04-03", "2020-04-10"]}],
      [{authToken: "0be63615-6f3f-4e1f-a104-f1fab45c126b"}, 200, {
        status:"OK",
        weeksToCertify: ["2020-03-27"]}]
      ];

    for (const testCase of testCases) {
      const [reqJson, httpStatus, responseJson] = testCase;
      const res = await request(server)
          .post("/retroactive-certification/api/data")
          .send(JSON.stringify(reqJson))
          .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body).toEqual(responseJson);
    }
  });
});
