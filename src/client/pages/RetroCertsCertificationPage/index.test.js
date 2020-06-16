import renderNonTransContent from "../../test-helpers/renderNonTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsCertificationPage />", () => {
  it("Certify week not found.", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "RetroCertsCertificationPage",
      {
        userData: {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
        },
        setUserData: () => {},
        routeComputedMatch: {
          params: {
            week: "2020-02-07", // This date is invalid.
          },
        },
      }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Certify for one week of 2", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "RetroCertsCertificationPage",
      {
        userData: {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
        },
        setUserData: () => {},
        routeComputedMatch: {
          params: {
            week: "2020-02-08",
          },
        },
      }
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("Certify for 2nd week of 2", async () => {
    const wrapper = renderNonTransContent(
      Component,
      "RetroCertsCertificationPage",
      {
        userData: {
          status: AUTH_STRINGS.statusCode.ok,
          weeksToCertify: [0, 1],
        },
        setUserData: () => {},
        routeComputedMatch: {
          params: {
            week: "2020-02-15",
          },
        },
      }
    );

    expect(wrapper).toMatchSnapshot();
  });
});
