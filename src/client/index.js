import "core-js/stable";
import "regenerator-runtime/runtime";
import "whatwg-fetch";
import "./i18n";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render } from "react-dom";
import smoothscroll from "smoothscroll-polyfill";

// Enables scrolling (not just smooth scrolling) on Edge and IE
smoothscroll.polyfill();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
