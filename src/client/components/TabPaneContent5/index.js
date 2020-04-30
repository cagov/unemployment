import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent5() {
  // const { t } = useTranslation();

  return (
    <div>
      <h3>Helpful links</h3>
      <p>
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/faqs.htm">
          Coronavirus (COVID-19) FAQs from EDD
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
        <strong>
          This expands who can apply for Unemployment Insurance, due to
          COVID-19.
        </strong>{" "}
        This includes business owners, independent contractors, self-employed
        workers, freelancers, gig workers and people with limited work history.
        It is also available to individuals who have exhausted their regular UI
        claims, are serving penalty weeks on their claim, or are subject to a
        disqualification. PUA supports claims between February 2 and December
        31, 2020.{" "}
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
        <strong>This provides an additional $600 per week</strong> to all
        recipients of Unemployment Insurance. It is retroactive for claims
        between March 29, 2020 and July 26, 2020. This taxable $600 benefit is
        issued separately every two weeks. You may receive it at the same time
        as your UI benefits, or in a separate debit card.
      </p>
      <h4>Pandemic Emergency Unemployment Compensation (PEUC)</h4>
      <p>
        <strong>This provides an additional 13 weeks of benefits</strong> for
        all people receiving UI between March 29, 2020 to December 26, 2020.
        California provides up to 26 weeks of UI benefits depending on the
        amount of your earnings during the four-quarter period on which your
        claim is based. The CARES act extends benefits to a total of 39 weeks.
        The EDD is still working to implement the PEUC program. Please continue
        to monitor the EDD website for instructions on next steps for the PEUC
        program.
      </p>
    </div>
  );
}

export default TabPaneContent5;
