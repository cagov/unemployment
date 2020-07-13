// From: https://github.com/Azure-Samples/application-insights-react-demo/blob/master/src/TelemetryService.js
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

let reactPlugin = null;
let appInsights = null;

/**
 * Create the App Insights Telemetry Service
 * @returns {{reactPlugin: ReactPlugin, appInsights: object, initialize: Function}} - Object
 */
const createTelemetryService = () => {
  /**
   * Initialize the Application Insights class
   * @param {string} instrumentationKey - Application Insights Instrumentation Key
   * @param {object} browserHistory - client's browser history, supplied by the withRouter HOC
   * returns {void}
   */
  const initialize = (instrumentationKey, browserHistory) => {
    if (!browserHistory) {
      throw new Error("Could not initialize Telemetry Service");
    }
    if (!instrumentationKey) {
      throw new Error(
        "Instrumentation key not provided in ApplicationInsights.js"
      );
    }

    reactPlugin = new ReactPlugin();

    appInsights = new ApplicationInsights({
      config: {
        instrumentationKey,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: {
            history: browserHistory,
          },
        },
      },
    });

    appInsights.loadAppInsights();
    if (process.env.NODE_ENV === "development") {
      // Normally metrics are sent as batches. In development mode, send immediately.
      // https://docs.microsoft.com/en-us/azure/azure-monitor/app/api-custom-events-metrics#debug
      appInsights.config.maxBatchSizeInBytes = 0;
    }
  };

  return { reactPlugin, initialize };
};

export const ai = createTelemetryService();
export const getAppInsights = () => appInsights;
