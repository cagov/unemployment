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

  retroCertsAuth: "/retroactive-certification",
  retroCertsWeeksToCertify: "/retroactive-certification/weeks-to-certify",
  retroCertsCertify: "/retroactive-certification/certify",
  retroCertsCertifyWeek0: "/retroactive-certification/certify/2020-02-08",
  retroCertsCertifyWeek1: "/retroactive-certification/certify/2020-02-15",
  retroCertsCertifyWeek2: "/retroactive-certification/certify/2020-02-22",
  retroCertsCertifyWeek3: "/retroactive-certification/certify/2020-02-29",
  retroCertsCertifyWeek4: "/retroactive-certification/certify/2020-03-07",
  retroCertsCertifyWeek5: "/retroactive-certification/certify/2020-03-14",
  retroCertsCertifyWeek6: "/retroactive-certification/certify/2020-03-21",
  retroCertsCertifyWeek7: "/retroactive-certification/certify/2020-03-28",
  retroCertsCertifyWeek8: "/retroactive-certification/certify/2020-04-04",
  retroCertsCertifyWeek9: "/retroactive-certification/certify/2020-04-11",
  retroCertsCertifyWeek10: "/retroactive-certification/certify/2020-04-18",
  retroCertsCertifyWeek11: "/retroactive-certification/certify/2020-04-25",
  retroCertsCertifyWeek12: "/retroactive-certification/certify/2020-05-02",
  retroCertsCertifyWeek13: "/retroactive-certification/certify/2020-05-09",
  retroCertsConfirmation: "/retroactive-certification/confirmation",

  staffViewAuth: "/retroactive-certification/staff-view",
  staffViewConfirmation:
    "/retroactive-certification/staff-view/claimant-status",
};

module.exports = routes;
