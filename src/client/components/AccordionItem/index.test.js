import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<AccordionItem />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "AccordionItem");

    expect(wrapper).toMatchSnapshot();
  });
});
