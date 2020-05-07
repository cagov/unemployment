import React from "react";
import TabPaneContent3 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent3 />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<TabPaneContent3 />);

    expect(wrapper).toMatchSnapshot();
  });
});
