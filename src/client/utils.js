const cagovPropertyId = "UA-3419582-2";
const eddPropertyId = "UA-3419582-31";

// log event to Google Analytics
export function logEvent(label) {
  window.gtag("event", "Navigate", {
    event_category: "Unemployment",
    event_label: label,
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
