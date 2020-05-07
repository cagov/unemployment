import React from "react";
import TabPaneContent4 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent4 />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<TabPaneContent4 />);

    expect(wrapper).toMatchSnapshot();
  });
});
