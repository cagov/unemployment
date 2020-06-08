import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsAuthPage() {
  const { t } = useTranslation();

  // We will probably need to move this up to the App component so this
  // can be shared accross pages.
  const [userData, setUserData] = useState({
    status: "not-logged-in",
  });

  const [lastName, setLastName] = useState("");
  const [eddcan, setEDDCAN] = useState("");
  const [ssn, setSSN] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // TODO: Form validation.
    fetch("/retroactive-certification/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName,
        eddcan,
        ssn,
      }),
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group controlId="formLastName" className="col-md-6">
                <Form.Label>{t("retrocert-login.last-name-label")}</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => handleChange(e, setLastName)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formEDDCAN" className="col-md-6">
                <Form.Label>{t("retrocert-login.eddcan-label")}</Form.Label>
                <Form.Control
                  type="text"
                  value={eddcan}
                  onChange={(e) => handleChange(e, setEDDCAN)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formSSN" className="col-md-6">
                <Form.Label>{t("retrocert-login.ssn-label")}</Form.Label>
                <Form.Control
                  type="password"
                  value={ssn}
                  onChange={(e) => handleChange(e, setSSN)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formReCaptcha" className="col-md-6">
                <ReCAPTCHA
                  sitekey="6Lf-DQEVAAAAABCMwJ-Gnbqec08RuiPhMZPtZPm9"
                  // eslint-disable-next-line no-console
                  onChange={(e) => console.log(e)}
                />
                <Form.Text className="text-muted">
                  {t("retrocert-login.recaptcha-text")}
                </Form.Text>
              </Form.Group>
            </Row>
            <Row>
              {userData && userData.status === "wrong-eddcan" && (
                <Alert variant="danger">
                  {t("retrocert-login.eddcan-error")}
                </Alert>
              )}
              {userData && userData.status === "wrong-ssn" && (
                <Alert variant="danger">{t("retrocert-login.ssn-error")}</Alert>
              )}
              {userData && userData.status === "user-not-found" && (
                <Alert variant="danger">
                  {t("retrocert-login.invalid-user-error")}
                </Alert>
              )}
            </Row>
            <Button variant="secondary" type="submit">
              {t("retrocert-login.submit")}
            </Button>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RetroCertsAuthPage;
