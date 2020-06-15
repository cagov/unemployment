import App from "./App";
import React from "react";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("renders application without retro-certs", () => {
    const wrapper = shallow(<App hostname="unemployment.edd.ca.gov" />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders application with retro-certs", () => {
    const wrapper = shallow(<App hostname="localhost" />);

    expect(wrapper).toMatchSnapshot();
  });
});
