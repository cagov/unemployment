import { Trans, useTranslation } from "react-i18next";
import React from "react";

function CertificationExplanationContent() {
  const { t } = useTranslation();

  return (
    <div className="gray-box">
      <h4>
        <Trans t={t} i18nKey="certification-header1" />
      </h4>
      <p>
        <Trans t={t} i18nKey="certification-p1" />
      </p>
      <ul>
        <li>
          <Trans t={t} i18nKey="certification-list1-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="certification-list1-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="certification-list1-item3" />
        </li>
        <li>
          <Trans t={t} i18nKey="certification-list1-item4" />
        </li>
        <li>
          <Trans t={t} i18nKey="certification-list1-item5" />
        </li>
      </ul>
      <p>
        <Trans t={t} i18nKey="certification-p2">
          The fastest way to certify is on{" "}
          <a href="https://portal.edd.ca.gov/WebApp/Login?resource_url=https%3A%2F%2Fportal.edd.ca.gov%2FWebApp%2FHome">
            UI Online
          </a>
          . You can also do this by phone by calling 1-866-333-4606, or by
          mailing the paper form.
        </Trans>
      </p>
    </div>
  );
}

export default CertificationExplanationContent;
