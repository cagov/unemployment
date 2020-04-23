import Button from "react-bootstrap/Button";
import React from "react";
import { useTranslation } from "react-i18next";

function Subheader() {
  const { t } = useTranslation();

  return (
    <div className="bg-light">
      <div className="container p-4">
        <h2>
          <b>{t("subheaderHeader")}</b>
        </h2>
        <h5>
          <b>{t("subheaderSubheader")}</b>
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
