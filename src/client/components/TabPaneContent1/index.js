import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent1() {
  // const { t } = useTranslation();

  return (
    <div>
      <h4>
        1. Evidence of citizenship or authorization to work in the United States
      </h4>
      <p>
        You will need <strong>all</strong> of following:
      </p>
      <ul>
        <li>Social Security number</li>
        <li>And, California driver license or identification (ID) card</li>
        <li>
          And, citizenship status (this may include your Alien Registration
          Number)
        </li>
      </ul>
      <p>
        You must be authorized to work in the US to receive unemployment
        benefits. If you are not a US citizen, have information from your
        employment authorization document ready.
      </p>
      <h4>2. Information about your work history</h4>
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
      <h4>Federal and military documents</h4>
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
