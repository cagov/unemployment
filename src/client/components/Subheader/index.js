import Button from "react-bootstrap/Button";
import React from "react";
import { useTranslation } from "react-i18next";

function Subheader() {
  const { t } = useTranslation();

  return (
    <div className="bg-light">
      <div className="container p-4">
        <h2>
          <b>{t("subheaderH2")}</b>
        </h2>
        <h5>
          <b>{t("subheaderH5")}</b>
        </h5>
        <p>{t("subheaderParagraph")}</p>
        <Button
          variant="secondary"
          href="https://portal.edd.ca.gov/WebApp/Login"
        >
          {t("subheaderButton")}
        </Button>
      </div>
    </div>
  );
}

export default Subheader;
