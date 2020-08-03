import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { logError } from "../../utils";
import { startAndEndDate, toWeekString } from "../../../utils/retroCertsWeeks";
import programPlan from "../../../data/programPlan";
import WeekConfirmationDetails from "../WeekConfirmationDetails";
import AccordionItem from "../AccordionItem";
import getRetroCertQuestionKey from "../../../utils/getRetroCertQuestionKey";

function WeekWithDetail(props) {
  const {
    index,
    showContentArray,
    toggleContent,
    weekData,
    weekIndex,
    weekProgramPlan,
  } = props;
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

  function getQuestionKey(transKey) {
    return getRetroCertQuestionKey(transKey, weekProgramPlan);
  }

  function getSubmittedAnswer(questionName, weekData) {
    const answer = weekData[questionName];
    if (answer === undefined) {
      // The only case where the answer should be undefined is for
      // the "number of days you were sick" question, and then only
      // if the answer to "were you sick" was yes
      if (questionName !== "tooSickNumberOfDays" || weekData.tooSick) {
        logError(`The answer is undefined for question ${questionName} with
        weekData ${weekData}, which should never occur`);
      }
      return false;
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
    logError(`The employers field is missing from weekData ${weekData},
      which should never occur`);
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

  return (
    <AccordionItem
      header={
        <Trans
          t={t}
          i18nKey="retrocerts-week-list-item"
          values={{ ...dates, weekForUser }}
        />
      }
      content={
        <WeekConfirmationDetails
          employers={weekHasEmployers ? weekData.employers : undefined}
          questionAnswers={questionAnswers}
          questionKeys={questionKeys}
          weekString={toWeekString(weekIndex)}
        />
      }
      showContent={showContentArray[index]}
      toggleContent={() => toggleContent(index)}
    />
  );
}

WeekWithDetail.propTypes = {
  index: PropTypes.number.isRequired,
  showContentArray: PropTypes.arrayOf(PropTypes.bool).isRequired,
  toggleContent: PropTypes.func.isRequired,
  weekData: PropTypes.object.isRequired,
  weekIndex: PropTypes.number.isRequired,
  weekProgramPlan: PropTypes.string.isRequired,
};

export default WeekWithDetail;
