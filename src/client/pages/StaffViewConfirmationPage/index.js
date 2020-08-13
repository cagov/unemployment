import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../data/routes";
import { useTranslation, Trans } from "react-i18next";
import PropTypes from "prop-types";
import { userDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListOfCertifications from "../../components/ListOfCertifications";
import ListOfWeeks from "../../components/ListOfWeeks";

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
  } else if (userData.authToken) {
    // user has logged in before
    status = statuses.IN_PROGRESS;
  } else {
    // user has never logged in
    status = statuses.NOT_STARTED;
  }

  document.title = t("staff-view-confirmation.title");

  function handlePrint() {
    window.print();
  }

  function CertificationStatus() {
    function HeaderWithBadge(props) {
      return (
        <h2 className="h3 font-weight-bold mt-5 mb-3">
          {t("staff-view-confirmation.header2")} {props.children}
        </h2>
      );
    }
    HeaderWithBadge.propTypes = {
      children: PropTypes.node.isRequired,
    };

    function ClaimantInfo(props) {
      return (
        <p>
          {t("staff-view-confirmation.last-name")}{" "}
          <strong>{userData.lastName}</strong>
          <br />
          {props.children}
        </p>
      );
    }
    ClaimantInfo.propTypes = {
      children: PropTypes.node.isRequired,
    };

    switch (status) {
      case statuses.NOT_STARTED:
        return (
          <React.Fragment>
            <HeaderWithBadge>
              <span className="badge not-started">
                {t("staff-view-confirmation.not-started.status")}
              </span>
            </HeaderWithBadge>
            <ClaimantInfo>
              {t("staff-view-confirmation.not-started.p1")}
            </ClaimantInfo>
          </React.Fragment>
        );
      case statuses.IN_PROGRESS:
        return (
          <React.Fragment>
            <HeaderWithBadge>
              <span className="badge in-progress">
                {t("staff-view-confirmation.in-progress.status")}
              </span>
            </HeaderWithBadge>
            <ClaimantInfo>
              {t("staff-view-confirmation.in-progress.p1")}
            </ClaimantInfo>
          </React.Fragment>
        );
      case statuses.COMPLETED:
        return (
          <React.Fragment>
            <HeaderWithBadge>
              <span className="badge completed">
                {t("staff-view-confirmation.completed.status")}
              </span>
            </HeaderWithBadge>
            <ClaimantInfo>
              {t("staff-view-confirmation.completed.p1")}
              <br />
              {t("staff-view-confirmation.completed.confirmation-number")}{" "}
              <strong>{shortConfirmationNumber}</strong>
            </ClaimantInfo>
            <p>
              <Trans t={t} i18nKey="staff-view-confirmation.completed.p2">
                <strong>Note:</strong> Beginning 07/17/20, the 32 character
                confirmation number was truncated to only display the last 7
                characters.
              </Trans>
            </p>
          </React.Fragment>
        );
    }
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page" className="pb-5">
        <div className="container p-4">
          <h1>{t("staff-view-confirmation.title")}</h1>
          <h2 className="h3 font-weight-bold mb-3">
            {t("staff-view-confirmation.header1")}
          </h2>
          <Button
            variant="outline-secondary"
            className="text-dark bg-light"
            as={Link}
            to={routes.staffViewAuth}
          >
            {t("staff-view-confirmation.button-search")}
          </Button>
          <CertificationStatus />
          <Button
            variant="outline-secondary"
            className="text-dark bg-light"
            onClick={handlePrint}
          >
            {t("staff-view-confirmation.button-print")}
          </Button>

          <h2 className="h3 font-weight-bold mt-5 mb-3">
            {t("staff-view-confirmation.header3")}
          </h2>
          {userData.confirmationNumber ? (
            <ListOfCertifications userData={userData} />
          ) : (
            <ListOfWeeks weeksToCertify={userData.weeksToCertify} />
          )}
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
