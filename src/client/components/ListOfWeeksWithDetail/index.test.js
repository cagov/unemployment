import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<ListOfWeeksWithDetail />", () => {
  it("renders the component", async () => {
    const weekOfAnswers = {
      tooSick: false,
      couldNotAcceptWork: false,
      didYouLook: false,
      refuseWork: false,
      schoolOrTraining: false,
      workOrEarn: false,
    };

    const wrapper = renderNonTransContent(Component, {
      userData: {
        formData: [weekOfAnswers, weekOfAnswers, weekOfAnswers],
        weeksToCertify: [1, 2, 3],
        programPlan: ["UI full time"],
      },
      showContentArray: [true, true, true, true],
      toggleContent: jest.fn(),
    });

    expect(wrapper).toMatchSnapshot();
  });
});
