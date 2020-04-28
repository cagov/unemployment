import React, { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import TabbedContainer from "./components/TabbedContainer";

function Page() {
  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="back-to-top">
        <Subheader />
        <TabbedContainer />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <Page />
    </Suspense>
  );
}
