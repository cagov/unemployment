import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<DaysSickQuestion />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, {
      onChange: () => {},
      questionText:
        "If Yes, enter the number of days (1 - 7) you were unable to work.",
      helpText:
        "You must report the numbers of days that you could not work during this week.",
    });

    expect(wrapper).toMatchSnapshot();
  });
});
