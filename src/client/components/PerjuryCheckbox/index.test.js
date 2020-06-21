import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<PerjuryCheckbox />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "PerjuryCheckbox");

    expect(wrapper).toMatchSnapshot();
  });
});
