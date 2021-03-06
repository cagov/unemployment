import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { setUserDataPropType } from "../../commonPropTypes";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import { logEvent } from "../../utils";

let timeOutTimerId = null;
let warningTimerId = null;
const TIMEOUT_KEY = "timeout";

function SessionTimer(props) {
  const { t } = useTranslation();
  const TIMEOUT_MS = 30 * 60 * 1000;
  const TIMEOUT_DISPLAY_TIME_IN_MINUTES = 5;
  const TIMEOUT_WARNING_MS =
    TIMEOUT_MS - TIMEOUT_DISPLAY_TIME_IN_MINUTES * 60 * 1000;
  const history = useHistory();
  const { action, setUserData } = props;

  const [showWarningModal, setShowWarningModal] = useState();
  const [numberOfMinutes, setNumberOfMinutes] = useState(
    TIMEOUT_DISPLAY_TIME_IN_MINUTES
  );

  useEffect(() => {
    if (showWarningModal) {
      const timer = setTimeout(() => {
        setNumberOfMinutes(numberOfMinutes - 1);
      }, 60 * 1000);
      return () => clearTimeout(timer);
    }
  });

  function closeWarningModal() {
    setShowWarningModal(false);
    startOrUpdate();
  }

  function timeOutUser() {
    clearAuthToken();
    logEvent("RetroCerts", "SessionTimeout", history.location.pathname);
    history.push(routes.retroCertsAuth);
    setUserData({
      status: AUTH_STRINGS.statusCode.sessionTimedOut,
    });
  }

  function startOrUpdate() {
    // If the user is restoring a session (reopening a tab) after
    // more than 30min, log them out.
    if (sessionStorage.getItem(TIMEOUT_KEY)) {
      const timeoutTime = sessionStorage.getItem(TIMEOUT_KEY);
      if (Date.now() > timeoutTime) {
        timeOutUser();
        return;
      }
    }

    clear();
    warningTimerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        setShowWarningModal(true);
        setNumberOfMinutes(TIMEOUT_DISPLAY_TIME_IN_MINUTES);
      }
    }, TIMEOUT_WARNING_MS);
    timeOutTimerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        timeOutUser();
      }
    }, TIMEOUT_MS);
    sessionStorage.setItem(TIMEOUT_KEY, Date.now() + TIMEOUT_MS);
  }

  function clear() {
    clearTimeout(timeOutTimerId);
    timeOutTimerId = null;
    clearTimeout(warningTimerId);
    warningTimerId = null;
    sessionStorage.removeItem(TIMEOUT_KEY);
  }

  // If the modal is showing, we don't want to restart the timer.
  if (action === "startOrUpdate" && !showWarningModal) {
    startOrUpdate();
  } else if (action === "clear") {
    clear();
  }

  return (
    <Modal show={showWarningModal} onHide={closeWarningModal} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <strong>{t("timeout-modal.header")}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("timeout-modal.warning", { numberOfMinutes })}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={closeWarningModal}>
          {t("timeout-modal.button")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

SessionTimer.propTypes = {
  action: PropTypes.string.isRequired,
  setUserData: setUserDataPropType.isRequired,
};

export function clearAuthToken() {
  sessionStorage.removeItem(AUTH_STRINGS.authToken);
  sessionStorage.removeItem(TIMEOUT_KEY);
}

SessionTimer.getTimerIdForTest = function () {
  return timeOutTimerId;
};

export default SessionTimer;
