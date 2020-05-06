import { Trans, useTranslation } from "react-i18next";
import React from "react";

function TabPaneContent1() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab1.header10" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1.p10" />
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item3" />
        </li>
      </ul>

      <p>
        <Trans t={t} i18nKey="tab1.p20" />{" "}
      </p>

      <h3>
        <Trans t={t} i18nKey="tab1.header20" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1.p30" />
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list20-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list20-item2" />
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab1.header30" />
      </h3>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list30-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list30-item2" />
        </li>
      </ul>
    </div>
  );
}

export default TabPaneContent1;
