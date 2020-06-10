import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsWhatToExpectPage />", () => {
  it("no authToken or user data", async () => {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    const wrapper = renderNonTransContent(Component, "RetroCertsWhatToExpectPage", {
      userData: {},
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("has user data", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsWhatToExpectPage", {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        lastName: "Lastname",
        weeksToCertify: ["2020-01-01"],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
