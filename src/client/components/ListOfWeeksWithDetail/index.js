import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import WeekWithDetail from "../WeekWithDetail";
import getWeekProgramPlan from "../../../utils/getWeekProgramPlan";

function ListOfWeeksWithDetail(props) {
  const { userData } = props;

  return userData.weeksToCertify.map((weekIndex, index) => {
    const weekForUser = index + 1;
    const weekData = userData.formData[index];
    const weekProgramPlan = getWeekProgramPlan(
      userData.programPlan,
      weekForUser
    );

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
