import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React, { useState } from "react";

function DaysSickQuestion(props) {
  const { t } = useTranslation();
  const [numDays, setNumDays] = useState(
    props.numDays !== undefined ? String(props.numDays) : ""
  );

  function onChange(event) {
    setNumDays(event.target.value);

    let numDays = parseInt(event.target.value, 10);
    if (isNaN(numDays)) {
      numDays = undefined;
    }
    props.onChange({
      name: "tooSickNumberOfDays",
      value: numDays,
    });
  }

  return (
    <Form.Group controlId="days-sick" className="follow-up">
      <Form.Label>{props.questionText}</Form.Label>
      <Form.Text className="help-text">{props.helpText}</Form.Text>
      <Form.Control
        style={{ width: "6rem" }}
        type="text"
        value={numDays}
        onChange={onChange}
        maxLength={1}
        required
        pattern="[1234567]"
      />
      <Form.Control.Feedback type="invalid">
        {t("required-error")}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

DaysSickQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  numDays: PropTypes.number,
  questionText: PropTypes.string,
  helpText: PropTypes.string,
};

export default DaysSickQuestion;
