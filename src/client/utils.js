// log to Google Analytics
export default function LogEvent(label) {
  window.gtag("event", "Navigate", {
    event_category: "Unemployment",
    event_label: label,
  });
}
