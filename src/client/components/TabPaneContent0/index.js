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
      <div className="gray-box mt-0">
        <h3>Tips for applying on UI Online</h3>
        <ul>
          <li className="mb-3">
            Everyone (UI and PUA applicants) uses the same form.{" "}
            <a href="https://www.edd.ca.gov/Benefit_Programs_Online.htm">
              Register or log in with Benefit Programs Online
            </a>{" "}
            and click “File New Claim.”
          </li>
          <li className="mb-3">
            File a new claim if you have already applied for UI but are eligible
            for PUA because you are a business owner, independent contractor,
            self-employed worker, freelancer, or gig worker affected by
            COVID-19, <strong>and</strong> you have <strong>not</strong> already
            appealed a $0 award notice, been asked to verify your identity, or
            requested a wage investigation.
          </li>
          <li className="mb-3">
            If you are a small business owner, independent contractor,
            self-employed worker, freelancer, or gig worker, here’s how to
            answer key questions in the application form:
            <ul>
              <li>
                On the Employment History screen when you supply your last
                employer information, select "No".
              </li>
              <li>
                On the Availability Information page, answer question 7 with
                "No".
              </li>
              <li>
                On the Disaster Information page, answer question 1a.3 with “You
                are an independent contractor.” If you got paid in cash, select
                “None of these options apply to me.”
              </li>
            </ul>
          </li>
          <li className="mb-3">
            If you have run out of benefits, you are unemployed, and your
            benefit year has expired, reapply for benefits through UI Online.
          </li>
          <li className="mb-3">
            If you have run out of benefits but you are still within the one
            year that your claim is good for, and your benefits
            <ul>
              <li>
                Ran out <strong>before February 2</strong>, you are probably not
                eligible for PUA. (You would have to show that you are
                unemployed because of COVID-19.) You may be eligible for the
                federal 13-week extension. We will notify you about what to do.
              </li>
              <li>
                Were for weeks you spent unemployed{" "}
                <strong>between February 2 and March 21</strong>, we will send
                you a form to fill out to supply information not already in your
                claim. When you get the form, fill it out and return it.
              </li>
            </ul>
          </li>
          <li className="mb-3">
            If you received your last payment for weeks you were unemployed{" "}
            <strong>on or after March 21</strong> and are still within your
            benefit year, we will automatically extend your claim for 13 weeks.
            We will notify you that we have done that and when you can certify.
          </li>
          <li className="mb-3">
            If you applied for unemployment assistance but didn’t qualify (for
            example, because you voluntarily quit or you were fired or
            discharged by your employer), or you are serving a penalty because
            of false statements on a past claim, you could be eligible for PUA.
            We will send you a form to fill out to supply information not
            already in your account. When you get the form, fill it out and
            return it.
          </li>
        </ul>
      </div>
      <h2>Benefits you can apply for</h2>
      <p>
        These benefits are available for California residents. If you are still
        unsure of your eligibility or what to apply for,{" "}
        <strong>apply anyway</strong> as soon as you are out of work or had your
        hours reduced. Complete the application as best you can, and we will
        follow up with you as soon as possible.
      </p>
      <h3>Unemployment Insurance (UI)</h3>
      <p>
        You may be eligible for regular UI if you have income reported on a W2
        and you meet <strong>any</strong> of these:
      </p>
      <ul>
        <li>
          Your employment status has been affected by COVID-19 and you are fully
          or partially unemployed as a result.
        </li>
        <li>
          You are fully or partially unemployed. This includes layoffs,
          furloughs, reduced wages, or reduced hours. You can still receive
          unemployment benefits while working, depending on your pay.
        </li>
        <li>
          Your child’s school is closed, and you need to miss work to care for
          them.
        </li>
        <li>Your previous UI claim has expired.</li>
      </ul>
      <p>
        If you're already receiving UI, review <ReceiveYourBenefitsLink /> to
        learn how your UI claim may be affected by COVID-19.
      </p>
      <h3>Pandemic Unemployment Assistance (PUA)</h3>
      <p>
        If you are a business owner, independent contractor, self-employed
        worker, freelancer, or gig worker and only received a 1099 tax form last
        year, you are most likely eligible for PUA.
      </p>
      <h4>
        Apply for PUA if your work situation changed because of COVID-19, and
        you meet <strong>any</strong> of these:
      </h4>
      <ul>
        <li>
          You had a definite date to begin work, but the job is no longer
          available, or you could not reach the job as a direct result of
          COVID-19.
        </li>
        <li>
          You are unable to travel to your job as a direct result of COVID-19.
        </li>
        <li>You quit your job as a direct result of COVID-19.</li>
        <li>Your workplace is closed as a direct result of COVID-19.</li>
        <li>
          You are unemployed, partially employed, or unable to work because
          COVID-19 has forced you to stop working.
        </li>
      </ul>
      <h4>
        Apply for PUA if you have health issues because of COVID-19, and you
        meet any of these:
      </h4>
      <ul>
        <li>
          You have been diagnosed with COVID-19 or are experiencing symptoms and
          are seeking a medical diagnosis.
        </li>
        <li>A member of your household has been diagnosed with COVID-19.</li>
        <li>
          You are caring for a family member or a member of your household who
          has been diagnosed with COVID-19.
        </li>
        <li>
          You are caring for a dependent during the work day because their
          school or another care facility has closed due to COVID-19.
        </li>
        <li>
          Your healthcare provider has told you to self-quarantine because of
          COVID-19.
        </li>
        <li>
          You have become the main income provider due to a COVID-19 death in
          your household.
        </li>
      </ul>
      <h3>Disability Insurance (DI) or Paid Family Leave (PFL)</h3>
      <p>
        If you’re not eligible for UI, you may be eligible for Disability
        Insurance (DI) or Paid Family Leave (PFL). You usually qualify if you
        paid into the State Disability Insurance program (noted as “CASDI” on
        paystubs), via taxes.
      </p>
      <ul>
        <li>
          If you are unable to perform your normal work duties because you are
          sick or quarantined,{" "}
          <a href="https://edd.ca.gov/Disability/How_to_File_a_DI_Claim_in_SDI_Online.htm">
            apply for Disability Insurance.
          </a>
        </li>
        <li>
          If you are caring for a family member who is sick,{" "}
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
