import React from "react";
import TabPaneContent0 from "./index";
import { shallow } from "enzyme";

describe("<TabPaneContent0 />", () => {
  it("renders content pane", async () => {
    const getTabLink = jest.fn();
    const wrapper = shallow(<TabPaneContent0 getTabLink={getTabLink} />);

    expect(wrapper).toMatchSnapshot();
  });
});
