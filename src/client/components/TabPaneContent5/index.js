import { Trans, useTranslation } from "react-i18next";
import React from "react";

function TabPaneContent5() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab5-header1" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab5-p1">
          <a href={t("links.edd-coronavirus-faqs")}>
            Coronavirus (COVID-19) FAQs
          </a>
        </Trans>
      </p>
      <p>
        <Trans t={t} i18nKey="tab5-p2">
          More details about what you need to do after you file your claim:{" "}
          <a href={t("links.edd-coronavirus-claims")}>
            COVID-19 Unemployment Insurance Claims
          </a>
        </Trans>
      </p>
      <h3>
        <Trans t={t} i18nKey="tab5-header2" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab5-p3" />
      </p>
      <h4>
        <Trans t={t} i18nKey="tab5-header3" />
      </h4>
      <p>
        <Trans t={t} i18nKey="tab5-p4">
          <strong>This expands who can apply for UI, due to COVID-19.</strong>{" "}
          This includes business owners, independent contractors, self-employed
          workers, freelancers, gig workers and people with limited work
          history. It is also available to people who have exhausted their
          regular UI claims, are serving penalty weeks on their claim, or whose
          claim may be disqualified. PUA supports claims between February 2 and
          December, 2020. <a href={t("links.edd-pua")}>Read more about PUA</a>.
        </Trans>
      </p>
      <h4>
        <Trans t={t} i18nKey="tab5-header4" />
      </h4>
      <p>
        <Trans t={t} i18nKey="tab5-p5" />
      </p>
      <h4>
        <Trans t={t} i18nKey="tab5-header5" />
      </h4>
      <p>
        <Trans t={t} i18nKey="tab5-p6" />
      </p>
      <div className="highlight-blockquote">
        For more information, visit{" "}
        <a href="http://https://edd.ca.gov/about_edd/coronavirus-2019/cares-act.htm">
          CARES Act Provisions
        </a>
        .
      </div>
    </div>
  );
}

export default TabPaneContent5;
