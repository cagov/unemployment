import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { startAndEndDate } from "../../../utils/retroCertsWeeks";

function ListOfWeeks(props) {
  const { weeksToCertify, showChecks } = props;
  const { t } = useTranslation();

  return weeksToCertify.map((weekIndex, index) => {
    const weekForUser = index + 1;
    const dates = startAndEndDate(weekIndex);
    return (
      <Alert
        key={`weekToCertify${weekIndex}`}
        variant="secondary"
        className="d-flex"
      >
        <div className="flex-fill">
          <Trans
            t={t}
            i18nKey="retrocerts-week-list-item"
            values={{ ...dates, weekForUser }}
          />
        </div>
        {showChecks && (
          <img
            className="checkmark"
            src="/images/check-circle-fill.svg"
            alt={t("iconAltText.checkmark")}
          />
        )}
      </Alert>
    );
  });
}

ListOfWeeks.propTypes = {
  weeksToCertify: PropTypes.arrayOf(PropTypes.number).isRequired,
  showChecks: PropTypes.bool,
};

export default ListOfWeeks;
