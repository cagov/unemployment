import PropTypes from "prop-types";

export const userDataPropType = PropTypes.shape({
  status: PropTypes.string,
  lastName: PropTypes.string,
  weeksToCertify: PropTypes.arrayOf(PropTypes.number),
  programPlan: PropTypes.arrayOf(PropTypes.string),
  confirmationNumber: PropTypes.string,
});

export const setUserDataPropType = PropTypes.func;
