import BPOButton from "../BPOButton";
import React from "react";
import { useTranslation } from "react-i18next";

function Subheader() {
  const { t } = useTranslation();

  return (
    <div className="bg-light">
      <div className="container p-4">
        <h1>{t("subheaderHeader")}</h1>
        <h2>{t("subheaderSubheader")}</h2>
        <p>{t("subheaderParagraph")}</p>
        <p>
          First register or log in at Benefit Programs Online, then apply for
          unemployment benefits on UI Online&#x2120;.
        </p>
        <BPOButton />
      </div>
    </div>
  );
}

export default Subheader;
