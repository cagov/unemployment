import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import fflip from "fflip";
import GuidePage from "./pages/GuidePage";
import PageNotFound from "./pages/PageNotFound";
import RedirectToGuide from "./pages/RedirectToGuide";
import RetroCertsPage from "./pages/RetroCertsPage";
import routes from "../data/routes";
import fflipConfig from "../data/fflipConfig";

// Load default feature flag values.
fflip.config(fflipConfig);

export default function App() {
  if (process.env.NODE_ENV === "development"
      || String(process.env.ENABLE_RETRO_CERTS) === "1") {
    fflip.features.retroCerts.enabled = true;
  }

  // Allow us to map back from the name of a page component
  // (declared in routes) to the actual page component.
  const pages = {
    "GuidePage": GuidePage,
    "RedirectToGuide": RedirectToGuide,
    "RetroCertsPage": fflip.features.retroCerts.enabled ? RetroCertsPage : PageNotFound
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
