import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import {
  fromIndexToPathString,
  fromPathStringToIndex,
} from "../../../utils/retroCertsWeeks";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsCertificationPage(props) {
  const { t } = useTranslation();
  // Disable until this is implemented.
  // eslint-disable-next-line no-unused-vars
  const { userData, setUserData, routeComputedMatch } = props;
  const week = routeComputedMatch.params.week || "";

  const numberOfWeeks = userData.weeksToCertify.length;
  const weekIndex = fromPathStringToIndex(week || "");
  const weekForUser = userData.weeksToCertify.indexOf(weekIndex) + 1;
  if (!weekForUser) {
    // The week from the URL is not a week that the user has
    // to certify for. Send them back to the list of weeks page.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  const handleSubmit = (event) => {
    // TODO: form validation, post form.
  };

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
                  as={Link}
                  to={
                    weekForUser === 1
                      ? routes.retroCertsWeeksToCertify
                      : routes.retroCertsCertify +
                        "/" +
                        fromIndexToPathString(
                          userData.weeksToCertify[weekForUser - 2]
                        )
                  }
                >
                  {t("retrocerts-certification.button-back")}
                </Button>
              </div>
              <div className="col-md-4">
                <Button
                  variant="secondary"
                  as={Link}
                  to={
                    weekForUser === numberOfWeeks
                      ? routes.retroCertsConfirmation
                      : routes.retroCertsCertify +
                        "/" +
                        fromIndexToPathString(
                          userData.weeksToCertify[weekForUser]
                        )
                  }
                  type="submit"
                >
                  {weekForUser === numberOfWeeks ? (
                    t("retrocerts-certification.button-submit")
                  ) : (
                    <Trans
                      t={t}
                      i18nKey="retrocerts-certification.button-next"
                      values={{ nextWeekForUser: weekForUser + 1 }}
                    />
                  )}
                </Button>
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
