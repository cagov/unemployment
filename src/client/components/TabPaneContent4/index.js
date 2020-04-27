import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent4() {
  // const { t } = useTranslation();

  return (
    <div>
      <h4>1. We will issue you an EDD Debit Card&#x2120;</h4>

      <p>
        Benefit payments for Unemployment Insurance, Pandemic Unemployment
        Assistance (PUA), Disability Insurance, and Paid Family Leave are all
        made using the EDD Visa Debit Card.
      </p>

      <p>
        Typically, it will take about a week after you certify before you
        receive your first benefit payment. If you applied for PUA, your EDD
        Debit Card will be issued within 24-48 hours after you submit your
        application.
      </p>

      <p>
        Due to the high volume of claims, it may take a few extra days to
        receive your EDD Debit Card in the mail.
      </p>

      <p>
        To set up direct deposit, visit the{" "}
        <a href="https://prepaid.bankofamerica.com/EddCard">
          Bank of America EDD Debit Card website
        </a>
        .
      </p>

      <p>
        For more information on the EDD Debit Card, visit{" "}
        <a href="https://www.edd.ca.gov/about_edd/The_EDD_Debit_Card.htm">
          EDD Debit Card
        </a>
        .
      </p>

      <h5>About your EDD Debit Card</h5>
      <ul>
        <li>
          <strong>
            If you were issued an EDD Debit Card in the last three years
          </strong>
          , you will receive your benefit payments on that card. If your card
          has expired, a new card will automatically be sent to you once funds
          are available.
        </li>
        <li>
          <strong>If you lost your EDD Debit Card</strong>, contact Bank of
          America at 1-866-692-9374 (TTY: 1-866-692-9374). It may be difficult
          to reach a representative by phone due to high call volumes. We
          appreciate your patience.
        </li>
        <li>
          <strong>Download the Bank of America Prepaid Card app</strong> from
          any app store to keep track of your EDD Debit Card payments and
          balance information.
        </li>
        <li>
          <strong>Note</strong>: Bank of America representatives cannot answer
          questions about your claim or pending payments.{" "}
        </li>
      </ul>
      <h4>2. Certify your claim every two weeks</h4>

      <div className="highlight-blockquote">
        <strong>Note:</strong> Certification is <strong>not required</strong>{" "}
        from March 14 through May 9, 2020.
      </div>

      <p>
        To continue receiving benefit payments, you’ll need to certify your
        unemployment status every two weeks via UI Online for the fastest and
        most secure way to obtain benefits.
      </p>

      <div className="gray-box">
        <h5>What is certification?</h5>
        <p>
          Certification is the required process of updating the EDD every two
          weeks with your unemployment status with basic eligibility
          information:
        </p>
        <ul>
          <li>Are you physically able to work?</li>
          <li>Are you available for work?</li>
          <li>Are you ready and willing to accept work immediately?</li>
          <li>Did you refuse work?</li>
          <li>Did you work and earn wages?</li>
        </ul>
        <p>
          The fastest way to certify is on{" "}
          <a href="https://portal.edd.ca.gov/WebApp/Login?resource_url=https%3A%2F%2Fportal.edd.ca.gov%2FWebApp%2FHome">
            UI Online
          </a>
          . You can also do this by phone by calling 1-866-333-4606, or by
          mailing the paper form.
        </p>
        <div className="highlight-blockquote">
          <strong>Note:</strong> Certification is <strong>not required</strong>{" "}
          from March 14 through May 9, 2020.
        </div>
      </div>

      <h5>
        All claims from March 30 to July 31, 2020 will include an additional
        $600 every week
      </h5>
      <p>
        TThe EDD will automatically add $600 every week certified to eligible
        claimants from March 30 to July 26, 2020. These funds are part of the
        Federal Pandemic Unemployment Assistance (FPUC) program, also referred
        to as Pandemic Additional Compensation (PAC).
      </p>
      <h5>UI benefit payments have been extended for COVID-19 claims</h5>
      <p>
        The EDD provides up to 26 weeks of UI benefits to eligible claimants.
        Once the EDD has implemented a new federal extended benefit program, you
        may be eligible to extend your benefits an additional 13 weeks, to a
        total of 39 weeks. These funds are part of the Pandemic Emergency
        Unemployment Compensation (PEUC) program.
      </p>

      <p>
        The EDD is still working to implement this program which will take
        effect retroactively to March 29, 2020. In the interim, individuals who
        have exhausted their benefits on their regular UI claim may be eligible
        to receive benefits on a PUA claim.
      </p>
    </div>
  );
}

export default TabPaneContent4;
