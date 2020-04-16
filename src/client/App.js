import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Page() {
  const { t } = useTranslation();

  return <div>{t("helloWorld")}</div>;
}

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <Page />
    </Suspense>
  );
}
