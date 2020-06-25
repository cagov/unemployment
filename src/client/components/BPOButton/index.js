import Button from "react-bootstrap/Button";
import React from "react";
import { logEvent } from "../../utils.js";
import { useTranslation } from "react-i18next";

function BPOButton() {
  const { t } = useTranslation();

  return (
    <Button
      variant="secondary"
      href={t("links.edd-bpo")}
      onClick={() => logEvent("Unemployment", "Navigate", "register-or-login")}
      target="_blank"
    >
      {t("subheaderButton")}
    </Button>
  );
}

export default BPOButton;
