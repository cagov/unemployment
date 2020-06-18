import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<DaysSickQuestion />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "DaysSickQuestion", {
      onChange: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
