import React, { Suspense, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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

export default function App(props) {
  const hostname = props.hostname || window.location.hostname;
  const isProduction = hostname === "unemployment.edd.ca.gov";

  const [retroCertsUserData, setRetroCertsUserData] = useState({
    status: AUTH_STRINGS.statusCode.notLoggedIn,
  });

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
