import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SessionTimer from "../../components/SessionTimer";

function RetroCertsAuthPage(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const userData = props.userData;
  const setUserData = props.setUserData;

  const [lastName, setLastName] = useState("");
  const [eddcan, setEddcan] = useState("");
  const [ssn, setSsn] = useState("");
  const [validated, setValidated] = useState(false);

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
      <div className="col-md-6">
        <Alert variant="danger">{t(errorTransKey)}</Alert>
      </div>
    </Row>
  );

  function hasMissingFields() {
    return validated && (!lastName || !eddcan || !ssn);
  }

  const missingFieldsAlert = (
    <Row>
      <div className="col-md-6">
        <Alert variant="danger">
          {t("retrocert-login.missing-fields-error")}
        </Alert>
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

    if (!isValid) return;

    fetch(AUTH_STRINGS.apiPath.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName,
        eddcan,
        ssn,
        reCaptcha: recaptchaRef.current.getValue(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        recaptchaRef.current.reset();
        setUserData(data);
        if (data.authToken) {
          // Session storage is destroyed when the tab is closed! That's a bit weird.
          // If we want to allow the user to use multiple tabs, we could sync the
          // value across tabs:
          // https://medium.com/@marciomariani/sharing-sessionstorage-between-tabs-5b6f42c6348c
          sessionStorage.setItem(AUTH_STRINGS.authToken, data.authToken);
          if (data.confirmationNumber) {
            // The user has already completed the retro-certs process.
            history.push(routes.retroCertsConfirmation);
          } else {
            history.push(routes.retroCertsWhatToExpect);
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event, setter) => {
    // TODO: Remove whitespace and normalize (e.g., remove hyphens).
    setter(event.target.value);
  };

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocert-login.title")}</h1>
          <h2 className="mt-4">{t("retrocert-login.subheader")}</h2>
          <p>{t("retrocert-login.help-text")}</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {errorTransKey === "retrocert-login.session-timed-out" &&
              errorAlert}
            <Row>
              <Form.Group controlId="formLastName" className="col-md-6">
                <Form.Label>{t("retrocert-login.last-name-label")}</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => handleChange(e, setLastName)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {t("retrocert-login.last-name-required-error")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formEddcan" className="col-md-6">
                <Form.Label>{t("retrocert-login.eddcan-label")}</Form.Label>
                <Form.Control
                  type="text"
                  value={eddcan}
                  onChange={(e) => handleChange(e, setEddcan)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {t("retrocert-login.eddcan-required-error")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formSsn" className="col-md-6">
                <Form.Label>{t("retrocert-login.ssn-label")}</Form.Label>
                <Form.Control
                  type="password"
                  value={ssn}
                  onChange={(e) => handleChange(e, setSsn)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {t("retrocert-login.ssn-required-error")}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formReCaptcha" className="col-md-6">
                <ReCAPTCHA
                  sitekey="6Lf-DQEVAAAAABCMwJ-Gnbqec08RuiPhMZPtZPm9"
                  ref={recaptchaRef}
                />
                <Form.Text className="text-muted">
                  {t("retrocert-login.recaptcha-text")}
                </Form.Text>
              </Form.Group>
            </Row>
            {(errorTransKey === "retrocert-login.invalid-user-error" ||
              errorTransKey === "retrocert-login.invalid-recaptcha-error") &&
              errorAlert}
            {hasMissingFields() === true && missingFieldsAlert}
            <Button variant="secondary" type="submit">
              {t("retrocert-login.submit")}
            </Button>
          </Form>
        </div>
      </main>
      <SessionTimer action="clear" setUserData={setUserDataPropType} />
      <Footer />
    </div>
  );
}

RetroCertsAuthPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
};

export default RetroCertsAuthPage;
