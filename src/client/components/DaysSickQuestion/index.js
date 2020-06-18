import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
    <Form>
      <Form.Group>
        <Form.Label column md="10">
          {t("retrocerts-certification.q-tooSickNumberOfDays")}
        </Form.Label>
        <Form.Control type="text" value={numDays} onChange={onChange} />
      </Form.Group>
    </Form>
  );
}

DaysSickQuestion.propTypes = {
  onChange: PropTypes.func.isRequired,
  numDays: PropTypes.number,
};

export default DaysSickQuestion;
