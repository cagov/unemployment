// Returns the program plan for a specific week.
// Most (99.99%) users have the same program plan for all weeks,
// in which case their programPlan is a one element array.
// The rest have a programPlan array of the same length as the number of
// weeks they need to certify for (first element corresponds to first week).
function getWeekProgramPlan(userProgramPlan, weekForUser) {
  const programPlanIndex = userProgramPlan.length === 1 ? 0 : weekForUser - 1;
  return userProgramPlan[programPlanIndex];
}

module.exports = getWeekProgramPlan;
