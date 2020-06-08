import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import auth from "../../../data/auth";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsAuthPage(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const userData = props.userData;
  const setUserData = props.setUserData;

  const [lastName, setLastName] = useState("");
  const [eddcan, setEddcan] = useState("");
  const [ssn, setSsn] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // TODO: Form validation.
    fetch(auth.apiPath.login, {
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
      .then((data) => {
        setUserData(data);
        if (data.authToken) {
          // Session storage is destroyed when the tab is closed! That"s a bit weird.
          // If we want to allow the user to use multiple tabs, we could sync the
          // value across tabs:
          // https://medium.com/@marciomariani/sharing-sessionstorage-between-tabs-5b6f42c6348c
          sessionStorage.setItem(auth.AUTHTOKEN, data.authToken);
          history.push("/retroactive-certification/landing");
        } else {
          sessionStorage.removeItem(auth.AUTHTOKEN);
        }})
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
              <Form.Group controlId="formEddcan" className="col-md-6">
                <Form.Label>{t("retrocert-login.eddcan-label")}</Form.Label>
                <Form.Control
                  type="text"
                  value={eddcan}
                  onChange={(e) => handleChange(e, setEddcan)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="formSsn" className="col-md-6">
                <Form.Label>{t("retrocert-login.ssn-label")}</Form.Label>
                <Form.Control
                  type="password"
                  value={ssn}
                  onChange={(e) => handleChange(e, setSsn)}
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
              {userData && userData.status === auth.statusCode.wrongEddcan && (
                <Alert variant="danger">
                  {t("retrocert-login.eddcan-error")}
                </Alert>
              )}
              {userData && userData.status === "wrong-ssn" && (
                <Alert variant="danger">{t("retrocert-login.ssn-error")}</Alert>
              )}
              {userData && userData.status === auth.statusCode.userNotFound && (
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

RetroCertsAuthPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
};

export default RetroCertsAuthPage;
