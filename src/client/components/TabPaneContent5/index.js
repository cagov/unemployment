import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent5() {
  // const { t } = useTranslation();

  return (
    <div>
      <h3>Helpful links</h3>
      <p>
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/faqs.htm">
          Coronavirus (COVID-19) FAQs
        </a>
      </p>
      <p>
        More details about what you need to do after you file your claim:{" "}
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/unemployment-claims.htm">
          COVID-19 Unemployment Insurance Claims
        </a>
      </p>
      <h3>New unemployment programs from the CARES Act</h3>
      <p>
        These programs expand Unemployment Insurance (UI) benefits by increasing
        the number of people who are eligible, increasing benefit amounts, and
        extending the length of the program.
      </p>
      <h4>Pandemic Unemployment Assistance (PUA)</h4>
      <p>
        <strong>This expands who can apply for UI, due to COVID-19.</strong>{" "}
        This includes business owners, independent contractors, self-employed
        workers, freelancers, gig workers and people with limited work history.
        It is also available to people who have exhausted their regular UI
        claims, are serving penalty weeks on their claim, or whose claim may be
        disqualified. PUA supports claims between February 2 and December, 2020.{" "}
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/pandemic-unemployment-assistance.htm">
          Read more about PUA
        </a>
        .
      </p>
      <h4>
        Federal Pandemic Unemployment Compensation (FPUC) or Pandemic Additional
        Compensation (PAC)
      </h4>
      <p>
        <strong>This provides an additional $600 per week</strong> to people
        receiving UI benefits. It is retroactive for claims between March 29 and
        July 25, 2020. This $600 benefit is issued every two weeks. You will
        receive it at the same time as your UI or PUA benefits.
      </p>
      <h4>Pandemic Emergency Unemployment Compensation (PEUC)</h4>
      <p>
        <strong>This provides an additional 13 weeks of benefits</strong> for
        people receiving UI benefits between March 29 and December 26, 2020.
        California provides up to 26 weeks of UI benefits depending on the
        amount of your earnings during the four-quarter period on which your
        claim is based. The CARES Act extends benefits to a total of 39 weeks.
      </p>
      <div className="highlight-blockquote">
        <strong>Note:</strong> We are still working to implement the PEUC
        program. Please continue to monitor our website for instructions on next
        steps for the PEUC program.
      </div>
    </div>
  );
}

export default TabPaneContent5;
