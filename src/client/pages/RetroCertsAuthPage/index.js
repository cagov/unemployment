import { useTranslation } from "react-i18next";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

// After the end of retroactive certification we removed
// existing routes to this page but a tiny number of users
// continued to submit, somehow. In case any users see this
// page, the login form below has been removed.
function RetroCertsAuthPage(props) {
  const { t } = useTranslation();
  document.title = t("retrocert-login.title");

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page">
        <div className="container p-4">
          <h1>{t("retrocert-login.title")}</h1>
          <p>
            The retroactive certification period ended on November 21, 2020.
            <a href="https://edd.ca.gov/Unemployment/retro-certify.htm">
              For more information, click here.
            </a>
          </p>
        </div>
      </main>
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

export default RetroCertsAuthPage;
