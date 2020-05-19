import BPOButton from "../BPOButton";
import React from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

function Subheader() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-light">
      <div className="container p-4">
        <h1>{t("subheaderHeader")}</h1>
        <p>{t("subheaderSubheader")}</p>
        <p>{t("subheaderParagraph")}</p>
        <p>{t("subheaderParagraph2")}</p>
        <button onClick={() => changeLanguage("es")}>es</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        <BPOButton />
      </div>
    </div>
  );
}

export default Subheader;
