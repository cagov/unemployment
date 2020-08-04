import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<StaffViewConfirmationPage />", () => {
  it("when claimant not started", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "StaffViewConfirmationPage",
      {
        userData: {
          hasLoggedIn: false,
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1, 2, 5, 6],
          confirmationNumber: "CONFIRMATION_NUMBER",
          programPlan: ["PUA full time"],
        },
        setUserData: () => {},
      }
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("when claimant in progress", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "StaffViewConfirmationPage",
      {
        userData: {
          hasLoggedIn: true,
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1, 2, 5, 6],
          programPlan: ["UI full time"],
        },
        setUserData: () => {},
      }
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("when claimant completed", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "StaffViewConfirmationPage",
      {
        userData: {
          confirmationNumber: "33a6f278-eaa3-41c5-8d08-276fa0364833",
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1, 2, 5, 6],
          programPlan: ["UI full time"],
        },
        setUserData: () => {},
      }
    );

    expect(wrapper).toMatchSnapshot();
  });
});
