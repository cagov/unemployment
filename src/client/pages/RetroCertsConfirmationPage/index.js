import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import { toWeekString } from "../../../utils/retroCertsWeeks";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsConfirmationPage(props) {
  const { t } = useTranslation();
  const userData = props.userData;

  // The user is here by accident. Send them back.
  if (!userData.confirmationNumber) {
    // For now, send them to the what-to-expect page, but
    // in the future, go to the first week without data.
    return <Redirect to={routes.retroCertsWhatToExpect} />;
  }

  // Log out the user since they are done!
  sessionStorage.removeItem(AUTH_STRINGS.authToken);

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-confirmation.title")}</h1>
          <Alert variant="success">
            <img
              className="checkmark"
              src="/images/check-circle-fill.svg"
              alt={t("iconAltText.checkmark")}
            />
            {t("retrocerts-confirmation.subheader")}
          </Alert>
          <h2>{t("retrocerts-confirmation.header1")}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="retrocerts-confirmation.p1"
              values={{ confirmationNumber: userData.confirmationNumber }}
            />
          </p>
          <h2>{t("retrocerts-confirmation.header2")}</h2>
          <ul>
            {userData.weeksToCertify.map((weekId, i) => {
              return (
                <li key={"week" + i}>
                  <Trans
                    t={t}
                    i18nKey="retrocerts-confirmation.list-item"
                    values={{
                      number: i + 1,
                      formattedDateRange: toWeekString(weekId),
                    }}
                  />{" "}
                </li>
              );
            })}
          </ul>
          <p>
            <Button
              variant="outline-secondary"
              className="text-dark bg-light"
              onClick={print}
            >
              {t("retrocerts-confirmation.button-print")}
            </Button>
          </p>
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
