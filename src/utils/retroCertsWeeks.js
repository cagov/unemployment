const START_DATE = [
  "02/02/2020",
  "02/09/2020",
  "02/16/2020",
  "02/23/2020",
  "03/01/2020",
  "03/08/2020",
  "03/15/2020",
  "03/22/2020",
  "03/29/2020",
  "04/05/2020",
  "04/12/2020",
  "04/19/2020",
  "04/26/2020",
  "05/03/2020",
];

const END_DATE = [
  "02/08/2020",
  "02/15/2020",
  "02/22/2020",
  "02/29/2020",
  "03/07/2020",
  "03/14/2020",
  "03/21/2020",
  "03/28/2020",
  "04/04/2020",
  "04/11/2020",
  "04/18/2020",
  "04/25/2020",
  "05/02/2020",
  "05/09/2020",
];

const startAndEndDate = (index) => {
  return { startDate: START_DATE[index], endDate: END_DATE[index] };
};

const toWeekString = (index) => {
  return START_DATE[index] + " - " + END_DATE[index];
};
/**
 * Converts the date from YYYY-MM-DD to an index (0-13).
 * The date should be the Saturday of the week.
 * @param {string} dateString Format YYYY-MM-DD.
 * @returns {number} From 0-13 or -1 if it's not a valid date.
 */
const fromPathStringToIndex = (dateString) => {
  const matches = dateString.match(/(20\d\d)-(\d\d)-(\d\d)/);
  if (!matches || matches.length !== 4) {
    return -1;
  }
  const [year, month, day] = matches.slice(1);
  const endDateString = month + "/" + day + "/" + year;
  return END_DATE.indexOf(endDateString);
};

/**
 * Converts the index to the date string used in paths (YYYY-MM-DD).
 * @param {number} index A value from 0-13.
 * @returns {string}
 */
const fromIndexToPathString = (index) => {
  const dateString = END_DATE[index];
  if (!dateString) {
    return "";
  }
  const [month, day, year] = dateString.split("/");
  return year + "-" + month + "-" + day;
};

module.exports = {
  startAndEndDate,
  toWeekString,
  fromPathStringToIndex,
  fromIndexToPathString,
};
