import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function DisasterQuestion(props) {
  const { t } = useTranslation();

  const [choice, setChoice] = useState(
    props.choice !== undefined
      ? props.choice
      : t("retrocerts-certification.disaster-choices.choice-14")
  );

  function onChange(event) {
    setChoice(event.target.value);

    props.onChange({
      name: "disasterChoice",
      value: event.target.value,
    });
  }

  const disasterDropDownChoices = [
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

  return (
    <Form.Group controlId="disaster-question">
      <Form.Label>{props.questionText}</Form.Label>
      <Form.Control as="select" onChange={onChange} value={choice}>
        {disasterDropDownChoices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

DisasterQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  choice: PropTypes.string,
  questionText: PropTypes.string,
};

export default DisasterQuestion;
