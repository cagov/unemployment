import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";
import "./i18n";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "react-dom";
import ApplicationInsights from "./ApplicationInsights";
import smoothscroll from "smoothscroll-polyfill";

// Enables scrolling (not just smooth scrolling) on Edge and IE
smoothscroll.polyfill();

render(
  <BrowserRouter>
    <ApplicationInsights
      instrumentationKey="57ab6c1e-220e-47fa-96ab-fe49b6a9dc73"
      after={() => {}}
    >
      <App />
    </ApplicationInsights>
  </BrowserRouter>,
  document.getElementById("root")
);
