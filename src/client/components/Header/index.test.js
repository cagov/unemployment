import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<Header />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "Header");

    expect(wrapper).toMatchSnapshot();
  });
});
