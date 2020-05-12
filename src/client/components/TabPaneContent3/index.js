import { Trans, useTranslation } from "react-i18next";
import React from "react";

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
            <a href="https://www.edd.ca.gov/Unemployment/UI-Calculator.htm">
              UI benefit calculator
            </a>
            .
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
          <a href="https://edd.ca.gov/about_edd/coronavirus-2019/pandemic-unemployment-assistance.htm">
            Read more about PUA.
          </a>
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

      <div className="gray-box">
        <h4>
          <Trans t={t} i18nKey="tab3-header4" />
        </h4>
        <p>
          <Trans t={t} i18nKey="tab3-p5" />
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="tab3-list3-item1" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab3-list3-item2" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab3-list3-item3" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab3-list3-item4" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab3-list3-item5" />
          </li>
        </ul>
        <p>
          <Trans t={t} i18nKey="tab3-p6">
            The fastest way to certify is on{" "}
            <a href="https://portal.edd.ca.gov/WebApp/Login?resource_url=https%3A%2F%2Fportal.edd.ca.gov%2FWebApp%2FHome">
              UI Online
            </a>
            . You can also do this by phone by calling 1-866-333-4606, or by
            mailing the paper form.
          </Trans>
        </p>
      </div>
      <h3>
        <Trans t={t} i18nKey="tab3-header5" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab3-p7">
          We understand that it’s a difficult time to look for a job right now.
          You are <strong>currently not</strong> required to upload your resume
          to{" "}
          <a href="https://www.caljobs.ca.gov/vosnet/Default.aspx">CalJOBS</a>,
          during the COVID-19 pandemic.
        </Trans>
      </p>
    </div>
  );
}

export default TabPaneContent3;
