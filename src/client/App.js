import React, { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import RetroCertsRoute from "./components/RetroCertsRoute";
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RedirectToGuide from "./pages/RedirectToGuide";
import RetroCertsAuthPage from "./pages/RetroCertsAuthPage";
import RetroCertsLandingPage from "./pages/RetroCertsLandingPage";
import RetroCertsWhatToExpectPage from "./pages/RetroCertsWhatToExpectPage";
import AUTH_STRINGS from "../data/authStrings";

export default function App(props) {
  const hostname = props.hostname || window.location.hostname
  const isProduction = hostname === "unemployment.edd.ca.gov";

  const [retroCertsUserData, setRetroCertsUserData] = useState({
    status: AUTH_STRINGS.statusCode.notLoggedIn,
  });

  return (
    <Suspense fallback="Loading...">
      <Switch>
        <Route path="/" exact component={RedirectToGuide} />
        <Route path="/guide" component={GuidePage} />
        <RetroCertsRoute
          path="/retroactive-certification/landing"
          isProduction={isProduction}
          pageComponent={RetroCertsLandingPage}
          pageProps={{userData: retroCertsUserData, setUserData: setRetroCertsUserData}}/>
        <RetroCertsRoute
          path="/retroactive-certification/what-to-expect"
          isProduction={isProduction}
          pageComponent={RetroCertsWhatToExpectPage}
          pageProps={{userData: retroCertsUserData, setUserData: setRetroCertsUserData}}/>
        <RetroCertsRoute
          path="/retroactive-certification"
          isProduction={isProduction}
          pageComponent={RetroCertsAuthPage}
          pageProps={{userData: retroCertsUserData, setUserData: setRetroCertsUserData}}/>
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
