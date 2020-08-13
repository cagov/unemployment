import { getAppInsights } from "../services/azureApplicationInsights";

const cagovPropertyId = "UA-3419582-2";
const eddPropertyId = "UA-3419582-31";

// log event to Google Analytics
export function logEvent(category, action, label) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });

  // Also track the event in Azure App Insights.
  const appInsights = getAppInsights();
  appInsights.trackEvent({
    name: action,
    properties: {
      category,
      label,
    },
  });
}

// log page to Google Analytics (for client-side routing)
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function logPage(path) {
  window.gtag("config", cagovPropertyId, {
    page_path: path,
  });

  window.gtag("config", eddPropertyId, {
    page_path: path,
  });
}

// To view these errors, go to production Azure and click through:
// Application Insights > Failures > Browser > Exceptions
export function logError(errorMessage) {
  const appInsights = getAppInsights();
  appInsights.trackException({ exception: new Error(errorMessage) });
}

// This app is only built once on the staging environment, so
// process.env.NODE_ENV never equals "production". Therefore, we
// check for the window URL as a workaround.
export const isProdEnv = window.location.hostname === "unemployment.edd.ca.gov";

export const isDevEnv = process.env.NODE_ENV === "development";
