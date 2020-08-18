import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";

describe("<PerjuryCheckbox />", () => {
  it("renders the component", async () => {
    const wrapper = renderTransContent(Component);

    expect(wrapper).toMatchSnapshot();
  });
});
