import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<DisasterQuestion />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "DisasterQuestion", {
      onChange: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
