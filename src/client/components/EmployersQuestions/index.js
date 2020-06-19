import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import stateCodes from "../../../data/stateCodes";

// Shorten the name of the repeated translation key.
function tk(transKey) {
  return "retrocerts-certification.employers." + transKey;
}

function EmployerQuestions(props) {
  const { t } = useTranslation();
  const formValues = [
    "employerName",
    "address1",
    "address2",
    "city",
    "state",
    "zipcode",
    "lastDateWorked",
    "totalHoursWorked",
    "grossEarnings",
    "reason",
    "moreDetails",
  ];
  const stateFuncs = {};
  for (const value of formValues) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [get, set] = useState(props.employerData[value]);
    stateFuncs[value] = {
      get,
      set,
    };
  }

  // Date is special because we show three fields for one value.
  const dateTokens = props.employerData.lastDateWorked.split("/");
  const [lastDateWorkedMonth, setLastDateWorkedMonth] = useState(
    dateTokens.length === 3 ? dateTokens[0] : ""
  );
  const [lastDateWorkedDay, setLastDateWorkedDay] = useState(
    dateTokens.length === 3 ? dateTokens[1] : ""
  );

  function renderTextInput(name, className) {
    return (
      <Form.Group>
        <Form.Label>{t(tk(name))}</Form.Label>
        <Form.Control
          className={className}
          type="text"
          value={stateFuncs[name].get}
          onChange={(e) => handleChange(name, e.target.value)}
        />
      </Form.Group>
    );
  }

  function handleChange(name, value) {
    stateFuncs[name].set(value);

    props.onChange({
      ...props.employerData,
      [name]: value,
    });
  }

  function handleDateChange(name, value) {
    if (name === "month") {
      setLastDateWorkedMonth(value);
      handleChange("lastDateWorked", `${value}/${lastDateWorkedDay}/2020`);
    } else if (name === "day") {
      setLastDateWorkedDay(value);
      handleChange("lastDateWorked", `${lastDateWorkedMonth}/${value}/2020`);
    }
  }

  return (
    <Form>
      {renderTextInput("employerName")}
      {renderTextInput("address1")}
      {renderTextInput("address2")}
      <Form.Row>
        <Col md={8}>{renderTextInput("city")}</Col>
        <Form.Group as={Col}>
          <Form.Label>{t(tk("state"))}</Form.Label>
          <Form.Control
            as="select"
            value={stateFuncs.state.get}
            onChange={(e) => handleChange("state", e.target.value)}
          >
            <option />
            {stateCodes.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      {renderTextInput("zipcode", "col-md-2")}

      <p>{t(tk("lastDateWorked"))}</p>
      <Form.Row>
        <Form.Group as={Col} md={2}>
          <Form.Label>{t(tk("month"))}</Form.Label>
          <Form.Control
            type="text"
            value={lastDateWorkedMonth}
            maxLength={2}
            onChange={(e) => handleDateChange("month", e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <Form.Label>{t(tk("day"))}</Form.Label>
          <Form.Control
            type="text"
            value={lastDateWorkedDay}
            maxLength={2}
            onChange={(e) => handleDateChange("day", e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <Form.Label>{t(tk("year"))}</Form.Label>
          <Form.Control type="text" value="2020" disabled />
        </Form.Group>
      </Form.Row>
      {renderTextInput("totalHoursWorked", "col-md-2")}
      {renderTextInput("grossEarnings", "col-md-2")}
      <Form.Group>
        <Form.Label>{t(tk("reason"))}</Form.Label>
        <Form.Control
          as="select"
          value={stateFuncs.reason.get}
          onChange={(e) => handleChange("reason", e.target.value)}
        >
          {["still-working", "completed", "fired", "quit", "laid-off"].map(
            (reason) => (
              <option key={reason} value={reason}>
                {t(tk("reason-" + reason))}
              </option>
            )
          )}
        </Form.Control>
      </Form.Group>
      {stateFuncs.reason.get !== "still-working" && (
        <Form.Group>
          <Form.Label>{t(tk("moreDetails"))}</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={stateFuncs.moreDetails.get}
            onChange={(e) => handleChange("moreDetails", e.target.value)}
          />
        </Form.Group>
      )}
    </Form>
  );
}

EmployerQuestions.propTypes = {
  employerData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    employerName: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    lastDateWorked: PropTypes.string.isRequired,
    totalHoursWorked: PropTypes.string.isRequired,
    grossEarnings: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    moreDetails: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

function EmployersQuestions(props) {
  const { t } = useTranslation();

  function newEmployerData() {
    return {
      // We assign a random id to each employer so we can handle
      // adding and removing income sources.
      id: uuidv4().substring(0, 8),
      employerName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      lastDateWorked: "",
      totalHoursWorked: "",
      grossEarnings: "",
      reason: "still-working",
      moreDetails: "",
    };
  }

  const employersArray = props.employers || [newEmployerData()];

  function onChange(employerData, employerIndex) {
    employersArray[employerIndex] = employerData;
    props.onChange([...employersArray]);
  }

  function addIncomeSource() {
    employersArray.push(newEmployerData());
    props.onChange([...employersArray]);
  }

  function removeIncomeSource(employerIndex) {
    employersArray.splice(employerIndex, 1);
    props.onChange([...employersArray]);
  }

  return (
    <div>
      <p>{t(tk("p1"))}</p>
      {employersArray.map((employerData, employerIndex) => {
        return (
          <div key={"employerData" + employerData.id}>
            <hr />
            <Row className="align-items-baseline">
              <Col md="auto">
                <h3>
                  <Trans
                    t={t}
                    i18nKey={tk("heading")}
                    values={{ incomeNumber: employerIndex + 1 }}
                  />
                </h3>
              </Col>

              {employersArray.length > 1 && (
                <Col md="auto">
                  <Nav.Link onClick={() => removeIncomeSource(employerIndex)}>
                    {t(tk("removeIncomeLink"))}
                  </Nav.Link>
                </Col>
              )}
            </Row>
            <EmployerQuestions
              employerData={employerData}
              onChange={(employerData) => onChange(employerData, employerIndex)}
            />
          </div>
        );
      })}

      <hr />
      <Row>
        <Col md="auto">
          <Nav.Link onClick={addIncomeSource}>
            {t(tk("addIncomeLink"))}
          </Nav.Link>
        </Col>
      </Row>
    </div>
  );
}

EmployersQuestions.propTypes = {
  onChange: PropTypes.func.isRequired,
  employers: PropTypes.arrayOf(PropTypes.object),
};

export default EmployersQuestions;