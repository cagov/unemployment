import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListOfWeeks from "../../components/ListOfWeeks";

function RetroCertsConfirmationPage(props) {
  const { t } = useTranslation();
  const userData = props.userData;

  // The user is here by accident. Send them back.
  if (!userData.confirmationNumber) {
    // For now, send them to the what-to-expect page, but
    // in the future, go to the first week without data.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  // Log out the user since they are done!
  sessionStorage.removeItem(AUTH_STRINGS.authToken);

  // If the user is checking after they submitted data, formData
  // will be empty. NOTE: if we implement partial save, we need
  // to make sure not to return form data if the user has a
  // confirmation number.
  const isReturning = !userData.formData;

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-confirmation.title")}</h1>
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
          <p>{t("retrocerts-confirmation.p1b")}</p>
          <h2 className="mt-5">{t("retrocerts-confirmation.header2")}</h2>
          <ListOfWeeks
            weeksToCertify={userData.weeksToCertify}
            showChecks={!isReturning}
          />

          <h2 className="mt-5">{t("retrocerts-confirmation.header3")}</h2>
          <p>
            <Trans t={t} i18nKey="retrocerts-confirmation.p2">
              If you are still unemployed, continue to certify for benefits
              every two weeks. The fastest way is to use{" "}
              <a href={t("links.edd-webapp")}>UI Online</a>.
            </Trans>
          </p>

          <Button
            variant="outline-secondary"
            className="text-dark bg-light mt-5"
            onClick={print}
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
