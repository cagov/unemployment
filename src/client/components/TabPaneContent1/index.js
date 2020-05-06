import { Trans, useTranslation } from "react-i18next";
import React from "react";

function TabPaneContent1() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab1.header10">
          Proof of citizenship or authorization to work in the United States
        </Trans>
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1.p10">
          You will need <strong>all</strong> of the following:
        </Trans>
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item1">
            Social Security number
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item2">
            California driver license or ID card
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list10-item3">
            Proof of US citizenship, or a green card, or a visa that allows you
            to work in the US, or an Alien Registration Number
          </Trans>
        </li>
      </ul>

      <p>
        <Trans t={t} i18nKey="tab1.p20">
          You must be authorized to work in the US to receive unemployment
          benefits. If you are not a US citizen, have information from your
          employment authorization document ready.
        </Trans>{" "}
      </p>

      <h3>
        <Trans t={t} i18nKey="tab1.header20">
          Information about your work history
        </Trans>
      </h3>

      <p>
        <Trans t={t} i18nKey="tab1.p30">
          Your work history affects the amount of benefits you receive each
          week. Submitting accurate information helps us process your claim
          faster. You will need:
        </Trans>
      </p>

      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list20-item1">
            <strong>Work history from the last 18 months.</strong> This includes
            the name of any companies as they appear on your paycheck, the dates
            of employment, hours worked per week, the total wages you earned
            before taxes were taken out (gross wages), hourly rate of pay, and
            the reason you are no longer working.
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list20-item2">
            <strong>
              Specific information from your last employer or company.
            </strong>{" "}
            This includes your employer’s name, mailing address, phone number,
            supervisor’s name, total wages you earned before taxes were taken
            out (gross wages) for the last week you worked, and the reason for
            your unemployment.
          </Trans>
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab1.header30">
          Federal and military documents
        </Trans>
      </h3>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab1.list30-item1">
            <strong>If you are a former federal employee,</strong> have your{" "}
            <i>Notice to Federal Employees About Unemployment Insurance</i>{" "}
            (Standard Form 8) ready.
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab1.list30-item2">
            <strong>
              If you served in the military in the last 18 months,
            </strong>{" "}
            have your{" "}
            <i>Certificate of Release or Discharge from Active Duty</i> (DD 214)
            ready.
          </Trans>
        </li>
      </ul>
    </div>
  );
}

export default TabPaneContent1;
