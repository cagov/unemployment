import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import ListOfWeeks from "../../components/ListOfWeeks";
import { logEvent } from "../../utils";
import { clearAuthToken } from "../../components/SessionTimer";

function RetroCertsConfirmationPage(props) {
  const { t } = useTranslation();
  document.title = t("retrocerts-confirmation.title");
  const history = useHistory();
  const userData = props.userData;

  // The user is here by accident. Send them back.
  if (!userData.confirmationNumber) {
    // For now, send them to the what-to-expect page, but
    // in the future, go to the first week without data.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  // Log out the user since they are done!
  clearAuthToken();

  const isReturning =
    history.location.state && history.location.state.isReturning;
  if (isReturning) {
    logEvent("RetroCerts", "AlreadyCompletedReturn");
  }

  function handlePrint() {
    logEvent("RetroCerts", "PrintConfirmation");
    window.print();
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page" className="pb-5">
        <div className="container p-4">
          <h1>{t("retrocerts-confirmation.title")}</h1>
          <LanguageSelector className="mt-3 mb-4" />
          <Alert variant="success" className="mt-5">
            <img
              className="checkmark"
              src="/images/check-circle-fill.svg"
              alt={t("iconAltText.checkmark")}
            />
            {t(
              isReturning
                ? "retrocerts-confirmation.alert-returning"
                : "retrocerts-confirmation.alert"
            )}
          </Alert>
          <h2 className="mt-5">{t("retrocerts-confirmation.header1")}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="retrocerts-confirmation.p1"
              values={{ confirmationNumber: userData.confirmationNumber }}
            />
          </p>
          <p>{t("retrocerts-confirmation.p1a")}</p>
          <p>{t("retrocerts-confirmation.p1b")}</p>
          <h2 className="mt-5">{t("retrocerts-confirmation.header2")}</h2>
          <ListOfWeeks
            weeksToCertify={userData.weeksToCertify}
            showChecks
          />

          <h2 className="mt-5">{t("retrocerts-confirmation.header3")}</h2>
          <p>
            <Trans t={t} i18nKey="retrocerts-confirmation.p2">
              If you are still unemployed, continue to certify for benefits
              every two weeks. The fastest way is to use{" "}
              <a href={t("links.edd-login")}>UI Online</a>.
            </Trans>
          </p>

          <Button
            variant="outline-secondary"
            className="text-dark bg-light mt-5"
            onClick={handlePrint}
          >
            {t("retrocerts-confirmation.button-print")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsConfirmationPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsConfirmationPage;
