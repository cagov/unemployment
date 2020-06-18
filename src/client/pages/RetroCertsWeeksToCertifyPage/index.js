import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import { useTranslation } from "react-i18next";
import { fromIndexToPathString } from "../../../utils/retroCertsWeeks";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsWeeksToCertifyPage(props) {
  const userData = props.userData;
  const { t } = useTranslation();

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>Hello</h1>
          <p>Weeks to certify: {userData.weeksToCertify.join(", ")}</p>
          <Row>
            <div className="col-md-4">
              <Button
                variant="outline-secondary"
                className="text-dark bg-light"
                as={Link}
                to={routes.retroCertsWhatToExpect}
              >
                {t("retrocerts-weeks.button-back")}
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                variant="secondary"
                as={Link}
                to={
                  routes.retroCertsCertify +
                  "/" +
                  fromIndexToPathString(userData.weeksToCertify[0])
                }
              >
                {t("retrocerts-weeks.button-certify-week-1")}
              </Button>
            </div>
          </Row>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsWeeksToCertifyPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsWeeksToCertifyPage;
