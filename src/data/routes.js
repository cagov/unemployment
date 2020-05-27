/**
 * A single source of truth for the page routes. Include
 * a route's associated component name in its definition
 * below and it'll automatically rendered as a <Route> in
 * the single page app (`client/App.js`).
 */
const routes = {
  home: {
    path: "/guide"
    // We exclude the Home `component` so we can manually import it into pages/index.js
  }
};

module.exports = routes;
