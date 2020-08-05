import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<ListOfCertifications />", () => {
  it("renders the component", async () => {
    const weekOfAnswers = {
      tooSick: false,
      couldNotAcceptWork: false,
      didYouLook: false,
      refuseWork: false,
      schoolOrTraining: false,
      workOrEarn: false,
    };

    const wrapper = renderNonTransContent(Component, "ListOfCertifications", {
      userData: {
        formData: [weekOfAnswers, weekOfAnswers, weekOfAnswers],
        weeksToCertify: [1, 2, 3],
        programPlan: ["UI full time"],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
