/**
 * A single source of truth for the page routes. Include
 * a route's associated component name in its definition
 * below and it'll automatically rendered as a <Route> in
 * the single page app (`client/App.js`).
 */
const routes = {
  guide: {
    path: "/guide",
    component: "GuidePage"
  },
  guideBenefits: {
    path: "/guide/benefits",
    component: "GuidePage"
  },
  guideBeforeYouApply: {
    path: "/guide/before-you-apply",
    component: "GuidePage"
  },
  guideHowToApply: {
    path: "/guide/how-to-apply",
    component: "GuidePage"
  },
  guideAfterYouSubmit: {
    path: "/guide/after-you-submit",
    component: "GuidePage"
  },
  guideReceiveBenefits: {
    path: "/guide/receive-benefits",
    component: "GuidePage"
  },
  guideReceiveMoreResources: {
    path: "/guide/more-resources",
    component: "GuidePage"
  },
  home: {
    path: "/",
    component: "RedirectToGuide"
  },
  guideSlash: {
    path: "/guide/",
    component: "RedirectToGuide"
  }
};

module.exports = routes;
