import renderTransContent from "../../test-helpers/renderTransContent";
import TabPaneContent from "./index";

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

    const content = renderTransContent(TabPaneContent, {
      index: 0,
      weekData: weekOfAnswers,
      weekIndex: 1,
      weekProgramPlan: "UI full time",
    });
    expect(content).toMatchSnapshot();
  });
});
