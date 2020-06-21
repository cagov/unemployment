import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function PerjuryCheckbox(props) {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();

  return (
    <Form.Group className="prejury-checkbox">
      <Form.Text as="h3">{t("retrocerts-certification.ack-header")}</Form.Text>
      <Form.Text as="p">{t("retrocerts-certification.ack-p")}</Form.Text>

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
    </Form.Group>
  );
}

export default PerjuryCheckbox;
