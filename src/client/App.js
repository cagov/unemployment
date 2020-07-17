import React, { Suspense, useState, useRef } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
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

export default function App() {
  const history = useHistory();
  const initialPageLoad = useRef(true);

  const [retroCertsUserData, setRetroCertsUserData] = useState({
    status: AUTH_STRINGS.statusCode.notLoggedIn,
  });

  if (initialPageLoad.current) {
    initialPageLoad.current = false;

    // Initialize Google Analytics.
    /* eslint-disable */
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args) => dataLayer.push(args);
    gtag("js", new Date());
    // For details see: https://support.google.com/analytics/answer/9310895?hl=en
    // https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization
    gtag("config", "UA-3419582-2", { anonymize_ip: true }); // www.ca.gov
    gtag("config", "UA-3419582-31", { anonymize_ip: true }); // edd.ca.gov
    /* eslint-enable */

    // <App> re-mounts every time user data is changed. To have only one
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
          pageComponent={RetroCertsWeeksToCertifyPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsCertify + "/:week"}
          pageComponent={RetroCertsCertificationPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsConfirmation}
          pageComponent={RetroCertsConfirmationPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
          requiresAuthentication
        />
        <RetroCertsRoute
          path={routes.retroCertsAuth}
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
