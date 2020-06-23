import Alert from "react-bootstrap/Alert";
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
import ListOfWeeks from "../../components/ListOfWeeks";

function RetroCertsWeeksToCertifyPage(props) {
  const userData = props.userData;
  const { t } = useTranslation();

  return (
    <div id="overflow-wrapper">
      <Header />
      <main className="pb-5">
        <div className="container p-4">
          <h1>{t("retrocerts-weeks.title")}</h1>
          <Alert variant="success" className="mt-5">
            <img
              className="checkmark"
              src="/images/check-circle-fill.svg"
              alt={t("iconAltText.checkmark")}
            />
            {t("retrocerts-weeks.alert")}
          </Alert>
          <h2 className="mt-4">{t("retrocerts-weeks.header1")}</h2>
          <p>{t("retrocerts-weeks.p1")}</p>
          <ListOfWeeks weeksToCertify={userData.weeksToCertify} />
          <p>{t("retrocerts-weeks.p2")}</p>
          <h2>{t("retrocerts-weeks.header2")}</h2>
          <p>{t("retrocerts-weeks.p3")}</p>
          <p>{t("retrocerts-weeks.p4")}</p>

          <Row>
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
                {t("retrocerts-weeks.button-start")}
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
