import React, { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TabbedContainer from "./components/TabbedContainer";

function Page() {
  return (
    <div>
      <Header />
      <main className="container">
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
