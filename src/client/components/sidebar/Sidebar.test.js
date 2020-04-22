import React from "react";
import Sidebar from "./Sidebar";
import { shallow } from "enzyme";

describe("<Sidebar />", () => {
  it("renders vertical navigation bar", async () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper).toMatchSnapshot();
  });
});
