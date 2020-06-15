import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsConfirmationPage />", () => {
  it("with confirmation number", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "RetroCertsConfirmationPage",
      {
        userData: {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1, 2, 5, 6],
          confirmationNumber: "CONFIRMATION_NUMBER",
        },
        setUserData: () => {},
      }
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("no confirmation number", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "RetroCertsConfirmationPage",
      {
        userData: {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1, 2, 5, 6],
        },
        setUserData: () => {},
      }
    );

    expect(wrapper).toMatchSnapshot();
  });
});
