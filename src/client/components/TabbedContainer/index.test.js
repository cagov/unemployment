import React from "react";
import TabbedContainer from "./index";
import { shallow } from "enzyme";

describe("<TabbedContainer />", () => {
  it("renders vertical navigation bar", async () => {
    const wrapper = shallow(<TabbedContainer />);

    expect(wrapper).toMatchSnapshot();
  });
});
