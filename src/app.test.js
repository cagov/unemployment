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
      expect(res.header["referrer-policy"]).toBe(
        "strict-origin-when-cross-origin"
      );
      expect(res.header["x-frame-options"]).toBe("SAMEORIGIN");
      expect(res.header["x-content-type-options"]).toBe("nosniff");
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

  describe("retroactive certification app", () => {
    const randomIpAddress = "70.191.9.39";
    const eddIpAddress = "192.168.2.33";
    const navaTeamIpAddress = "10.83.44.21";
    const testPaths = [
      "/retroactive-certification/staff-view",
      "/retroactive-certification/staff-view/claimant-status",
    ];

    const env = Object.assign({}, process.env);
    env.ENABLE_RETRO_CERTS = "1";
    env.ALLOWED_IP_RANGES = "192.168.2.1-192.168.2.100"; // these are EDD IPs in production
    env.INDIVIDUAL_ALLOWED_IPS = "10.83.44.22 10.83.44.21"; // these are Nava team IPs in production
    const server = init(env);

    it("redirects to retrocert login when staff view is accessed via public IP", async () => {
      for (const testPath of testPaths) {
        const res = await request(server)
          .get(testPath)
          .set("X-Forwarded-For", randomIpAddress);
        expect(res.status).toBe(302);
        expect(res.text).toMatch("Found. Redirecting to /");
        expect(res.redirect).toBe(true);
      }
    });

    describe("does not redirect when staff view is accessed", () => {
      it("by an EDD IP address", async () => {
        for (const testPath of testPaths) {
          const res = await request(server)
            .get(testPath)
            .set("X-Forwarded-For", eddIpAddress);
          expect(res.status).toBe(200);
        }
      });
      it("by a Nava team IP address", async () => {
        for (const testPath of testPaths) {
          const res = await request(server)
            .get(testPath)
            .set("X-Forwarded-For", navaTeamIpAddress);
          expect(res.status).toBe(200);
        }
      });
    });
  });
});
