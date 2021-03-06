import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<Footer />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, {
      backToTopTag: "back-to-top",
    });

    expect(wrapper).toMatchSnapshot();
  });
});
