import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RedirectToGuide from "./pages/RedirectToGuide";
import RetroCertsAuthPage from "./pages/RetroCertsAuthPage";
import routes from "../data/routes";

export default function App(props) {
  const hostname = props.hostname || window.location.hostname
  const isProduction = hostname === "unemployment.edd.ca.gov";

  // Allow us to map back from the name of a page component
  // (declared in routes) to the actual page component.
  const pages = {
    "GuidePage": GuidePage,
    "RedirectToGuide": RedirectToGuide,
    "RetroCertsPage": isProduction ? PageNotFound : RetroCertsAuthPage
  };

  return (
    <Suspense fallback="Loading...">
      <Switch>
        {Object.values(routes).map(route => {
          const PageComponent = pages[route.component];
          return (
            <Route key={route.path} path={route.path} {...route.routeProps}>
              <PageComponent />
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
