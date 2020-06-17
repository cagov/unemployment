import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import routes from "../../../data/routes";

function RetroCertsWhatToExpectPage() {
  const { t } = useTranslation();

  return (
    <div id="overflow-wrapper" className="what-to-expect">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-what-to-expect.title")}</h1>
          <Alert variant="success">
            <img
              className="checkmark"
              src="/images/check-circle-fill.svg"
              alt={t("iconAltText.checkmark")}
            />
            {t("retrocerts-what-to-expect.subheader")}
          </Alert>

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
            to={routes.retroCertsWeeksToCertify}
          >
            {t("retrocerts-what-to-expect.button-start-certification")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RetroCertsWhatToExpectPage;
