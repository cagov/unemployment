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
