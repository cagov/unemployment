import React from "react";
import TabPaneContent5 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent5 />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<TabPaneContent5 />);

    expect(wrapper).toMatchSnapshot();
  });
});
