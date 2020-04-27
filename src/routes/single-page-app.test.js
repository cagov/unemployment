import request from "supertest";
import { init } from "../app";

const server = init();

describe("Router: Single page app", () => {
  it("renders homepage", async () => {
    const res = await request(server).get("/guide");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it("returns 301 status code", async () => {
    const res = await request(server).get("/guide/");

    expect(res.status).toBe(301);
    expect(res.get('Location')).toBe('/guide');
  });

  it("returns 301 status code", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(301);
    expect(res.get('Location')).toBe('/guide');
  });
});
