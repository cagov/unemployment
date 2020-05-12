import Footer from "./index";
import React from "react";
import { shallow } from "enzyme";

describe("<Footer />", () => {
  it("renders the footer component", async () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();
  });
});
