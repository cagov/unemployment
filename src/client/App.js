import React, { Suspense } from "react";
import Badge from "react-bootstrap/Badge";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
