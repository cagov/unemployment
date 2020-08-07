import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<StaffViewConfirmationPage />", () => {
  it("when claimant not started", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1, 2, 5, 6],
        programPlan: ["PUA full time"],
        lastName: "Taylor",
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("when claimant in progress", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        authToken: "pretendThisIsARealToken",
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1, 2, 5, 6],
        programPlan: ["UI full time"],
        lastName: "Taylor",
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("when claimant completed", async () => {
    const weekOfAnswers = {
      tooSick: false,
      couldNotAcceptWork: false,
      didYouLook: false,
      refuseWork: false,
      schoolOrTraining: false,
      workOrEarn: false,
    };

    const wrapper = renderTransContent(Component, {
      userData: {
        authToken: "pretendThisIsARealToken",
        confirmationNumber: "33a6f278-eaa3-41c5-8d08-276fa0364833",
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1, 2],
        programPlan: ["UI full time"],
        lastName: "Taylor",
        formData: [weekOfAnswers, weekOfAnswers, weekOfAnswers],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
