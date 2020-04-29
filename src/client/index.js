import "./i18n";
import App from "./App";
import React from "react";
import { render } from "react-dom";
import smoothscroll from "smoothscroll-polyfill";

// Enables scrolling (not just smooth scrolling) on Edge and IE
smoothscroll.polyfill();

render(<App />, document.getElementById("root"));
