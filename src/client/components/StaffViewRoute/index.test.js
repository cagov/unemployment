import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import React from "react";
import Component from "./index";

const TestComponent = () => {
  return <div>TestComponent</div>;
};

describe("<StaffViewRoute />", () => {
  it("basic route", async () => {
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/path",
      pageComponent: TestComponent,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route needing user data", async () => {
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/retroactive-certification/staff-view/claimant-status",
      pageComponent: TestComponent,
      pageProps: {
        userData: { weeksToCertify: [0] },
        setUserData: () => {},
      },
      computedMatch: {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("route needing user data, without user data", async () => {
    const wrapper = renderNonTransContent(Component, "StaffViewRoute", {
      path: "/retroactive-certification/staff-view/claimant-status",
      pageComponent: TestComponent,
      pageProps: {
        userData: {},
        setUserData: () => {},
      },
      computedMatch: {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
