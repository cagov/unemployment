import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import { useTranslation, Trans } from "react-i18next";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import {
  fromIndexToPathString,
  fromPathStringToIndex,
} from "../../../utils/retroCertsWeeks";
import mockedFormData from "../../../data/mockedFormData";
import routes from "../../../data/routes";
import AUTH_STRINGS from "../../../data/authStrings";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsCertificationPage(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const { userData, setUserData, routeComputedMatch } = props;
  const week = routeComputedMatch.params.week || "";

  const numberOfWeeks = userData.weeksToCertify.length;
  const weekIndex = fromPathStringToIndex(week || "");
  const weekForUser = userData.weeksToCertify.indexOf(weekIndex) + 1;
  if (!weekForUser) {
    // The week from the URL is not a week that the user has
    // to certify for. Send them back to the list of weeks page.
    return <Redirect to="/retroactive-certification/landing" />;
  }

  function handleSubmit() {
    fetch(AUTH_STRINGS.apiPath.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: mockedFormData,
        authToken: sessionStorage.getItem(AUTH_STRINGS.authToken),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        history.push(routes.retroCertsConfirmation.path);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-certification.title")}</h1>
          {numberOfWeeks > 1 && (
            <p>
              <Trans
                t={t}
                i18nKey="retrocerts-certification.p1-multiple"
                values={{ weekForUser, numberOfWeeks }}
              />
            </p>
          )}
          <Form onSubmit={handleSubmit}>
            <Row>Questions go here.</Row>
            <Row>
              <div className="col-md-4">
                <Button
                  variant="outline-secondary"
                  className="text-dark bg-light"
                  href={
                    weekForUser === 1
                      ? "/retroactive-certification/landing"
                      : "/retroactive-certification/certify/" +
                        fromIndexToPathString(weekForUser - 2)
                  }
                >
                  {t("retrocerts-certification.button-back")}
                </Button>
              </div>
              <div className="col-md-4">
                {weekForUser === numberOfWeeks && (
                  <Button variant="secondary" onClick={handleSubmit}>
                    {t("retrocerts-certification.button-submit")}
                  </Button>
                )}
                {weekForUser !== numberOfWeeks && (
                  <Button
                    variant="secondary"
                    type="submit"
                    href={`/retroactive-certification/certify/${fromIndexToPathString(
                      weekForUser
                    )}`}
                  >
                    <Trans
                      t={t}
                      i18nKey="retrocerts-certification.button-next"
                      values={{ nextWeekForUser: weekForUser + 1 }}
                    />
                  </Button>
                )}
              </div>
            </Row>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsCertificationPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
  routeComputedMatch: PropTypes.object.isRequired,
};

export default RetroCertsCertificationPage;
