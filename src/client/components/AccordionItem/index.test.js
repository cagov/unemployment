import React from "react";
import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<AccordionItem />", () => {
  it("renders the component", async () => {
    const wrapper = renderNonTransContent(Component, "AccordionItem", {
      header: <div>header react element</div>,
      expandedBody: <div>detailed body react element</div>,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
