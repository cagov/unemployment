import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../data/routes";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { clearAuthToken } from "../../components/SessionTimer";
import ListOfCertifications from "../../components/ListOfCertifications";

function StaffViewConfirmationPage(props) {
  const { t } = useTranslation();

  const userData = props.userData;

  const statuses = {
    NOT_STARTED: "not started",
    IN_PROGRESS: "in progress",
    COMPLETED: "completed",
  };

  let status, shortConfirmationNumber;
  const confirmationNumber = userData.confirmationNumber;
  if (confirmationNumber) {
    status = statuses.COMPLETED;

    // For historical reasons the confirmation code is stored as a uuidv4
    // hash in the database, but we display only the last 7 characters to the user.
    const shorterLength = 7;
    const startIndex = confirmationNumber.length - shorterLength;
    shortConfirmationNumber = confirmationNumber
      .substr(startIndex)
      .toUpperCase();
  } else if (userData.hasLoggedIn) {
    // TODO(kalvin): make hasLoggedIn real
    status = statuses.IN_PROGRESS;
  } else {
    status = statuses.NOT_STARTED;
  }

  document.title = t("staff-view-confirmation.title");

  // Log out the user since they are done!
  clearAuthToken();

  function handlePrint() {
    window.print();
  }

  function CertificationStatus() {
    switch (status) {
      case statuses.NOT_STARTED:
        return (
          <React.Fragment>
            <span className="badge not-started">
              {t("staff-view-confirmation.not-started.status")}
            </span>
            {/* TODO(kalvin): update with EDD content when received */}
            <p>{t("staff-view-confirmation.not-started.p1")}</p>
          </React.Fragment>
        );
      case statuses.IN_PROGRESS:
        return (
          <React.Fragment>
            <span className="badge in-progress">
              {t("staff-view-confirmation.in-progress.status")}
            </span>
            {/* TODO(kalvin): update with EDD content when received */}
            <p>{t("staff-view-confirmation.in-progress.p1")}</p>
          </React.Fragment>
        );
      case statuses.COMPLETED:
        return (
          <React.Fragment>
            <span className="badge completed">
              {t("staff-view-confirmation.completed.status")}
            </span>
            {/* TODO(kalvin): make last name real */}
            <p>
              {t("staff-view-confirmation.completed.last-name")}
              <br />
              {t("staff-view-confirmation.completed.confirmation-number") +
                shortConfirmationNumber}
            </p>
            <p>
              <Trans
                t={t}
                i18nKey="staff-view-confirmation.completed.p1"
                values={{ confirmationNumber, shortConfirmationNumber }}
              >
                Note: The claimant may have seen or saved a much longer
                confirmation number in the past. If so, it was{" "}
                <strong>adfdsaf</strong>. If they log in now, they will see
                <strong>adfdsafdfds</strong> instead, which is the last 7
                characters of the original number.
              </Trans>
            </p>
          </React.Fragment>
        );
    }
  }

  function ClaimantContent() {
    return status === statuses.COMPLETED ? (
      <div className="subtle-blockquote mb-5">
        <p>{t("retrocerts-confirmation.p1b")}</p>
        <Trans t={t} i18nKey="retrocerts-confirmation.p2">
          If you are still unemployed, continue to certify for benefits every
          two weeks. The fastest way is to use{" "}
          <a href={t("links.edd-login")}>UI Online</a>.
        </Trans>
      </div>
    ) : (
      <div className="subtle-blockquote mb-5">
        <p>{t("retrocerts-weeks.p3")}</p>
        <p>{t("retrocerts-weeks.p4")}</p>
      </div>
    );
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page" className="pb-5">
        <div className="container p-4">
          <h1>{t("staff-view-confirmation.title")}</h1>
          <h3>{t("staff-view-confirmation.header1")}</h3>
          <Button
            variant="outline-secondary"
            className="text-dark bg-light"
            as={Link}
            to={routes.retroCertsAuth}
          >
            {t("staff-view-confirmation.button-search")}
          </Button>

          <h3 className="mt-5">{t("staff-view-confirmation.header2")}</h3>
          <CertificationStatus />
          <Button
            variant="outline-secondary"
            className="text-dark bg-light"
            onClick={handlePrint}
          >
            {t("staff-view-confirmation.button-print")}
          </Button>

          <h3 className="mt-5">{t("staff-view-confirmation.header3")}</h3>
          <ListOfCertifications userData={userData} />

          <h3 className="mt-5">{t("staff-view-confirmation.header4")}</h3>
          <p>{t("staff-view-confirmation.p2")}</p>
          <ClaimantContent />
        </div>
      </main>
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

StaffViewConfirmationPage.propTypes = {
  userData: userDataPropType,
};

export default StaffViewConfirmationPage;
