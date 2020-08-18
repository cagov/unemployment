import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<PageNotFound />", () => {
  it("renders a 404 page", async () => {
    const wrapper = renderNonTransContent(Component);

    expect(wrapper).toMatchSnapshot();
  });
});
