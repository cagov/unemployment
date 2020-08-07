import React, { Suspense, useState, useRef } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import RetroCertsRoute from "./components/RetroCertsRoute";
import StaffViewRoute from "./components/StaffViewRoute";
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RetroCertsAuthPage from "./pages/RetroCertsAuthPage";
import RetroCertsWeeksToCertifyPage from "./pages/RetroCertsWeeksToCertifyPage";
import RetroCertsCertificationPage from "./pages/RetroCertsCertificationPage";
import RetroCertsConfirmationPage from "./pages/RetroCertsConfirmationPage";
import StaffViewAuthPage from "./pages/StaffViewAuthPage";
import StaffViewConfirmationPage from "./pages/StaffViewConfirmationPage";

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
        <StaffViewRoute
          path={routes.staffViewConfirmation}
          pageComponent={StaffViewConfirmationPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
        />
        <StaffViewRoute
          path={routes.staffViewAuth}
          pageComponent={StaffViewAuthPage}
          pageProps={{
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData,
          }}
        />
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
