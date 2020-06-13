/**
 * @jest-environment node
 */

const ReCaptcha = require("./reCaptcha");

describe("ReCaptcha", () => {
  it("validates user", async () => {
    const reCaptcha = new ReCaptcha("userToken");
    const isUserValid = await reCaptcha.validateUser();
    expect(isUserValid).toBe(true);
  });
});
