import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import AUTH_STRINGS from "../../../data/authStrings";
import Component from "./index";

describe("<RetroCertsAuthPage />", () => {
  it("retro certs auth page", async () => {
    const wrapper = renderNonTransContent(Component, "RetroCertsAuthPage");

    expect(wrapper).toMatchSnapshot();
  });

  it("retro certs auth page with user not found error", async () => {
    const wrapper = renderNonTransContent(Component, {
      userData: { status: AUTH_STRINGS.statusCode.userNotFound },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("retro certs auth page with captcha timeout error", async () => {
    const wrapper = renderNonTransContent(Component, {
      userData: { status: AUTH_STRINGS.statusCode.recaptchaInvalid },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("retro certs auth page with session timeout", async () => {
    const wrapper = renderNonTransContent(Component, {
      userData: { status: AUTH_STRINGS.statusCode.sessionTimedOut },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
