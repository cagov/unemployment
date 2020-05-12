import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent1() {
  // const { t } = useTranslation();

  return (
    <div>
      <h3>
        Proof of citizenship or authorization to work in the United States
      </h3>
      <p>
        You will need <strong>all</strong> of following:
      </p>
      <ul>
        <li>Social Security number</li>
        <li>California driver license or ID card</li>
        <li>
          Proof of US citizenship, or a green card, or a visa that allows you to
          work in the US, or an Alien Registration Number
        </li>
      </ul>
      <p>
        You must be authorized to work in the US to receive unemployment
        benefits. If you are not a US citizen, have information from your
        employment authorization document ready.
      </p>
      <h3>Information about your work history</h3>
      <p>
        Your work history affects the amount of benefits you receive each week.
        Submitting accurate information helps us process your claim faster. You
        will need:
      </p>
      <ul>
        <li>
          <strong>Work history from the last 18 months.</strong> This includes
          the name of any companies as they appear on your paycheck, the dates
          of employment, hours worked per week, the total wages you earned
          before taxes were taken out (gross wages), hourly rate of pay, and the
          reason you are no longer working.
        </li>
        <li>
          <strong>
            Specific information from your last employer or company.
          </strong>{" "}
          This includes your employer’s name, mailing address, phone number,
          supervisor’s name, total wages you earned before taxes were taken out
          (gross wages) for the last week you worked, and the reason for your
          unemployment.
        </li>
      </ul>
      <h3>Federal and military documents</h3>
      <ul>
        <li>
          <strong>If you are a former federal employee,</strong> have your{" "}
          <i>Notice to Federal Employees About Unemployment Insurance</i>{" "}
          (Standard Form 8) ready.
        </li>
        <li>
          <strong>If you served in the military in the last 18 months,</strong>{" "}
          have your <i>Certificate of Release or Discharge from Active Duty</i>{" "}
          (DD 214) ready.
        </li>
      </ul>
    </div>
  );
}

export default TabPaneContent1;
