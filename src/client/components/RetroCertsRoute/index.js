import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import PageNotFound from "../../pages/PageNotFound";
import SessionTimer from "../../components/SessionTimer";

function userIsAuthenticated() {
  return !!sessionStorage.getItem(AUTH_STRINGS.authToken);
}

function userDataIsSet(userData) {
  return !!userData.weeksToCertify;
}

/**
 * A component that wraps authorized page components.
 *
 * This does the following:
 * - Passes props from the Route down to the page component.
 * - Adds the session timer to each page
 *
 * @returns {React.ReactElement}
 */
function AuthorizedPageWrapper(props) {
  const { pageComponent: Component, pageProps, computedMatch } = props;

  return (
    <React.Fragment>
      <Component routeComputedMatch={computedMatch} {...pageProps} />
      <SessionTimer
        action="startOrUpdate"
        setUserData={pageProps.setUserData}
      />
    </React.Fragment>
  );
}

AuthorizedPageWrapper.propTypes = {
  pageComponent: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    userData: userDataPropType,
    setUserData: setUserDataPropType,
  }),
  computedMatch: PropTypes.object.isRequired,
};

function RetroCertsRoute(props) {
  const {
    pageComponent: Component,
    isProduction,
    pageProps,
    requiresAuthentication,
    ...routeProps
  } = props;

  let routeChild = <div>Loading...</div>;
  if (isProduction) {
    routeChild = <PageNotFound />;
  } else if (!requiresAuthentication) {
    routeChild = <Component {...pageProps} />;
  } else if (userIsAuthenticated() && userDataIsSet(pageProps.userData)) {
    routeChild = <AuthorizedPageWrapper {...props} />;
  } else {
    // This page requires authentication and the user is not authenticated.
    // Try using the auth token if they have one.
    const authToken = sessionStorage.getItem(AUTH_STRINGS.authToken);
    if (!authToken) {
      // The user came here directly, send them back to the login page.
      routeChild = <Redirect to={routes.retroCertsAuth} push />;
    } else {
      // Try to refresh the data with the auth token.
      fetch(AUTH_STRINGS.apiPath.data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          pageProps.setUserData(data);
          if (data.status !== AUTH_STRINGS.statusCode.ok) {
            sessionStorage.removeItem(AUTH_STRINGS.authToken);
          }
        })
        .catch((error) => console.error(error));
      // While the refresh happens, we show the default Loading.... text.
    }
  }

  return <Route {...routeProps}>{routeChild}</Route>;
}

RetroCertsRoute.propTypes = {
  exact: PropTypes.bool,
  isProduction: PropTypes.bool,
  pageComponent: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    userData: userDataPropType,
    setUserData: setUserDataPropType,
  }),
  path: PropTypes.string.isRequired,
  requiresAuthentication: PropTypes.bool,
};

export default RetroCertsRoute;
