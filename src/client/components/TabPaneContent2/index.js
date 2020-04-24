import Button from "react-bootstrap/Button";

import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent2() {
  // const { t } = useTranslation();

  return (
    <div>
      <h4>1. Register with Benefit Programs Online</h4>
      <p>
        <strong>
          The fastest way to apply for all unemployment benefits is through UI
          Online. After you have registered for a Benefit Programs Online
          account, you can get started on UI Online.
        </strong>
        You can still apply for UI by{" "}
        <a href="https://edd.ca.gov/Unemployment/Filing_a_Claim.htm">
          phone, mail, or fax
        </a>
        .
      </p>
      <Button
        variant="secondary"
        href="https://www.edd.ca.gov/Benefit_Programs_Online.htm"
      >
        Register or login at Benefits Programs Online
      </Button>
      <h4>2. Submit your application</h4>
      <h5>
        Filling out employment information for COVID-19 claims in UI Online
      </h5>
      <ul>
        <li>
          If you have been laid off or had hours cut back as a direct result of
          COVID-19, under the first dropdown menu in the{" "}
          <strong>Additional Information</strong> section, select{" "}
          <strong>Laid Off/Lack of Work</strong> as your reason for separation.
          Then select <strong>Out of Work Due to COVID-19</strong>.
        </li>
        <li>
          Submit the first date you were affected by COVID-19. We will back pay
          you. PUA supports claims between February 2 and December 31, 2020.
          Claims between March 30 and July 31, 2020 are eligible for an
          additional, taxable $600.
        </li>
      </ul>
      <div className="gray-box">
        <h5>Tips for applying on UI Online</h5>

        <p>These will help your claim get processed faster.</p>
        <ul>
          <li>Include all employment information.</li>
          <li>Check for spelling errors or mismatched employer names.</li>
          <li>
            Confirm your Social Security number or California ID number. (Check
            that this information matches your tax forms and match your driver
            license or state ID.) 
          </li>
          <li>
            <a href="https://www.irs.gov/taxtopics/tc157">
              If you recently moved, make sure your address is current on the
              IRS website.
            </a>
          </li>
        </ul>
      </div>
      <h4>
        For business owners, independent contractors, self-employed workers,
        freelancers, gig workers:
      </h4>
      <p>
        Complete your employment information under the{" "}
        <strong>Additional Information</strong> section. Submit your net annual
        income for last year under the <strong>Natural Disasters</strong>{" "}
        question.
      </p>
      <h4>If you were previously approved for UI</h4>
      <p>
        <strong>Restart your old claim,</strong> then begin certifying every two
        weeks. If your UI application was approved within the past 12 months,
        you don't submit a new application. If your claim is more than 12 months
        old, you may need to file a new claim.
      </p>
    </div>
  );
}

export default TabPaneContent2;
