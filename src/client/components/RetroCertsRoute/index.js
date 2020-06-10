import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import React from "react";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import PageNotFound from "../../pages/PageNotFound";

function RetroCertsRoute(props) {
  const { pageComponent: Component, isProduction, pageProps, ...routeProps } = props;

  // TODO: Move authentication logic into this component.

  return (
      <Route {...routeProps}>
        {isProduction
          ? <PageNotFound />
          : <Component {...pageProps} /> }
      </Route>
    )
}

RetroCertsRoute.propTypes = {
  exact: PropTypes.bool,
  isProduction: PropTypes.bool,
  pageComponent: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    userData: userDataPropType,
    setUserData: setUserDataPropType,
  }),
  path: PropTypes.string,
};

export default RetroCertsRoute;
