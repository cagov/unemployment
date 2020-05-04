import BPOButton from "../BPOButton";
import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent2() {
  // const { t } = useTranslation();

  return (
    <div>
      <h3>1. Register with Benefit Programs Online</h3>
      <p>
        <strong>
          The fastest way to apply for all unemployment benefits is through UI
          Online. After you have registered for a Benefit Programs Online
          account, you can get started on UI Online.
        </strong>{" "}
        You can still apply for UI by{" "}
        <a href="https://edd.ca.gov/Unemployment/Filing_a_Claim.htm">
          phone, mail, or fax
        </a>
        .
      </p>
      <BPOButton />
      <h3 className="pt-4">2. Submit your application</h3>
      <h4>
        Filling out employment information for COVID-19 claims in UI Online
      </h4>
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
          you for the weeks you are eligible to receive benefits. PUA supports
          claims between February 2, 2020 and December 26, 2020. Claims between
          March 29 and July 25, 2020 are eligible for an additional, taxable
          $600 every week.
        </li>
      </ul>
      <div className="gray-box">
        <h4>Tips for applying on UI Online</h4>

        <p>These will help your claim get processed faster.</p>
        <ul>
          <li>Include all employment information.</li>
          <li>Check for spelling errors or mismatched employer names.</li>
          <li>
            Confirm your Social Security number and California Driver’s License
            or ID number. (Check that this information matches your tax forms.)
          </li>
        </ul>
        <div className="highlight-blockquote">
          <strong>Note:</strong> If you’re a business owner, independent
          contractor, self-employed worker, freelancer, or gig worker, you can
          complete your employment information under the{" "}
          <strong>Additional Information</strong> section. Submit your net
          annual income for last year under the{" "}
          <strong>Natural Disasters</strong> question.
        </div>
      </div>
      <h3>If you were previously approved for UI</h3>
      <p>
        <strong>Restart your old claim</strong>. If your UI application was
        approved within the past 12 months and you stopped receiving benefits,
        you don't need to submit a new application. If your claim is more than
        12 months old, you will need to file a new claim.
      </p>
    </div>
  );
}

export default TabPaneContent2;
