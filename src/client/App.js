import React, { Suspense } from "react";
import GuidePage from "./pages/GuidePage";

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <GuidePage />
    </Suspense>
  );
}
