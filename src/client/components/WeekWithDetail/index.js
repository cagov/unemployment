import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { startAndEndDate, toWeekString } from "../../../utils/retroCertsWeeks";
import programPlan from "../../../data/programPlan";
import WeekConfirmationDetails from "../WeekConfirmationDetails";

function WeekWithDetail(props) {
  const { index, weekData, weekIndex, weekProgramPlan } = props;
  const { t } = useTranslation();

  const [showDetail, setShowDetail] = useState(false);

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
    // Show answer in language selected on the page, not the original language submitted
    if (questionName === "disasterChoice") {
      return t(
        "retrocerts-certification.disaster-choices." + answer.split(" ")[0]
      );
    }

    if (answer === true) {
      return t("yesnoquestion.Yes");
    } else if (answer === false) {
      return t("yesnoquestion.No");
    }
    return answer;
  }

  const weekForUser = index + 1;
  const dates = startAndEndDate(weekIndex);
  const weekHasEmployers = weekData.workOrEarn;
  if (weekHasEmployers && !weekData.employers) {
    // TODO turn this into an error we log
    console.log("missing employer(s)");
  }

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

  // TODO(kalvin): refactor collapsible accordion item from here and Acknowledgement
  // in RetroCertsConfirmationPage out to common file
  const EN_DASH = "–";
  return (
    <React.Fragment>
      <Alert variant="secondary" className="d-flex">
        <div className="flex-fill">
          <button
            className="toggleAccordion"
            onClick={() => setShowDetail(!showDetail)}
          >
            <span className="toggleCharacter">
              {showDetail ? EN_DASH : "+"}
            </span>
            <Trans
              t={t}
              i18nKey="retrocerts-week-list-item"
              values={{ ...dates, weekForUser }}
            />
          </button>
        </div>
      </Alert>

      {showDetail && (
        <div className="detail">
          <WeekConfirmationDetails
            employers={weekHasEmployers ? weekData.employers : undefined}
            questionAnswers={questionAnswers}
            questionKeys={questionKeys}
            weekString={toWeekString(weekIndex)}
          />
        </div>
      )}
    </React.Fragment>
  );
}

WeekWithDetail.propTypes = {
  index: PropTypes.number,
  weekData: PropTypes.object,
  weekIndex: PropTypes.number,
  weekProgramPlan: PropTypes.string,
};

export default WeekWithDetail;
