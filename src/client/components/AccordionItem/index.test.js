import React from "react";
import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<AccordionItem />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, {
      header: <div>header react element</div>,
      content: <div>detailed body react element</div>,
      showContent: true,
      toggleContent: jest.fn(),
    });

    expect(wrapper).toMatchSnapshot();
  });
});
