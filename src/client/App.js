import React, { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import Subheader from "./components/Subheader";
// import TabbedContainer from "./components/TabbedContainer";

function Page() {
  return (
    <div>
      <Header />
      <main id="back-to-top">
        {/*
        <Subheader />
        Adding a comment to trigger a deploy
        <TabbedContainer />
      */}
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
