import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RedirectToGuide from "./pages/RedirectToGuide";
import routes from "../data/routes";

// Allow us to map back from the name of a page component
// (declared in routes) to the actual page component.
const pages = {
  "GuidePage": GuidePage,
  "RedirectToGuide": RedirectToGuide
};

export default function App() {
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
