import React from "react";
import TabPaneContent1 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent1 />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<TabPaneContent1 />);

    expect(wrapper).toMatchSnapshot();
  });
});
