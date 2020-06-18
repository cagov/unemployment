const mockedFormData = [
  {
    weekIndex: 0,
    tooSick: false,
    fullTime: true,
    didYouLook: true,
    refuseWork: false,
    schoolOrTraining: true,
    workOrEarn: true,
    employers: [
      {
        employerName: "Fake Co",
        address1: "111 Main St",
        address2: "",
        city: "Orlando",
        state: "FL",
        zipcode: "32789",
        lastDateWorked: "2020-03-01",
        totalHoursWorked: "4",
        grossEarnings: "$60",
        reason: "Part time work",
        moreDetails: "Some more details",
      },
    ],
  },
];

export default mockedFormData;
