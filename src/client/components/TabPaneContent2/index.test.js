import React from "react";
import TabPaneContent2 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent2 />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<TabPaneContent2 />);

    expect(wrapper).toMatchSnapshot();
  });
});
