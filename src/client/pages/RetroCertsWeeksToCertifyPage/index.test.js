import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsWeeksToCertifyPage />", () => {
  it("has user data", async () => {
    const wrapper = renderNonTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0],
      },
      setUserData: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });
});
