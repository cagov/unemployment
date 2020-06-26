import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Feedback from "react-bootstrap/Feedback";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

function PerjuryCheckbox(props) {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();

  return (
    <Form.Group
      controlId="perjury-checkbox"
      className={isChecked ? "" : "unchecked"}
    >
      <Form.Text as="h3">{t("retrocerts-certification.ack-header")}</Form.Text>
      {props.isPua ? (
        <ul>
          <li>{t("retrocerts-certification.ack-list-pua-item-1")}</li>
          <li>{t("retrocerts-certification.ack-list-pua-item-2")}</li>
          <li>{t("retrocerts-certification.ack-list-pua-item-3")}</li>
        </ul>
      ) : (
        <ul>
          <li>{t("retrocerts-certification.ack-list-item-1")}</li>
          <li>{t("retrocerts-certification.ack-list-item-2")}</li>
          <li>{t("retrocerts-certification.ack-list-item-3")}</li>
          <li>{t("retrocerts-certification.ack-list-item-4")}</li>
        </ul>
      )}
      <Form.Row>
        <Col md="auto">
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            required
          />
        </Col>
        <Col>
          <Form.Label>{t("retrocerts-certification.ack-label")}</Form.Label>
        </Col>
      </Form.Row>
      <Feedback type="invalid">{t("required-error")}</Feedback>

      <Form.Text as="p">
        <Trans t={t} i18nKey="retrocerts-certification.submit-p1" />
      </Form.Text>
    </Form.Group>
  );
}

PerjuryCheckbox.propTypes = {
  isPua: PropTypes.bool,
};

export default PerjuryCheckbox;
