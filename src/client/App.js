import React, { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Subheader from "./components/Subheader";

function Page() {
  return (
    <div>
      <Header />
      <main id="back-to-top">
        <Subheader />
        <Sidebar />
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
