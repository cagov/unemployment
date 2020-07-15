import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import { startAndEndDate, toWeekString } from "../../../utils/retroCertsWeeks";
import programPlan from "../../../data/programPlan";
import WeekConfirmationDetails from "../WeekConfirmationDetails";

function ListOfWeeksWithDetail(props) {
  const { userData } = props;
  const { t } = useTranslation();

  const baseQuestionNames = [
    "tooSick",
    "tooSickNumberOfDays",
    "couldNotAcceptWork",
    "didYouLook",
    "refuseWork",
  ];
  const uiOnlyQuestionNames = ["schoolOrTraining", "workOrEarn"];
  const puaOnlyQuestionNames = [
    "otherBenefits",
    "workOrEarn",
    "recentDisaster",
    "disasterChoice",
  ];

  // TODO(kalvin): also used in RCCertificationPage, refactor to common place
  function getQuestionKey(transKey, weekProgramPlan) {
    if (weekProgramPlan === programPlan.uiPartTime) {
      return "retrocerts-certification.questions.ui-part-time." + transKey;
    }
    if (weekProgramPlan === programPlan.uiFullTime) {
      return "retrocerts-certification.questions.ui-full-time." + transKey;
    }
    if (weekProgramPlan === programPlan.puaFullTime) {
      return "retrocerts-certification.questions.pua-full-time." + transKey;
    }
  }

  function getSubmittedAnswer(questionName, weekData) {
    const answer = weekData[questionName];
    if (answer === undefined) {
      // The only case where the answer should be undefined is for
      // the "number of days you were sick" question, and then only
      // if the answer to "were you sick" was yes
      if (questionName !== "tooSickNumberOfDays" || weekData.tooSick) {
        // TODO turn this into an error we log
        console.log("missing answer", questionName, weekData);
      }
      return "N/A";
    }

    // disasterChoice answers are stored in the format "choice-3 TEXT OF Q..."
    if (questionName === "disasterChoice") {
      return answer.substring(answer.indexOf(" ") + 1);
    }

    if (answer === true) {
      return "Yes";
    } else if (answer === false) {
      return "No";
    }
    return answer;
  }

  return userData.weeksToCertify.map((weekIndex, index) => {
    const weekForUser = index + 1;
    const dates = startAndEndDate(weekIndex);
    const weekData = userData.formData[index];
    const weekHasEmployers = weekData.workOrEarn;
    if (weekHasEmployers && !weekData.employers) {
      // TODO turn this into an error we log
      console.log("missing employer(s)");
    }

    // TODO(kalvin): also used in RCCertificationPage, refactor to common place
    const programPlanIndex =
      userData.programPlan.length === 1 ? 0 : weekForUser - 1;
    const weekProgramPlan = userData.programPlan[programPlanIndex];

    let questionNames;
    if (weekProgramPlan === programPlan.puaFullTime) {
      questionNames = baseQuestionNames.concat(puaOnlyQuestionNames);
    } else {
      questionNames = baseQuestionNames.concat(uiOnlyQuestionNames);
    }

    const questionKeys = questionNames.map((questionName) => {
      return getQuestionKey(questionName, weekProgramPlan);
    });

    const questionAnswers = questionNames.map((questionName) => {
      return getSubmittedAnswer(questionName, weekData);
    });

    return (
      <Alert
        key={`weekToCertify${weekIndex}`}
        variant="secondary"
        className="d-flex"
      >
        <div className="flex-fill">
          <Trans
            t={t}
            i18nKey="retrocerts-week-list-item"
            values={{ ...dates, weekForUser }}
          />
          <WeekConfirmationDetails
            employers={weekHasEmployers ? weekData.employers : undefined}
            questionAnswers={questionAnswers}
            questionKeys={questionKeys}
            weekString={toWeekString(weekIndex)}
          />
        </div>
      </Alert>
    );
  });
}

ListOfWeeksWithDetail.propTypes = {
  userData: userDataPropType,
  showChecks: PropTypes.bool,
};

export default ListOfWeeksWithDetail;
