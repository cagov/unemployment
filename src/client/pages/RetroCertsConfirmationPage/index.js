import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import ListOfWeeksWithDetail from "../../components/ListOfWeeksWithDetail";
import { logEvent } from "../../utils";
import { clearAuthToken } from "../../components/SessionTimer";
import programPlan from "../../../data/programPlan";
import AccordionItem from "../../components/AccordionItem";

function RetroCertsConfirmationPage(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const userData = props.userData;
  const numAccordions = userData.weeksToCertify.length + 1; // add 1 for Acknowledgement
  const acknowledgementIndex = numAccordions - 1;
  const [showAll, setShowAll] = useState(false);
  const [accordionsExpanded, setAccordionsExpanded] = useState(
    Array(numAccordions).fill(false)
  );

  // The user is here by accident. Send them back.
  if (!userData.confirmationNumber) {
    // For now, send them to the what-to-expect page, but
    // in the future, go to the first week without data.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  document.title = t("retrocerts-confirmation.title");
  const isAnyWeekPua = userData.programPlan.includes(programPlan.puaFullTime);

  // For historical reasons the confirmation code is stored as a uuidv4
  // hash in the database, but we display only the last 7 characters to the user.
  const shorterLength = 7;
  const startIndex = userData.confirmationNumber.length - shorterLength;
  const shortConfirmationNumber = userData.confirmationNumber
    .substr(startIndex)
    .toUpperCase();

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

  function toggleAllAccordions() {
    setShowAll(!showAll);
    setAccordionsExpanded(Array(numAccordions).fill(!showAll));
  }

  function toggleAccordion(index) {
    // Need to clone the state variable here, React doesn't allow mutating them
    const newAccordionsExpanded = [...accordionsExpanded];
    newAccordionsExpanded[index] = !newAccordionsExpanded[index];
    setAccordionsExpanded(newAccordionsExpanded);

    // If all the accordions are now either closed or open,
    // update the Show all / Hide all button to match
    if (newAccordionsExpanded.every((x) => x === newAccordionsExpanded[0])) {
      setShowAll(newAccordionsExpanded[index]);
    }
  }

  function AcknowledgementDetail(props) {
    return (
      <React.Fragment>
        {isAnyWeekPua ? (
          <ul>
            <li>{t("retrocerts-certification.ack-list-pua-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-3")}</li>
          </ul>
        ) : (
          <ul>
            <li>{t("retrocerts-certification.ack-list-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-item-3")}</li>
            <li>{t("retrocerts-certification.ack-list-item-4")}</li>
          </ul>
        )}
        <input type="checkbox" checked disabled />
        {t("retrocerts-certification.ack-label")}
      </React.Fragment>
    );
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
              values={{ confirmationNumber: shortConfirmationNumber }}
            />
          </p>
          <p>{t("retrocerts-confirmation.p1a")}</p>
          <p>{t("retrocerts-confirmation.p1b")}</p>

          <Button
            variant="outline-secondary"
            className="text-dark bg-light"
            onClick={handlePrint}
          >
            {t("retrocerts-confirmation.button-print")}
          </Button>

          <h2 className="mt-5">{t("retrocerts-confirmation.header2")}</h2>
          <Button
            variant="outline-secondary"
            className="text-dark bg-light mb-3"
            onClick={toggleAllAccordions}
          >
            {showAll
              ? t("retrocerts-confirmation.button-hide-all")
              : t("retrocerts-confirmation.button-show-all")}
          </Button>
          <ListOfWeeksWithDetail
            showContentArray={accordionsExpanded}
            toggleContent={toggleAccordion}
            userData={userData}
          />
          <AccordionItem
            header={<strong>{t("retrocerts-certification.ack-header")}</strong>}
            content={<AcknowledgementDetail className="detail" />}
            showContent={accordionsExpanded[acknowledgementIndex]}
            toggleContent={() => toggleAccordion(acknowledgementIndex)}
          />

          <h2 className="mt-5">{t("retrocerts-confirmation.header3")}</h2>
          <p>
            <Trans t={t} i18nKey="retrocerts-confirmation.p2">
              If you are still unemployed, continue to certify for benefits
              every two weeks. The fastest way is to use{" "}
              <a href={t("links.edd-login")}>UI Online</a>.
            </Trans>
          </p>
        </div>
      </main>
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

RetroCertsConfirmationPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsConfirmationPage;
