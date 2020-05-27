import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Subheader from "../../components/Subheader";
import TabbedContainer from "../../components/TabbedContainer";

function GuidePage() {
  return (
    <div id="overflow-wrapper">
      <Header />
      {/* <main> triggers a React console warning in IE11, but only in development */}
      <main id="back-to-top">
        <Subheader />
        <TabbedContainer />
      </main>
      <Footer />
    </div>
  );
}

export default GuidePage;
