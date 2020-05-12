import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<Subheader />", () => {
  it("renders vertical navigation bar", async () => {
    const wrapper = renderNonTransContent(Component, "Subheader");

    expect(wrapper).toMatchSnapshot();
  });
});
