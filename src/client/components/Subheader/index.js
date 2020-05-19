import BPOButton from "../BPOButton";
import Dropdown from "react-bootstrap/Dropdown";
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
        <div className="btn-toolbar" role="toolbar">
          <div className="mr-4 mb-4">
            <BPOButton />
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              className="text-dark bg-light"
            >
              Select Language
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage("en")}>
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage("es")}>
                Español
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Subheader;
