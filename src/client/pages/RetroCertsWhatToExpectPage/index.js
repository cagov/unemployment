import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useTranslation, Trans } from "react-i18next";

function RetroCertsWhatToExpectPage(props) {
  const { t } = useTranslation();

  const userData = props.userData;

  return (
    <div id="overflow-wrapper" className="what-to-expect">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-what-to-expect.title")}</h1>
          <p className="green-highlight">
            <span className="white-checkmark">✔</span>
            <Trans t={t} i18nKey="retrocerts-what-to-expect.subheader" values={{name: userData.lastName}} />
          </p>

          <h2>{t("retrocerts-what-to-expect.header1")}</h2>
          <p>{t("retrocerts-what-to-expect.p1a")}</p>
          <ul>
            <li>{t("retrocerts-what-to-expect.list-item1")}</li>
            <li>{t("retrocerts-what-to-expect.list-item2")}</li>
            <li>{t("retrocerts-what-to-expect.list-item3")}</li>
            <li>{t("retrocerts-what-to-expect.list-item4")}</li>
            <li>{t("retrocerts-what-to-expect.list-item5")}</li>
            <li>{t("retrocerts-what-to-expect.list-item6")}</li>
          </ul>
          <p>{t("retrocerts-what-to-expect.p1b")}</p>
          <h2>{t("retrocerts-what-to-expect.header2")}</h2>
          <p>{t("retrocerts-what-to-expect.p2")}</p>

          <Button
              variant="secondary"
              as={Link}
              to="/retroactive-certification/landing">
            {t("retrocerts-what-to-expect.button-start-certification")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsWhatToExpectPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsWhatToExpectPage;
