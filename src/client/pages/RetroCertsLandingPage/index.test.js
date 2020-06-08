import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import auth from "../../../data/auth";

describe("<RetroCertsLandingPage />", () => {
  it("no authToken or user data", async () => {
    sessionStorage.removeItem(auth.AUTHTOKEN);
    const wrapper = renderNonTransContent(Component, "RetroCertsLandingPage", {
      userData: {},
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("re-fetch data with authToken", async () => {
    sessionStorage.setItem(auth.AUTHTOKEN, 'TEST_TOKEN');
    // fetch isn't part of nodejs. If we pull in node-fetch, we
    // need to update the test codes to mock global.fetch.
    expect(global.fetch).toBeUndefined();
    const mockFetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        status: auth.statusCode.OK,
        weeksToCertify: ["2020-02-01"],
      }),
    }));
    global.fetch = mockFetch;

    const wrapper = renderNonTransContent(Component, "RetroCertsLandingPage", {
      userData: {},
      setUserData: () => {},
    });

    global.fetch = undefined;
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch.mock.calls[0]).toEqual([
      auth.apiPath.data, {
        body: JSON.stringify({ authToken: "TEST_TOKEN" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ]);
    expect(wrapper).toMatchSnapshot();
  });

  it("has user data", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsLandingPage", {
      userData: {
        status: auth.statusCode.OK,
        weeksToCertify: ["2020-01-01"],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
