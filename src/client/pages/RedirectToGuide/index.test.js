import React from "react";
import Component from "./index";

describe("<RedirectToGuide />", () => {
  it("renders a redirect to the guide", async () => {
    expect(<Component />).toMatchSnapshot();
  });
});
