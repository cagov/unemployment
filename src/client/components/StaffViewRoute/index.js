import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import routes from "../../../data/routes";

function userDataIsSet(userData) {
  return !!userData.weeksToCertify;
}

function StaffViewRoute(props) {
  const { pageComponent: Component, pageProps, ...routeProps } = props;

  let routeChild = <div>Loading...</div>;
  if (
    routeProps.path === routes.staffViewConfirmation &&
    !userDataIsSet(pageProps.userData)
  ) {
    routeChild = <Redirect to={routes.staffViewAuth} push />;
  } else {
    routeChild = <Component {...pageProps} />;
  }

  return (
    <Route {...routeProps} exact>
      {routeChild}
    </Route>
  );
}

StaffViewRoute.propTypes = {
  exact: PropTypes.bool,
  pageComponent: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    userData: userDataPropType,
    setUserData: setUserDataPropType,
  }),
  path: PropTypes.string.isRequired,
};

export default StaffViewRoute;
