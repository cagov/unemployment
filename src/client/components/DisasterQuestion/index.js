import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function DisasterQuestion(props) {
  const { t } = useTranslation();

  const [userChoice, setUserChoice] = useState(props.choice);

  const [isDirty, setIsDirty] = useState(
    props.choice !== undefined || userChoice !== undefined
  );

  function onChange(event) {
    setUserChoice(event.target.value);
    setIsDirty(true);

    props.onChange({
      name: "disasterChoice",
      value: event.target.value,
    });
  }

  const disasterRadioChoices = [
    t("retrocerts-certification.disaster-choices.choice-1"),
    t("retrocerts-certification.disaster-choices.choice-2"),
    t("retrocerts-certification.disaster-choices.choice-3"),
    t("retrocerts-certification.disaster-choices.choice-4"),
    t("retrocerts-certification.disaster-choices.choice-5"),
    t("retrocerts-certification.disaster-choices.choice-6"),
    t("retrocerts-certification.disaster-choices.choice-7"),
    t("retrocerts-certification.disaster-choices.choice-8"),
    t("retrocerts-certification.disaster-choices.choice-9"),
    t("retrocerts-certification.disaster-choices.choice-10"),
    t("retrocerts-certification.disaster-choices.choice-11"),
    t("retrocerts-certification.disaster-choices.choice-12"),
    t("retrocerts-certification.disaster-choices.choice-13"),
    t("retrocerts-certification.disaster-choices.choice-14"),
  ];

  function getValidationClass() {
    return isDirty ? "" : "unchecked";
  }

  function isChecked(value) {
    return value === userChoice;
  }

  return (
    <Form.Group controlId="disaster-question" className={getValidationClass()}>
      <Form.Label>{props.questionText}</Form.Label>
      {disasterRadioChoices.map((value) => (
        <Form.Check
          key={value}
          label={value}
          type="radio"
          id={`disaster-question-radio${value}`}
          onChange={onChange}
          name="disaster-question"
          value={value}
          required
          checked={isChecked(value)}
        />
      ))}
      <Form.Control.Feedback type="invalid">
        {t("required-error")}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

DisasterQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  choice: PropTypes.string,
  questionText: PropTypes.string,
};

export default DisasterQuestion;
