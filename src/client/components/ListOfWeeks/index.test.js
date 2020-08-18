import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";

describe("<ListOfWeeks />", () => {
  it("renders the component", async () => {
    const wrapper = renderTransContent(Component, {
      weeksToCertify: [0, 5],
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("with checks", async () => {
    const wrapper = renderTransContent(Component, {
      weeksToCertify: [1],
      showChecks: true,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
