import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";

describe("<EmployersQuestions />", () => {
  it("renders the component", async () => {
    const wrapper = renderTransContent(Component, {
      onChange: () => {},
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("renders with 2 income sources", async () => {
    const wrapper = renderTransContent(Component, {
      onChange: () => {},
      employers: [
        {
          id: "12345678",
          employerName: "employer name 1",
          address1: "e1 - address 1",
          address2: "",
          city: "city",
          state: "CA",
          zipcode: "94100",
          lastDateWorked: "02/22/2020",
          totalHoursWorked: "10",
          grossEarnings: "$200",
          reason: "still-working",
          moreDetails: "",
        },
        {
          id: "22222222",
          employerName: "employer name 2",
          address1: "e2 - address 1",
          address2: "",
          city: "city 2",
          state: "OR",
          zipcode: "97035",
          lastDateWorked: "02/24/2020",
          totalHoursWorked: "12",
          grossEarnings: "$300",
          reason: "quit",
          moreDetails: "unable to travel",
        },
      ],
    });

    expect(wrapper).toMatchSnapshot();
  });
});
