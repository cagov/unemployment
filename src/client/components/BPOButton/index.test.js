import BPOButton from "./index";
import React from "react";
import { shallow } from "enzyme";

describe("<BPOButton />", () => {
  it("renders content pane", async () => {
    const wrapper = shallow(<BPOButton />);

    expect(wrapper).toMatchSnapshot();
  });
});
