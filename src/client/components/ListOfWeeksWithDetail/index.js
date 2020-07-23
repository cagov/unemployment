import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import WeekWithDetail from "../WeekWithDetail";

function ListOfWeeksWithDetail(props) {
  const { userData } = props;

  return userData.weeksToCertify.map((weekIndex, index) => {
    const weekForUser = index + 1;
    const weekData = userData.formData[index];

    // TODO(kalvin): also used in RCCertificationPage, refactor to common place
    const programPlanIndex =
      userData.programPlan.length === 1 ? 0 : weekForUser - 1;
    const weekProgramPlan = userData.programPlan[programPlanIndex];

    return (
      <WeekWithDetail
        index={index}
        key={index}
        weekData={weekData}
        weekIndex={weekIndex}
        weekProgramPlan={weekProgramPlan}
      />
    );
  });
}

ListOfWeeksWithDetail.propTypes = {
  userData: userDataPropType.isRequired,
};

export default ListOfWeeksWithDetail;
