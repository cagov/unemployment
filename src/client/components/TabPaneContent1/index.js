import { Trans, useTranslation } from "react-i18next";
import React from "react";

function TabPaneContent1() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab1-header1" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1-p1" />
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1-list1-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1-list1-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1-list1-item3" />
        </li>
      </ul>

      <p>
        <Trans t={t} i18nKey="tab1-p2" />{" "}
      </p>

      <h3>
        <Trans t={t} i18nKey="tab1-header2" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1-p3" />
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1-list2-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1-list2-item2" />
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab1-header3" />
      </h3>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab1-list3-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab1-list3-item2" />
        </li>
      </ul>
    </div>
  );
}

export default TabPaneContent1;
