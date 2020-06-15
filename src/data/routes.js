/**
 * A single source of truth for the page routes. Include
 * a route's associated component name in its definition
 * below and it'll automatically rendered as a <Route> in
 * the single page app (`client/App.js`).
 */
const routes = {
  home: {
    path: "/",
    routeProps: {
      exact: true,
    },
  },
  guide: {
    path: "/guide",
  },
  retroCerts: {
    path: "/retroactive-certification",
  },
  retroCertsWhatToExpect: {
    path: "/retroactive-certification/what-to-expect",
  },
  retroCertsLanding: {
    path: "/retroactive-certification/landing",
  },
  retroCertsConfirmation: {
    path: "/retroactive-certification/confirmation",
  },
};

module.exports = routes;
