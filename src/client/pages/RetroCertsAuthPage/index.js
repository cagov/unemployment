import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, useEffect } from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import SessionTimer from "../../components/SessionTimer";
import weeksCompleted from "../../../utils/checkFormData";
import { fromIndexToPathString } from "../../../utils/retroCertsWeeks";
import Inputmask from "inputmask";
import { autoScroll, TOP, BEHAVIOR } from "../../../utils/autoScroll";
import { logEvent } from "../../utils";
import i18n from "../../i18n";

function RetroCertsAuthPage(props) {
  const { t } = useTranslation();
  document.title = t("retrocert-login.title");
  const history = useHistory();

  const userData = props.userData;
  const setUserData = props.setUserData;

  const [lastName, setLastName] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [ssn, setSsn] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSsn, setShowSsn] = useState(false);
  const [showGenericValidationError, setShowGenericValidationError] = useState(
    false
  );

  const status = userData && userData.status;
  const errorTransKey = new Map([
    [
      AUTH_STRINGS.statusCode.userNotFound,
      "retrocert-login.invalid-user-error",
    ],
    [
      AUTH_STRINGS.statusCode.recaptchaInvalid,
      "retrocert-login.invalid-recaptcha-error",
    ],
    [
      AUTH_STRINGS.statusCode.sessionTimedOut,
      "retrocert-login.session-timed-out",
    ],
  ]).get(status);

  const errorAlert = errorTransKey && (
    <Row>
      <div className="col-md-12">
        <Alert variant="danger">{t(errorTransKey)}</Alert>
      </div>
    </Row>
  );

  const recaptchaRef = React.createRef();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (!isValid) {
      setShowGenericValidationError(true);
      autoScroll({
        y: TOP.y,
        x: TOP.x,
        behavior: BEHAVIOR.smooth,
      });
      return;
    }

    setShowGenericValidationError(false);

    const month = dobMonth.length < 2 ? "0" + dobMonth : dobMonth;
    const day = dobDay.length < 2 ? "0" + dobDay : dobDay;

    fetch(AUTH_STRINGS.apiPath.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName: lastName.trim(),
        dob: `${month}-${day}-${dobYear}`.trim(),
        ssn: ssn.inputmask
          ? ssn.inputmask.unmaskedvalue()
          : ssn.trim().replace(/-/g, ""),
        reCaptcha: recaptchaRef.current.getValue(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setUserData(data);
        if (data.authToken) {
          // Session storage is destroyed when the tab is closed! That's a bit weird.
          // If we want to allow the user to use multiple tabs, we could sync the
          // value across tabs:
          // https://medium.com/@marciomariani/sharing-sessionstorage-between-tabs-5b6f42c6348c
          sessionStorage.setItem(AUTH_STRINGS.authToken, data.authToken);

          if (data.confirmationNumber) {
            // The user has already completed the retro-certs process.
            history.push(routes.retroCertsConfirmation, { isReturning: true });
          } else {
            const completedWeeks = weeksCompleted(
              data.formData,
              data.programPlan
            );
            if (completedWeeks === 0) {
              history.push(routes.retroCertsWeeksToCertify);
            } else {
              history.push(
                `${routes.retroCertsCertify}/${fromIndexToPathString(
                  data.weeksToCertify[
                    Math.min(completedWeeks, data.weeksToCertify.length - 1)
                  ]
                )}`,
                { returningUser: true }
              );
            }
          }
        }
        logEvent("RetroCerts", "LoginResponse", data.status);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  useEffect(() => {
    const ssnRef = document.getElementById("formSsn");
    if (showSsn) {
      Inputmask.remove(ssnRef);
      Inputmask("ssn", { placeholder: "#" }).mask(ssnRef);
      ssnRef.type = "text";
    } else {
      Inputmask.remove(ssnRef);
      Inputmask("9", { repeat: "9", jitMasking: true }).mask(ssnRef);
      ssnRef.type = "password";
      ssnRef.placeholder = "###-##-####";
    }
  });

  function toggleSsn() {
    const toggle = !showSsn;
    setShowSsn(toggle);
  }

  function getSsnToggleText() {
    return showSsn
      ? t("retrocert-login.hide-ssn")
      : t("retrocert-login.show-ssn");
  }

  const genericValidationError = (
    <Row>
      <div className="col-md-12">
        <Alert variant="danger">{t("generic-validation-error-message")}</Alert>
      </div>
    </Row>
  );

  const currentLanguage = i18n.language;

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page">
        <div className="container p-4">
          <h1>{t("retrocert-login.title")}</h1>
          <LanguageSelector className="mt-3 mb-4" />
          {showGenericValidationError && validated && genericValidationError}
          {errorTransKey === "retrocert-login.session-timed-out" && errorAlert}
          <p>{t("retrocert-login.help")}</p>
          <p>{t("retrocert-login.instructions")}</p>
          <p>{t("retrocert-login.required-text")}</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group controlId="formLastName" className="col-md-6">
                <Form.Label>{`* ${t(
                  "retrocert-login.last-name-label"
                )}`}</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => handleChange(e, setLastName)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {t("required-error")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="mb-n2 mt-4">{`* ${t(
              "retrocert-login.dob-heading"
            )}`}</div>
            <small className="text-muted">
              {t("retrocert-login.dob-hint")}
            </small>
            <Row>
              <Form.Group controlId="formDobMonth" as={Col} md={2}>
                <Form.Label>{t("retrocert-login.dob-month")}</Form.Label>
                <Form.Control
                  type="text"
                  value={dobMonth}
                  maxLength={2}
                  onChange={(e) => handleChange(e, setDobMonth)}
                  required
                  pattern="(^0[1-9])|(^1[0-2])|(^[1-9]$)"
                />
                <Form.Control.Feedback type="invalid">
                  {t("required-error")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDobDay" as={Col} md={2}>
                <Form.Label>{t("retrocert-login.dob-day")}</Form.Label>
                <Form.Control
                  type="text"
                  value={dobDay}
                  maxLength={2}
                  onChange={(e) => handleChange(e, setDobDay)}
                  required
                  pattern="(^0[1-9])|(^1[0-9])|(^2[0-9])|(^3[0-1])|(^[1-9]$)"
                />
                <Form.Control.Feedback type="invalid">
                  {t("required-error")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDobYear" as={Col} md={3}>
                <Form.Label>{t("retrocert-login.dob-year")}</Form.Label>
                <Form.Control
                  type="text"
                  value={dobYear}
                  maxLength={4}
                  onChange={(e) => handleChange(e, setDobYear)}
                  required
                  pattern="[12][890]\d\d"
                />
                <Form.Control.Feedback type="invalid">
                  {t("required-error")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mt-4">
              <Form.Group controlId="formSsn" className="col-md-6">
                <Form.Label>{`* ${t("retrocert-login.ssn-label")}`}</Form.Label>
                <Form.Text muted className="ssn-hint">
                  {t("retrocert-login.ssn-hint")}
                </Form.Text>
                {/* sr-only is invisible and used for screen readers:
                https://v4-alpha.getbootstrap.com/getting-started/accessibility/#skip-navigation */}
                <span id="ssn-sr-desc" className="sr-only">
                  {t("retrocert-login.ssn-screen-reader")}
                </span>
                <Form.Control
                  value={ssn}
                  onChange={(e) => handleChange(e, setSsn)}
                  aria-describedby="ssn-sr-desc"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {t("required-error")}
                </Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={toggleSsn}
                    variant="link"
                    style={{ fontWeight: "normal" }}
                    size="sm"
                  >
                    {getSsnToggleText()}
                  </Button>
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formReCaptcha" className="col-md-6">
                <ReCAPTCHA
                  key={currentLanguage}
                  sitekey="6Lf-DQEVAAAAABCMwJ-Gnbqec08RuiPhMZPtZPm9"
                  ref={recaptchaRef}
                  hl={currentLanguage}
                />
                <Form.Text className="text-muted">
                  {t("retrocert-login.recaptcha-text")}
                </Form.Text>
              </Form.Group>
            </Row>
            {(errorTransKey === "retrocert-login.invalid-user-error" ||
              errorTransKey === "retrocert-login.invalid-recaptcha-error") &&
              errorAlert}
            <Button variant="secondary" type="submit" className="mt-4">
              {t("retrocert-login.submit")}
            </Button>
          </Form>
        </div>
      </main>
      <SessionTimer action="clear" setUserData={setUserDataPropType} />
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

RetroCertsAuthPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
};

export default RetroCertsAuthPage;
