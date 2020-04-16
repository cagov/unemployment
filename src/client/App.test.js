import App from "./App";
import React from "react";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("renders application", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
