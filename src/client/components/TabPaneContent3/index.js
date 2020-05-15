import { Trans, useTranslation } from "react-i18next";
import React from "react";
import CertificationExplanationContent from "../CertificationExplanationContent";

function TabPaneContent3() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab3-header1" />
      </h3>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab3-list1=item1">
            <strong>
              You should receive the confirmation of your application within two
              weeks via postal mail.
            </strong>{" "}
            We'll let you know what your WBA is, based on our wage records. For
            an initial estimate of your WBA, use our{" "}
            <a href={t("links.edd-calculator")}>UI benefit calculator</a>.
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab3-list1-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab3-list1-item3" />
        </li>
      </ul>

      <p>
        <Trans t={t} i18nKey="tab3-p1" />
      </p>

      <h4>
        <Trans t={t} i18nKey="tab3-header2" />
      </h4>

      <p>
        <Trans t={t} i18nKey="tab3-p2" />
      </p>
      <p>
        <Trans t={t} i18nKey="tab3-p3">
          <strong>
            Once we verify your income, your weekly benefit amount may increase
          </strong>
          . Any increase will also apply retroactively. We will notify you of
          any increase you are entitled to receive.{" "}
          <a href={t("links.edd-pua")}>Read more about PUA.</a>
        </Trans>
      </p>

      <div className="highlight-blockquote mb-5">
        <Trans t={t} i18nKey="tab3-blockquote1" />
      </div>

      <h3>
        <Trans t={t} i18nKey="tab3-header3" />
      </h3>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab3-list2-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab3-list2-item2" />
        </li>
      </ul>
      <CertificationExplanationContent />
      <h3>
        <Trans t={t} i18nKey="tab3-header5" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab3-p7">
          We understand that it’s a difficult time to look for a job right now.
          You are <strong>currently not</strong> required to upload your resume
          to <a href={t("links.caljobs")}>CalJOBS</a>, during the COVID-19
          pandemic.
        </Trans>
      </p>
    </div>
  );
}

export default TabPaneContent3;
