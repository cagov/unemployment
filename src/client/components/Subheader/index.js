import BPOButton from "../BPOButton";
import LanguageSelector from "../LanguageSelector";
import React from "react";
import { useTranslation } from "react-i18next";

function Subheader() {
  const { t } = useTranslation();

  return (
    <div className="bg-light">
      <div className="container p-4">
        <h1>{t("subheaderHeader")}</h1>
        <p>{t("subheaderSubheader")}</p>
        <p>{t("subheaderParagraph")}</p>
        <p>{t("subheaderParagraph2")}</p>
        <div className="btn-toolbar" role="toolbar">
          <div className="mr-4 mb-4">
            <BPOButton />
          </div>
          <div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
