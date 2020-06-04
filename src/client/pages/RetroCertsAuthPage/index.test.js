import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<RetroCertsAuthPage />", () => {
  it("renders the retro certs main page", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsAuthPage");

    expect(wrapper).toMatchSnapshot();
  });
});
