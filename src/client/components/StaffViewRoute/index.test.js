import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import React from "react";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

const TestComponent = () => {
  return <div>TestComponent</div>;
};

describe("<StaffViewRoute />", () => {
  it("basic route", async () => {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route in production (should be PageNotFound)", async () => {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
      isProduction: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route needing auth, but no data", async () => {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
      pageProps: {
        userData: {},
        setUserData: () => {},
      },
      requiresAuthentication: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route needing auth with user data", async () => {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
      pageProps: {
        userData: { weeksToCertify: [0] },
        setUserData: () => {},
      },
      requiresAuthentication: true,
      computedMatch: {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route needing auth with authToken", async () => {
    sessionStorage.setItem(AUTH_STRINGS.authToken, "TEST_TOKEN");

    // fetch isn't part of nodejs. If we pull in node-fetch, we
    // need to update the test codes to mock global.fetch.
    expect(global.fetch).toBeUndefined();
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: AUTH_STRINGS.statusCode.ok,
            weeksToCertify: [0, 1],
          }),
      })
    );
    global.fetch = mockFetch;

    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
      pageProps: {
        userData: {},
        setUserData: () => {},
      },
      requiresAuthentication: true,
    });

    // Test cleanup.
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    global.fetch = undefined;

    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch.mock.calls[0]).toEqual([
      AUTH_STRINGS.apiPath.data,
      {
        body: JSON.stringify({ authToken: "TEST_TOKEN" }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    ]);

    expect(wrapper).toMatchSnapshot();
  });
});
