import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React from "react";

function AccordionItem(props) {
  const { header, content, showContent, toggleContent } = props;
  const { t } = useTranslation();

  const displayStyle = {
    display: showContent ? "block" : "none",
  };

  const EN_DASH = "–";
  return (
    <React.Fragment>
      <Alert
        variant="secondary"
        className="d-flex toggleAccordion"
        onClick={() => toggleContent()}
      >
        <button aria-label={t("retrocerts-confirmation.aria-show-details")}>
          <div className="flex-fill">
            <span className="toggleCharacter">
              {showContent ? EN_DASH : "+"}
            </span>
            {header}
          </div>
        </button>
      </Alert>
      <div className="detail" style={displayStyle}>
        {content}
      </div>
    </React.Fragment>
  );
}

AccordionItem.propTypes = {
  header: PropTypes.element.isRequired,
  content: PropTypes.element.isRequired,
  showContent: PropTypes.bool.isRequired,
  toggleContent: PropTypes.func.isRequired,
};

export default AccordionItem;
