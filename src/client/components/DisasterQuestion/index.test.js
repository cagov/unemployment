import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<DisasterQuestion />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, {
      onChange: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
