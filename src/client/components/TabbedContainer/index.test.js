import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<TabbedContainer />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "TabbedContainer");

    expect(wrapper).toMatchSnapshot();
  });
});
