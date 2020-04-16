import { init } from "../app";
import request from "supertest";

const server = init();

describe("Router: Single page app", () => {
  it("renders homepage", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it("returns 404 status code", async () => {
    const res = await request(server).get("/derp");

    expect(res.status).toBe(404);
  });
});
