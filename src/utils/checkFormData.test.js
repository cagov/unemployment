import weeksCompleted from "./checkFormData";
import programPlan from "../data/programPlan";

describe("checkFormData tests", () => {
  const weekOfAnswers = {
    tooSick: false,
    couldNotAcceptWork: false,
    didYouLook: false,
    refuseWork: false,
    schoolOrTraining: false,
    workOrEarn: false,
  };
  const puaWeekOfAnswers = {
    ...weekOfAnswers,
    otherBenefits: false,
    recentDisaster: false,
  };

  it("weeksCompeleted tests", () => {
    expect(weeksCompleted(undefined, undefined)).toBe(0);
    expect(weeksCompleted([weekOfAnswers], [programPlan.uiFullTime])).toBe(1);
    expect(
      weeksCompleted([weekOfAnswers, weekOfAnswers], [programPlan.uiFullTime])
    ).toBe(2);
    expect(
      weeksCompleted(
        [weekOfAnswers, weekOfAnswers],
        [programPlan.uiFullTime, programPlan.puaFullTime]
      )
    ).toBe(1);
    expect(
      weeksCompleted(
        [weekOfAnswers, puaWeekOfAnswers],
        [programPlan.uiFullTime, programPlan.puaFullTime]
      )
    ).toBe(2);
    expect(weeksCompleted([weekOfAnswers], [programPlan.uiPartTime])).toBe(1);
    expect(weeksCompleted([weekOfAnswers], [programPlan.puaFullTime])).toBe(0);
    expect(weeksCompleted([puaWeekOfAnswers], [programPlan.puaFullTime])).toBe(
      1
    );

    let answers = {
      ...puaWeekOfAnswers,
      recentDisaster: true,
    };
    expect(weeksCompleted([answers], [programPlan.puaFullTime])).toBe(0);
    answers.disasterChoice = "x";
    expect(weeksCompleted([answers], [programPlan.puaFullTime])).toBe(1);

    answers = {
      ...weekOfAnswers,
      tooSick: true,
      tooSickNumberOfDays: 1,
    };
    expect(weeksCompleted([answers], [programPlan.uiPartTime])).toBe(1);

    answers = {
      ...weekOfAnswers,
      workOrEarn: true,
      employers: [
        {
          employerName: "e",
          address1: "a",
          city: "c",
          state: "CA",
          zipcode: "12345",
          lastDateWorked: "1/1/2020",
          totalHoursWorked: "1",
          grossEarnings: "1",
          reason: "still-working",
        },
      ],
    };
    expect(
      weeksCompleted([answers, weekOfAnswers], [programPlan.uiPartTime])
    ).toBe(2);
    answers.employers = undefined;
    expect(weeksCompleted([answers], [programPlan.uiFullTime])).toBe(0);
  });
});
