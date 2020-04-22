import React, { Suspense } from "react";
import Badge from "react-bootstrap/Badge";
import { useTranslation } from "react-i18next";

function Page() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <main>
        {t("helloWorld")} <Badge>New</Badge> <br />
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
