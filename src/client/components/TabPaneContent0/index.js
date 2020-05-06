import { Trans, useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import React from "react";

function TabPaneContent0({ getTabLink }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="gray-box mt-0">
        <h3>
          <Trans t={t} i18nKey="tab0.header10" />
        </h3>
        <ul>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item10">
              {
                // The text in this <Trans> must *approximately* match translation.json
                // otherwise the link won't render.
              }
              Everyone (UI and PUA applicants) uses the same form.{" "}
              <a href="https://www.edd.ca.gov/Benefit_Programs_Online.htm">
                Register or log in with Benefit Programs Online
              </a>{" "}
              and click “File New Claim.”
            </Trans>
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item20" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item30" />
            <ul>
              <li>
                <Trans t={t} i18nKey="tab0.list11-item10" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0.list11-item20" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0.list11-item30" />
              </li>
            </ul>
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item40" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item50" />
            <ul>
              <li>
                <Trans t={t} i18nKey="tab0.list12-item10" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0.list12-item20" />
              </li>
            </ul>
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item60" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0.list10-item70" />
          </li>
        </ul>
      </div>
      <h3>
        <Trans t={t} i18nKey="tab0.header20" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0.p10" />
      </p>
      <h3>
        <Trans t={t} i18nKey="tab0.header30" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0.p20" />
      </p>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0.list20-item10" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list20-item20" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list20-item30" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list20-item40" />
        </li>
      </ul>
      <p>
        <Trans t={t} i18nKey="tab0.p30">
          {
            // The text in this <Trans> must *approximately* match translation.json
            // otherwise the link won't render.
          }
          If you're already receiving UI, review {getTabLink(4)} to learn how
          your UI claim may be affected by COVID-19.
        </Trans>
      </p>
      <h3>
        <Trans t={t} i18nKey="tab0.header40" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0.p40" />
      </p>
      <h4>
        <Trans t={t} i18nKey="tab0.header50" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0.list30-item10" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list30-item20" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list30-item30" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list30-item40" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list30-item50" />
        </li>
      </ul>
      <h4>
        <Trans t={t} i18nKey="tab0.header60" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item10" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item20" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item30" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item40" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item50" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list40-item60" />
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab0.header70" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0.p50" />
      </p>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0.list50-item10">
            {
              // The text in this <Trans> must *approximately* match translation.json
              // otherwise the link won't render.
            }
            If you are unable to perform your normal work duties because you are
            sick or quarantined, apply for{" "}
            <a href="https://edd.ca.gov/Disability/How_to_File_a_DI_Claim_in_SDI_Online.htm">
              Disability Insurance.
            </a>
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab0.list50-item20">
            {
              // The text in this <Trans> must *approximately* match translation.json
              // otherwise the link won't render.
            }
            If you are caring for a family member who is sick, apply for{" "}
            <a href="https://edd.ca.gov/Disability/How_to_File_a_PFL_Claim_in_SDI_Online.htm">
              Paid Family Leave.
            </a>
          </Trans>
        </li>
      </ul>
    </div>
  );
}

TabPaneContent0.propTypes = {
  getTabLink: PropTypes.func,
};

export default TabPaneContent0;
