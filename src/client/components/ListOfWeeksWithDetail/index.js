import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import PropTypes from "prop-types";
import WeekWithDetail from "../WeekWithDetail";
import getWeekProgramPlan from "../../../utils/getWeekProgramPlan";

function ListOfWeeksWithDetail(props) {
  const { userData, showContent, toggleContent } = props;

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
        showContent={showContent}
        toggleContent={toggleContent}
        weekData={weekData}
        weekIndex={weekIndex}
        weekProgramPlan={weekProgramPlan}
      />
    );
  });
}

ListOfWeeksWithDetail.propTypes = {
  userData: userDataPropType.isRequired,
  showContent: PropTypes.arrayOf(PropTypes.bool).isRequired,
  toggleContent: PropTypes.func.isRequired,
};

export default ListOfWeeksWithDetail;
