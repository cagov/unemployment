import React, { Suspense, useState, useRef } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import RetroCertsRoute from "./components/RetroCertsRoute";
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RetroCertsAuthPage from "./pages/RetroCertsAuthPage";
import RetroCertsWeeksToCertifyPage from "./pages/RetroCertsWeeksToCertifyPage";
import RetroCertsCertificationPage from "./pages/RetroCertsCertificationPage";
import RetroCertsConfirmationPage from "./pages/RetroCertsConfirmationPage";
import AUTH_STRINGS from "../data/authStrings";
import routes from "../data/routes";
import { logPage } from "./utils.js";

export default function App(props) {
  const hostname = props.hostname || window.location.hostname;
  const isProduction = hostname === "unemployment.edd.ca.gov";
  const history = useHistory();
  const initialPageLoad = useRef(true);

  const [retroCertsUserData, setRetroCertsUserData] = useState({
    status: AUTH_STRINGS.statusCode.notLoggedIn,
  });

  if (initialPageLoad.current) {
    initialPageLoad.current = false;

    // App re-mounts every time user data is changed. To have only one
    // history listener, add it during the initial page load only.
    history.listen((location) => logPage(location.pathname));
    // Log the current page.
    logPage(history.location.pathname);
  }

  return (
    <Suspense fallback="Loading...">
      <Switch>
        <Route path="/" exact>
          <Redirect to={routes.guideBenefits} />
        </Route>
        <Route path="/guide" component={GuidePage} />
        <RetroCertsRoute
          path={routes.retroCertsWeeksToCertify}
          isProduction={isProduction}
          pageComponent={RetroCertsWeeksToCertifyPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsCertify + "/:week"}
          isProduction={isProduction}
          pageComponent={RetroCertsCertificationPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsConfirmation}
          isProduction={isProduction}
          pageComponent={RetroCertsConfirmationPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsAuth}
          isProduction={isProduction}
          pageComponent={RetroCertsAuthPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
        />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

App.propTypes = {
  hostname: PropTypes.string,
};
