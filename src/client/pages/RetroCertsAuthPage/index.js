import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsAuthPage() {
  const { t } = useTranslation();

  // We will probably need to move this up to the App component so this
  // can be shared accross pages.
  const [userData, setUserData] = useState({
    status: "not-logged-in"
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lastName,
        eddcan,
        ssn})
    })
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch(error => console.error(error));
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
        <Form onSubmit={handleSubmit}>
          <h1>{t("retro-cert-auth-title")}</h1>
          <Form.Group controlId="formLastName">
            <Form.Label>{t("retro-cert-auth-last-name")}</Form.Label>
            <Form.Control
                type="text"
                placeholder={t("retro-cert-auth-last-name-placeholder")}
                onChange={e => handleChange(e, setLastName)}
                />
          </Form.Group>

          <Form.Group controlId="formEDDCAN">
            <Form.Label>{t("retro-cert-auth-eddcan")}</Form.Label>
            <Form.Control
                type="text"
                placeholder={t("retro-cert-auth-eddcan-placeholder")}
                onChange={e => handleChange(e, setEDDCAN)}
                />
          </Form.Group>

          <Form.Group controlId="formSSN">
            <Form.Label>{t("retro-cert-auth-ssn")}</Form.Label>
            <Form.Control
                type="password"
                placeholder={t("retro-cert-auth-ssn-placeholder")}
                onChange={e => handleChange(e, setSSN)}
                />
          </Form.Group>
          {/* reCAPTCHA v3 */}
          <Button variant="secondary" type="submit">
            {t("retro-cert-auth-find-me")}
          </Button>
        </Form>
        </div>
        <div className="container p-4">
          {/* For testing, show the response JSON. */}
          {userData && userData.status !== "not-logged-in" ? JSON.stringify(userData) : ""}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RetroCertsAuthPage;
