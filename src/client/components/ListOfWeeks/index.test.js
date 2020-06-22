import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<ListOfWeeks />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "ListOfWeeks", {
      weeksToCertify: [0, 5],
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("with checks", async () => {
    const wrapper = renderNonTransContent(Component, "ListOfWeeks", {
      weeksToCertify: [1],
      showChecks: true,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
