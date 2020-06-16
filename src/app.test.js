import { init } from "./app";
import fflip from "fflip";
import request from "supertest";

describe("Router: Single page app", () => {
  it("HTTP gets returning the single page", async () => {
    fflip.features.retroCerts.enabled = false;
    const server = init();
    const testPaths = ["/guide", "/guide/benefits", "/"];

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
    const testPaths = ["/does-not-exist", "/guide/"];

    for (const testPath of testPaths) {
      const res = await request(server).get(testPath);
      expect(res.status).toBe(404);
      expect(res.text).toMatch(/<html/);
      expect(res.text).toMatch(/<base href="\/">/);
    }
  });
});
