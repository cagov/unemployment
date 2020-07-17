/**
 * @jest-environment node
 */

const ReCaptcha = require("./reCaptcha");
const axios = require("axios");

describe("ReCaptcha", () => {
  it("validates user", async () => {
    const reCaptcha = new ReCaptcha("userToken");
    const isUserValid = await reCaptcha.validateUser();
    expect(isUserValid).toBe(true);
  });

  it("Test 1 timeout", async () => {
    const axiosPostMock = jest.spyOn(axios, "post");
    let numFuncCalls = 0;
    axiosPostMock.mockImplementation(
      jest.fn(async () => {
        ++numFuncCalls;
        if (numFuncCalls % 2 === 0) {
          return { data: { success: true } };
        } else {
          throw Error("mock timeout");
        }
      })
    );

    const reCaptcha = new ReCaptcha("userToken");
    const isUserValid = await reCaptcha.validateUser();
    expect(isUserValid).toBe(true);
    expect(numFuncCalls).toBe(2);

    axiosPostMock.mockRestore();
  });

  it("Test 2 timeouts", async () => {
    const axiosPostMock = jest.spyOn(axios, "post");
    let numFuncCalls = 0;
    axiosPostMock.mockImplementation(
      jest.fn(async () => {
        ++numFuncCalls;
        if (numFuncCalls % 3 === 0) {
          return { data: { success: true } };
        } else {
          throw Error("mock timeout");
        }
      })
    );

    const reCaptcha = new ReCaptcha("userToken");
    const isUserValid = await reCaptcha.validateUser();
    expect(isUserValid).toBe(true);
    expect(numFuncCalls).toBe(3);

    axiosPostMock.mockRestore();
  });

  it("Test 3 timeouts", async () => {
    const axiosPostMock = jest.spyOn(axios, "post");
    let numFuncCalls = 0;
    axiosPostMock.mockImplementation(
      jest.fn(async () => {
        ++numFuncCalls;
        throw Error("mock timeout");
      })
    );

    const reCaptcha = new ReCaptcha("userToken");
    await expect(reCaptcha.validateUser()).rejects.toThrow("mock timeout");
    expect(numFuncCalls).toBe(3);
    axiosPostMock.mockRestore();
  });
});
