const START_DATE = [
  "3/15/20",
  "3/22/20",
  "3/29/20",
  "4/5/20",
  "4/12/20",
  "4/19/20",
  "4/26/20",
  "5/3/20",
];

const END_DATE = [
  "3/21/20",
  "3/28/20",
  "4/4/20",
  "4/11/20",
  "4/18/20",
  "4/25/20",
  "5/2/20",
  "5/9/20",
];

const toWeekString = (index) => {
  return `${START_DATE[index]} - ${END_DATE[index]}`;
};

module.exports = { toWeekString };
