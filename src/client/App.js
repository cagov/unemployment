import React, { Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RedirectToGuide from "./pages/RedirectToGuide";
import RetroCertsAuthPage from "./pages/RetroCertsAuthPage";
import RetroCertsLandingPage from "./pages/RetroCertsLandingPage";
import routes from "../data/routes";

export default function App(props) {
  const hostname = props.hostname || window.location.hostname
  const isProduction = hostname === "unemployment.edd.ca.gov";

  // TODO: Move status strings into constants in src/data.
  const [retroCertsUserData, setRetroCertsUserData] = useState({
    status: "not-logged-in"
  });
  // Allow us to map back from the name of a page component
  // (declared in routes) to the actual page component.
  const pages = {
    "GuidePage": {component: GuidePage},
    "RedirectToGuide": {component: RedirectToGuide},
    "RetroCertsAuthPage": {component: PageNotFound},
    "RetroCertsLandingPage": {component: PageNotFound}
  };
  if (!isProduction) {
    Object.assign(pages, {
      "RetroCertsAuthPage": {
        component: RetroCertsAuthPage,
        props: {
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData
        }
      },
      "RetroCertsLandingPage": {
        component: RetroCertsLandingPage,
        props: {
            userData: retroCertsUserData,
            setUserData: setRetroCertsUserData
        }
      }
    });
  };

  return (
    <Suspense fallback="Loading...">
      <Switch>
        {Object.values(routes).map(route => {
          const page = pages[route.component];
          return (
            <Route key={route.path} path={route.path} {...route.routeProps}>
              <page.component {...page.props}/>
            </Route>
          );
        })}
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

App.propTypes = {
  hostname: PropTypes.string
};
