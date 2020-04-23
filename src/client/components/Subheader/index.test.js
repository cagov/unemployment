import React from "react";
import Subheader from "./index";
import { shallow } from "enzyme";

describe("<Subheader />", () => {
  it("renders vertical navigation bar", async () => {
    const wrapper = shallow(<Subheader />);

    expect(wrapper).toMatchSnapshot();
  });
});
