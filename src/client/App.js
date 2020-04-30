import React, { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import TabbedContainer from "./components/TabbedContainer";

function Page() {
  return (
    <div id="overflow-wrapper">
      <Header />
      {/* <main> triggers a React console warning in IE11, but only in development */}
      <main id="back-to-top" is=" ">
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
