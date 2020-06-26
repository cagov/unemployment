import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<LanguageSelector />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "LanguageSelector");

    expect(wrapper).toMatchSnapshot();
  });
});
