import React, { Suspense } from "react";
import Sidebar from "./Sidebar.js";

function Page() {
  return <Sidebar />;
}

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <Page />
    </Suspense>
  );
}
