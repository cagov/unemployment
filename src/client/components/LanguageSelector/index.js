import Button from "react-bootstrap/Button";
import React from "react";
import PropTypes from "prop-types";
import i18n from "../../i18n";

function LanguageSelector(props) {
  function isEnglish() {
    return i18n.language.startsWith("en");
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(isEnglish() ? "es" : "en");
  };

  return (
    <Button
      variant="outline-secondary"
      className={`text-dark bg-light ${props.className}`}
      onClick={toggleLanguage}
    >
      {isEnglish() ? "Español" : "English"}
    </Button>
  );
}

LanguageSelector.propTypes = {
  className: PropTypes.string,
};

export default LanguageSelector;
