/**
 * A single source of truth for the page routes. Include
 * a route's associated component name in its definition
 * below and it'll automatically rendered as a <Route> in
 * the single page app (`client/App.js`).
 */
const routes = {
  home: {
    path: "/",
    component: "RedirectToGuide",
    routeProps: {
      exact: true
    }
  },
  guide: {
    path: "/guide",
    component: "GuidePage"
  },
  retroCerts: {
    path: "/retroactive-certification",
    component: "RetroCertsPage"
  }
};

module.exports = routes;
