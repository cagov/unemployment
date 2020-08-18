import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsConfirmationPage />", () => {
  const weekOfAnswers = {
    tooSick: false,
    couldNotAcceptWork: false,
    didYouLook: false,
    refuseWork: false,
    schoolOrTraining: false,
    workOrEarn: false,
  };

  it("with confirmation number", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        formData: [weekOfAnswers, weekOfAnswers, weekOfAnswers],
        weeksToCertify: [1, 2, 3],
        programPlan: ["UI full time"],
        confirmationNumber: "CONFIRMATION_NUMBER",
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("no confirmation number", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1, 2, 5, 6],
        programPlan: ["UI full time"],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
