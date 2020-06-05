import { init } from "./app";
import fflip from "fflip";
import request from "supertest";

describe("Router: Single page app", () => {
  it("HTTP gets returning the single page", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = [
      "/guide",
      "/guide/",
      "/guide/benefits",
      "/",
    ];

    for (const testPath of testPaths) {
      const res = await request(server).get(testPath);
      expect(res.status).toBe(200);
      expect(res.text).toMatch(/<html/);
      expect(res.text).toMatch(/<base href="\/">/);
    }
  });

  it("404 for pages that don't exist", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = [
      "/does-not-exist",
    ];

    for (const testPath of testPaths) {
      const res = await request(server).get(testPath);
      expect(res.status).toBe(404);
      expect(res.text).toMatch(/<html/);
      expect(res.text).toMatch(/<base href="\/">/);
    }
  });

  it("retro-certs POST feature disabled", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = [
      "/retroactive-certification/api/login",
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
    ];

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(401);
      expect(res.text).toMatch(/"status":"user-not-found"/);
    }
  });

  it("retro-certs login tests", async () => {
    fflip.features.retroCerts.enabled = true;
    const server = init();
    const testCases = [
      [{}, 401, {status:"user-not-found"}],
      [{lastName: "Last", eddcan: "1234567890", ssn: "123456789"}, 200, {
          status: "OK",
          authToken: ""}],
    ];

    for (const testCase of testCases) {
      const [reqJson, httpStatus, responseJson] = testCase;
      const res = await request(server)
          .post("/retroactive-certification/api/login")
          .send(JSON.stringify(reqJson))
          .type("json");
      expect(res.status).toBe(httpStatus);
      expect(res.header["content-type"]).toMatch(/json/);
      if (res.body.authToken) {
        res.body.authToken = "";
      }
      expect(res.body).toEqual(responseJson);
    }
  });
});
