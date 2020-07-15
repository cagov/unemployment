import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

function WeekConfirmationDetails(props) {
  const { employers, questionAnswers, questionKeys, weekString } = props;
  const { t } = useTranslation();

  const employerAddressFieldNames = [
    "employerName",
    "address1",
    "address2",
    "city",
    "state",
    "zipcode",
  ];

  const employerLast5QuestionNames = [
    "lastDateWorked",
    "totalHoursWorked",
    "grossEarnings",
    "reason",
    "moreDetails",
  ];

  const employerLast5QuestionKeys = employerLast5QuestionNames.map((name) =>
    prefix(name)
  );

  function prefix(key) {
    return "retrocerts-certification.employers." + key;
  }

  function ListOfEmployers(props) {
    return employers.map((employer, index) => {
      return <Employer key={index} employerIndex={index} />;
    });
  }

  function Employer(props) {
    const { employerIndex } = props;
    return (
      <React.Fragment>
        <p>{t(prefix("heading"), { incomeNumber: employerIndex + 1 })}</p>
        <p>
          <strong>
            <EmployerAddress employerIndex={employerIndex} />
          </strong>
        </p>
        <EmployerLast5Items employerIndex={employerIndex} />
      </React.Fragment>
    );
  }
  Employer.propTypes = {
    employerIndex: PropTypes.number,
  };

  function EmployerAddress(props) {
    const { employerIndex } = props;
    const employer = employers[employerIndex];
    return employerAddressFieldNames.map((field, index) => {
      return (
        <React.Fragment key={index}>
          {employer[field]}
          <br />
        </React.Fragment>
      );
    });
  }
  EmployerAddress.propTypes = {
    employerIndex: PropTypes.number,
  };

  function EmployerLast5Items(props) {
    const { employerIndex } = props;

    return employerLast5QuestionKeys.map((questionKey, index) => {
      const question = t(questionKey);
      const employer = employers[employerIndex];
      const questionName = employerLast5QuestionNames[index];
      const answer = getSubmittedAnswer(questionName, employer);

      return (
        <React.Fragment key={index}>
          <p>{question}</p>
          <p>
            <strong>{answer}</strong>
          </p>
        </React.Fragment>
      );
    });
  }
  EmployerLast5Items.propTypes = {
    employerIndex: PropTypes.number,
  };

  function getSubmittedAnswer(questionName, employer) {
    const answer = employer[questionName];
    if (answer === "") {
      // The only case where the answer should be undefined is for
      // the "number of days you were sick" question, and then only
      // if the answer to "were you sick" was yes
      // if (questionName !== "tooSickNumberOfDays" || weekData.tooSick) {
      //   // TODO turn this into an error we log
      //   console.log("missing answer", questionName, weekData);
      // }
      return "N/A";
    }
    if (answer === undefined) {
      // TODO turn this into an error we log
      console.log("missing answer", questionName, employer);
    }

    if (questionName === "reason") {
      return t(prefix("reason-" + answer));
    } else if (questionName === "grossEarnings") {
      return "$" + answer;
    }

    return answer;
  }

  return questionKeys.map((questionKey, index) => {
    const questionNumber = index + 1;
    const answer = questionAnswers[index];
    const showEmployers = questionKey.endsWith("workOrEarn") && employers;

    return (
      <React.Fragment key={index}>
        <p>
          {questionNumber}.{" "}
          <Trans t={t} i18nKey={questionKey} values={{ weekString }} />
        </p>
        <p>
          <strong>{answer}</strong>
        </p>
        {showEmployers && <ListOfEmployers />}
      </React.Fragment>
    );
  });
}
WeekConfirmationDetails.propTypes = {
  employers: PropTypes.arrayOf(PropTypes.object),
  questionAnswers: PropTypes.array,
  questionKeys: PropTypes.arrayOf(PropTypes.string),
  weekString: PropTypes.string,
};

export default WeekConfirmationDetails;
