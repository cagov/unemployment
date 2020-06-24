/**
 * Utility function for checking to see if form data is completed.
 */
const programPlan = require("../data/programPlan");

const questionsOneThroughFour = [
  "tooSick",
  "couldNotAcceptWork",
  "didYouLook",
  "refuseWork",
];
const employerFields = [
  "employerName",
  "address1",
  "city",
  "state",
  "zipcode",
  "lastDateWorked",
  "totalHoursWorked",
  "grossEarnings",
  "reason",
];

function weeksCompleted(formDataArray, programPlanArray) {
  let completedCount = 0;
  if (!formDataArray) {
    return completedCount;
  }

  formDataArray.forEach((formData, i) => {
    for (const field of questionsOneThroughFour) {
      if (formData[field] === undefined) return;
    }

    if (formData.tooSick && formData.tooSickNumberOfDays === undefined) return;

    const weekProgramPlan = programPlanArray[i] || programPlanArray[0];
    const questionFive =
      weekProgramPlan === programPlan.puaFullTime
        ? "otherBenefits"
        : "schoolOrTraining";
    if (formData[questionFive] === undefined) return;

    // Question 6
    if (formData.workOrEarn === undefined) return;
    if (formData.workOrEarn) {
      if (!formData.employers || formData.employers.length === 0) return;
      for (const employerData of formData.employers) {
        for (const employerField of employerFields) {
          if (employerData[employerField] === undefined) return;
        }
        if (
          employerData.reason !== "still-working" &&
          employerData.moreDetails === undefined
        )
          return;
      }
    }

    // Question 7
    if (weekProgramPlan === programPlan.puaFullTime) {
      if (formData.recentDisaster === undefined) return;
      if (formData.recentDisaster && formData.disasterChoice === undefined)
        return;
    }

    // If we made it this far, we have all the data!
    ++completedCount;
  });

  return completedCount;
}

module.exports = weeksCompleted;
