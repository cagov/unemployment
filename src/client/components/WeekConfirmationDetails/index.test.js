import renderTransContent from "../../test-helpers/renderTransContent";
import TabPaneContent from "./index";

describe("<WeekConfirmationDetails />", () => {
  it("renders the WeekConfirmationDetails component", async () => {
    const content = renderTransContent(TabPaneContent, {
      employers: [
        {
          address1: "200 Test st.",
          address2: "asdf",
          city: "City",
          employerName: "employer",
          grossEarnings: "123",
          id: "0323032",
          lastDateWorked: "4/4/2020",
          moreDetails: "",
          reason: "still-working",
          state: "CA",
          totalHoursWorked: "23",
          zipcode: "23212",
        },
      ],
      questionAnswers: [
        "Yes",
        2,
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "Yes",
        "A member of your house has COVID-19",
      ],
      questionKeys: [
        "retrocerts-certification.questions.pua-full-time.tooSick",
        "retrocerts-certification.questions.pua-full-time.tooSickNumberOfDays",
        "retrocerts-certification.questions.pua-full-time.couldNotAcceptWork",
        "retrocerts-certification.questions.pua-full-time.didYouLook",
        "retrocerts-certification.questions.pua-full-time.refuseWork",
        "retrocerts-certification.questions.pua-full-time.otherBenefits",
        "retrocerts-certification.questions.pua-full-time.workOrEarn",
        "retrocerts-certification.questions.pua-full-time.recentDisaster",
        "retrocerts-certification.questions.pua-full-time.disasterChoice",
      ],
      weekString: "03/08/2020 - 03/14/2020",
    });
    expect(content).toMatchSnapshot();
  });
});
