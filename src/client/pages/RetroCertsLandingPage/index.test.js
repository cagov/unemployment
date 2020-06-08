import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";

describe("<RetroCertsLandingPage />", () => {
  it("renders the retro certs landing page (after auth)", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsLandingPage", {
      userData: {},
      setUserData: () => {}
    });

    expect(wrapper).toMatchSnapshot();
  });
});
