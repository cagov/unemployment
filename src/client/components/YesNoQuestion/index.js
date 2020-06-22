import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function YesNoQuestion(props) {
  const {
    questionNumber,
    questionText,
    helpText,
    inputName,
    onChange,
    ifYes,
    children,
  } = props;
  const [isYes, setIsYes] = useState(ifYes);
  const { t } = useTranslation();

  function onSelectionChanged(e) {
    const value = e.target.value;
    const isYes = value === "Yes";
    setIsYes(isYes);
    if (onChange) {
      onChange({ value: isYes, name: inputName });
    }
  }

  function isChecked(value) {
    if (value === "Yes") {
      return isYes === true;
    } else {
      return isYes === false;
    }
  }

  return (
    <div className="bg-light p-2 m-2">
      <Form.Group controlId={inputName}>
        <Form.Label>
          {questionNumber}.&nbsp;{questionText}
        </Form.Label>
        <Form.Text muted>{helpText}</Form.Text>

        {["Yes", "No"].map((value) => (
          <Form.Check
            key={value}
            inline
            label={t(`yesnoquestion.${value}`)}
            type="radio"
            id={`${inputName}radio${value}`}
            onChange={onSelectionChanged}
            name={inputName}
            value={value}
            checked={isChecked(value)}
            required
          />
        ))}
      </Form.Group>
      {isYes === true && children}
    </div>
  );
}

YesNoQuestion.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ifYes: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default YesNoQuestion;
