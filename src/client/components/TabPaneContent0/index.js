import PropTypes from "prop-types";
import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent0({ loadTab, tabSlugs, getTabTitle }) {
  // const { t } = useTranslation();

  function ReceiveYourBenefitsLink() {
    return (
      <a
        href={"#" + tabSlugs[4]}
        onClick={() => {
          loadTab(4);
        }}
      >
        {getTabTitle(4)}
      </a>
    );
  }

  return (
    <div>
      <p>
        These benefits are available for all California residents. If you are
        still unsure of your eligibility or what to apply for,{" "}
        <strong>apply anyway</strong>, and as soon as you are out of work.
        Complete the application as best you can, and we will follow up with you
        as soon as possible.
      </p>
      <h4>Unemployment Insurance (UI)</h4>
      <p>
        Apply for UI if you are a full-time worker at your company and{" "}
        <strong>only</strong> received a W-2 tax form last year, or you received{" "}
        <strong>both</strong> W-2 and 1099 tax forms last year.
      </p>
      <p>
        You may be eligible for regular Unemployment Insurance (UI) if you meet{" "}
        <strong>any</strong> of the following criteria:
      </p>
      <ul>
        <li>Your employment status has been affected by COVID-19.</li>
        <li>
          Or, you are fully or partially unemployed. This includes layoffs,
          furloughs, reduced wages, or reduced hours. You can still receive
          unemployment benefits while working, depending on your pay.
        </li>
        <li>
          Or, your child’s school is closed, and you need to miss work to care
          for them.
        </li>
        <li>Or, your previous UI claim has expired.</li>
      </ul>
      <p>
        If you're already receiving UI, review <ReceiveYourBenefitsLink /> to
        learn how your UI claim is affected by COVID-19.
      </p>
      <p>
        <a href="https://www.edd.ca.gov/Benefit_Programs_Online.htm">
          Apply for unemployment insurance on UI Online.
        </a>
      </p>
      <h4>Pandemic Unemployment Assistance (PUA)</h4>
      <p>
        You may be eligible to receive PUA benefits if you don’t qualify for any
        of the above benefits (regular UI, DI, or PFML).
      </p>
      <p>
        Apply for PUA if you are a business owner, independent contractor,
        self-employed worker, freelancer, or gig worker and{" "}
        <strong>only</strong> received a 1099 tax form last year.
      </p>
      <p>
        To be eligible for PUA, you must meet <strong>any</strong> of the
        following criteria:
      </p>
      <h5>Criteria related to health issues due to COVID-19</h5>
      <ul>
        <li>
          You have been diagnosed with COVID-19 or are experiencing symptoms and
          are seeking a medical diagnosis
        </li>
        <li>
          Or, a member of your household has been diagnosed with COVID-19.
        </li>
        <li>
          Or, you are caring for a family member or a member of your household
          who has been diagnosed with COVID-19
        </li>
        <li>
          Or, you are caring for a dependent because their school or another
          care facility has closed due of COVID-19 and you are now caring for
          them during the work day
        </li>
        <li>
          Or, your healthcare provider has told you to self-quarantine because
          of COVID-19
        </li>
        <li>
          Or, you have become the main income provider due to a COVID-19 death
          in your household
        </li>
      </ul>
      <h5>Criteria related to changes in employment status due to COVID-19</h5>
      <ul>
        <li>
          You had a definite date to begin work, but the job is no longer
          available, or you could not reach the job as a direct result of
          COVID-19
        </li>
        <li>
          Or, you are unable to travel to your job as a direct result of
          COVID-19
        </li>
        <li>Or, you quit your job as a direct result of COVID-19</li>
        <li>Or, your workplace is closed as a direct result of COVID-19</li>
        <li>
          Or, you work as an independent contractor (with reportable income,
          such as a 1099) and you are unemployed, partially employed, or unable
          to work because COVID-19 has forced you to stop working
        </li>
        <li>
          Or, your local government has enforced a stay at home order and you
          cannot work from home
        </li>
      </ul>
      <p>
        <a href="https://www.edd.ca.gov/Benefit_Programs_Online.htm">
          Apply for unemployment insurance on UI Online.
        </a>
      </p>
      <h4>Disability Insurance (DI) or Paid Family Leave (PFL)</h4>
      <p>
        If you’re not eligible for UI, you may be eligible for Disability
        Insurance (DI) or Paid Family Leave (PFL). You usually qualify if you
        have a W-2 tax form.
      </p>
      <ul>
        <li>
          If you are unable to perform your normal work duties because you are
          sick or quarantined,{" "}
          <a href="https://edd.ca.gov/Disability/DI_Claim_Process.htm">
            apply for Disability Insurance.
          </a>
        </li>
        <li>
          If you are caring for someone who is sick,{" "}
          <a href="https://edd.ca.gov/Disability/How_to_File_a_PFL_Claim_in_SDI_Online.htm">
            apply for Paid Family Leave.
          </a>
        </li>
      </ul>
    </div>
  );
}

TabPaneContent0.propTypes = {
  loadTab: PropTypes.func,
  tabSlugs: PropTypes.arrayOf(PropTypes.string),
  getTabTitle: PropTypes.func,
};

export default TabPaneContent0;
