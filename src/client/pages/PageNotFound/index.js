import { useTranslation } from "react-i18next";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page">
        <div className="container p-4">
          <h1>{t("page-not-found-header")}</h1>
          <p>{t("page-not-found-text")}</p>
        </div>
      </main>
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

export default PageNotFound;
