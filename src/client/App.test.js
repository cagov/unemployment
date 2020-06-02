import App from "./App";
import React from "react";
import { shallow } from "enzyme";
import fflip from "fflip";

describe("<App />", () => {
  it("renders application without retro-certs", () => {
    fflip.features.retroCerts.enabled = false;
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders application with retro-certs", () => {
    fflip.features.retroCerts.enabled = true;
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
