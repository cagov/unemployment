import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<GuidePage />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component);

    expect(wrapper).toMatchSnapshot();
  });
});
