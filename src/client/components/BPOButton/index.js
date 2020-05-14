import Button from "react-bootstrap/Button";
import React from "react";
import { logEvent } from "../../utils.js";
import { useTranslation } from "react-i18next";

function BPOButton() {
  const { t } = useTranslation();

  return (
    <Button
      variant="secondary"
      href="https://www.edd.ca.gov/Benefit_Programs_Online.htm"
      onClick={() => logEvent("register-or-login")}
      target="_blank"
    >
      {t("subheaderButton")}
    </Button>
  );
}

export default BPOButton;
