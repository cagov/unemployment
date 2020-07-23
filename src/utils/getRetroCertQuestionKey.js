const programPlan = require("../data/programPlan");

function getRetroCertQuestionKey(transKey, weekProgramPlan) {
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

module.exports = getRetroCertQuestionKey;
