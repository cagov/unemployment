// From: https://github.com/Azure-Samples/application-insights-react-demo/blob/master/src/telemetry-provider.jsx
import React, { Component, Fragment } from "react";
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../services/azureApplicationInsights";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */
class ApplicationInsights extends Component {
  state = {
    initialized: false,
  };

  componentDidMount() {
    const { history } = this.props;
    const { initialized } = this.state;
    const AppInsightsInstrumentationKey = this.props.instrumentationKey; // PUT YOUR KEY HERE
    if (
      !initialized &&
      Boolean(AppInsightsInstrumentationKey) &&
      Boolean(history)
    ) {
      ai.initialize(AppInsightsInstrumentationKey, history);
      this.setState({ initialized: true });
    }

    this.props.after();
  }

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

ApplicationInsights.propTypes = {
  history: PropTypes.object,
  after: PropTypes.func,
  children: PropTypes.object,
  instrumentationKey: PropTypes.string,
};

export default withRouter(withAITracking(ai.reactPlugin, ApplicationInsights));
