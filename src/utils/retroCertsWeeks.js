const START_DATE = [
  "02/02/20",
  "02/09/20",
  "02/16/20",
  "02/23/20",
  "03/01/20",
  "03/08/20",
  "03/15/20",
  "03/22/20",
  "03/29/20",
  "04/05/20",
  "04/12/20",
  "04/19/20",
  "04/26/20",
  "05/03/20",
];

const END_DATE = [
  "02/08/20",
  "02/15/20",
  "02/22/20",
  "02/29/20",
  "03/07/20",
  "03/14/20",
  "03/21/20",
  "03/28/20",
  "04/04/20",
  "04/11/20",
  "04/18/20",
  "04/25/20",
  "05/02/20",
  "05/09/20",
];

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
  const matches = dateString.match(/20(\d\d)-(\d\d)-(\d\d)/);
  if (!matches || matches.length !== 4) {
    return -1;
  }
  const [shortYear, month, day] = matches.slice(1);
  const endDateString = month + "/" + day + "/" + shortYear;
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
  const [month, day, shortYear] = dateString.split("/");
  return "20" + shortYear + "-" + month + "-" + day;
};

module.exports = { toWeekString, fromPathStringToIndex, fromIndexToPathString };
