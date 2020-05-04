import PropTypes from "prop-types";
import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent0({ getTabLink }) {
  // const { t } = useTranslation();

  return (
    <div>
      <div className="gray-box mt-0">
        <h3>Tips for applying on UI Online</h3>
        <ul>
          <li>
            Everyone (UI and PUA applicants) uses the same form.{" "}
            <a href="https://www.edd.ca.gov/Benefit_Programs_Online.htm">
              Register or log in with Benefit Programs Online
            </a>{" "}
            and click “File New Claim.”
          </li>
          <li>
            File a new claim if you have already applied for UI but are eligible
            for PUA because you are a business owner, independent contractor,
            self-employed worker, freelancer, or gig worker affected by
            COVID-19, <strong>and</strong> you have <strong>not</strong> already
            appealed a $0 award notice, been asked to verify your identity, or
            requested a wage investigation.
          </li>
          <li>
            If you are a small business owner, independent contractor,
            self-employed worker, freelancer, or gig worker, here’s how to
            answer key questions in the application form:
            <ul>
              <li>
                on the Employment History screen when you supply your last
                employer information, select <strong>No</strong>.
              </li>
              <li>
                on the Availability Information page, answer question 7 with{" "}
                <strong>No</strong>.
              </li>
              <li>
                on the Disaster Information page, answer question 1a.3 with “You
                are an independent contractor.” If you got paid in cash, select
                “None of these options apply to me.”
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <h2>Benefits you can apply for</h2>
      <p>
        These benefits are available for all California residents. If you are
        still unsure of your eligibility or what to apply for,{" "}
        <strong>apply anyway</strong>, and as soon as you are out of work.
        Complete the application as best you can, and we will follow up with you
        as soon as possible.
      </p>
      <h3>Unemployment Insurance (UI)</h3>
      <p>
        If you are a full-time worker at your company and only received a W-2
        tax form last year, or you received both W-2 and 1099 tax forms last
        year, you are most likely eligible for UI.
      </p>
      <p>
        You may be eligible for regular Unemployment Insurance (UI) if you meet{" "}
        <strong>any</strong> of the following criteria:
      </p>
      <ul>
        <li>Your employment status has been affected by COVID-19.</li>
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
        If you're already receiving UI, review {getTabLink(4)} to learn how your
        UI claim is affected by COVID-19.
      </p>
      <h3>Pandemic Unemployment Assistance (PUA)</h3>
      <p>
        If you are a business owner, independent contractor, self-employed
        worker, freelancer, or gig worker and only received a 1099 tax form last
        year, you are most likely eligible for PUA. You can apply for benefits
        starting April 28.
      </p>
      <p>
        To be eligible for PUA, you must meet <strong>any</strong> of the
        following criteria:
      </p>
      <h4>
        Any criteria related to changes in employment status due to COVID-19
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
          You are self-employed or work as an independent contractor (with
          reportable income, such as a 1099) and you are unemployed, partially
          employed, or unable to work because COVID-19 has forced you to stop
          working.
        </li>
      </ul>
      <h4>Any criteria related to health issues due to COVID-19</h4>
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
          You are caring for a dependent because their school or another care
          facility has closed due to COVID-19 and you are now caring for them
          during the work day.
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
        have a W-2 tax form, because taxes have been taken out automatically to
        pay for these programs.
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
  getTabLink: PropTypes.func,
};

export default TabPaneContent0;
