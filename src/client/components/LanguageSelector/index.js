import React from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import i18n from "../../i18n";

function LanguageSelector(props) {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown className={props.className}>
      <Dropdown.Toggle
        variant="outline-secondary"
        className="text-dark bg-light"
      >
        {t("subheaderLanguageButton")}
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
  );
}

LanguageSelector.propTypes = {
  className: PropTypes.string,
};

export default LanguageSelector;
