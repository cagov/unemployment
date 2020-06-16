import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function YesNoQuestion(props) {
  const {
    questionNumber,
    questionText,
    helpText,
    inputName,
    onChange,
    ifYes,
  } = props;
  const [isYes, setIsYes] = useState(ifYes);

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
      {questionNumber}.&nbsp;{questionText}
      <p className="ml-3">{helpText}</p>
      <Form>
        <Form.Group>
          {["Yes", "No"].map((value) => (
            <Form.Check
              key={value}
              inline
              label={value}
              type="radio"
              id={`radio${value}`}
              onChange={onSelectionChanged}
              name={inputName}
              value={value}
              checked={isChecked(value)}
            />
          ))}
        </Form.Group>
      </Form>
      <div hidden={isYes === null || !isYes}>
        <p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          cursus neque risus, id efficitur felis tincidunt in. Mauris pretium
          tortor orci, ac pharetra ipsum vulputate quis. Maecenas sit amet
          libero ut elit ornare imperdiet sit amet ac velit. Nunc sit amet
          lacinia velit, a tincidunt nibh. Ut porttitor finibus dolor, non porta
          dolor ornare sed. Aenean nunc dolor, congue quis sodales eu, viverra
          tristique ipsum. Ut nec iaculis ipsum, at bibendum sem.
        </p>
      </div>
    </div>
  );
}

YesNoQuestion.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ifYes: PropTypes.bool,
};

export default YesNoQuestion;
