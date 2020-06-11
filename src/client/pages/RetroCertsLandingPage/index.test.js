import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsLandingPage />", () => {
  it("has user data", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsLandingPage", {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: ["2020-01-01"],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
