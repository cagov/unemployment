import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";

describe("<WeekWithDetail />", () => {
  it("renders the WeekWithDetail component", async () => {
    const weekOfAnswers = {
      tooSick: false,
      couldNotAcceptWork: false,
      didYouLook: false,
      refuseWork: false,
      schoolOrTraining: false,
      workOrEarn: false,
    };

    const content = renderTransContent(Component, {
      index: 0,
      weekData: weekOfAnswers,
      weekIndex: 1,
      weekProgramPlan: "UI full time",
    });
    expect(content).toMatchSnapshot();
  });
});
