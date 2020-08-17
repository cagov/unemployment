import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<SessionTimer />", () => {
  it("startOrUpdate", async () => {
    const wrapper = renderNonTransContent(Component, {
      action: "startOrUpdate",
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
    expect(Component.getTimerIdForTest()).not.toBeNull();
    clearTimeout(Component.getTimerIdForTest());
  });

  it("clear", async () => {
    const wrapper = renderNonTransContent(Component, {
      action: "clear",
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
    expect(Component.getTimerIdForTest()).toBeNull();
  });
});
