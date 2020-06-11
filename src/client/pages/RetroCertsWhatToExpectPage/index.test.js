import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsWhatToExpectPage />", () => {
  it("has user data", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsWhatToExpectPage", {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        lastName: "Lastname",
        weeksToCertify: [1, 2],
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
