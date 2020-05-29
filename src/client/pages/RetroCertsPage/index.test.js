import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<RetroCertsPage />", () => {
  it("renders the retro certs main page", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsPage");

    expect(wrapper).toMatchSnapshot();
  });
});
