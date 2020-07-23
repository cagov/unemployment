import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React, { useState } from "react";

function AccordionItem(props) {
  const { header, expandedBody } = props;
  const { t } = useTranslation();

  const [showDetail, setShowDetail] = useState(false);

  const EN_DASH = "–";
  return (
    <React.Fragment>
      <Alert
        variant="secondary"
        className="d-flex toggleAccordion"
        onClick={() => setShowDetail(!showDetail)}
        role="button"
        aria-label={t("retrocerts-confirmation.show-details")}
      >
        <div className="flex-fill">
          <span className="toggleCharacter">{showDetail ? EN_DASH : "+"}</span>
          {header}
        </div>
      </Alert>
      {showDetail && <div className="detail">{expandedBody}</div>}
    </React.Fragment>
  );
}

AccordionItem.propTypes = {
  header: PropTypes.element.isRequired,
  expandedBody: PropTypes.element.isRequired,
};

export default AccordionItem;
