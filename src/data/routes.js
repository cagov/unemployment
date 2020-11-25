/**
 * A single source of truth for the page routes.
 * Anything not in this file will return a 404.
 */
const routes = {
  home: "/",

  guide: "/guide",
  guideBenefits: "/guide/benefits",
  guideBeforeYouApply: "/guide/before-you-apply",
  guideHowToApply: "/guide/how-to-apply",
  guideAfterYouSubmit: "/guide/after-you-submit",
  guideReceiveBenefits: "/guide/receive-benefits",
  guideMoreResources: "/guide/more-resources",

  staffViewAuth: "/retroactive-certification/staff-view",
  staffViewConfirmation:
    "/retroactive-certification/staff-view/claimant-status",
};

module.exports = routes;
