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
      "/retroactive-certification/save-data",
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
      "/retroactive-certification/save-data",
    ];

    for (const testPath of testPaths) {
      const res = await request(server).post(testPath);
      expect(res.status).toBe(501);
      expect(res.text).toMatch(/Not implemented/);
    }
  });
});