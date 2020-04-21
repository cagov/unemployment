import React, { Suspense } from "react";
import Badge from "react-bootstrap/Badge";
import { useTranslation } from "react-i18next";

function Page() {
  const { t } = useTranslation();

  return (
    <div>
      {t("helloWorld")}
      <Badge>News</Badge>
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
