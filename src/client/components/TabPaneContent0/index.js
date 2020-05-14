import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";

function TabPaneContent0() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="gray-box mt-0">
        <h3>
          <Trans t={t} i18nKey="tab0-header1" />
        </h3>
        <ul>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item1">
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
            <Trans t={t} i18nKey="tab0-list1-item2" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item3" />
            <ul>
              <li>
                <Trans t={t} i18nKey="tab0-list1a-item1" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0-list1a-item2" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0-list1a-item3" />
              </li>
            </ul>
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item4" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item5" />
            <ul>
              <li>
                <Trans t={t} i18nKey="tab0-list1b-item1" />
              </li>
              <li>
                <Trans t={t} i18nKey="tab0-list1b-item2" />
              </li>
            </ul>
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item6" />
          </li>
          <li className="mb-3">
            <Trans t={t} i18nKey="tab0-list1-item7" />
          </li>
        </ul>
      </div>
      <h3>
        <Trans t={t} i18nKey="tab0-header2" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0-p1" />
      </p>
      <h3>
        <Trans t={t} i18nKey="tab0-header3" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0-p2" />
      </p>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0-list2-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list2-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list2-item3" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list2-item4" />
        </li>
      </ul>
      <p>
        <Trans t={t} i18nKey="tab0-p3">
          {
            // The text in this <Trans> must *approximately* match translation.json
            // otherwise the link won't render.
          }
          If you're already receiving UI, review{" "}
          <Link to="/guide/receive-benefits">Receive your benefits</Link> to
          learn how your UI claim may be affected by COVID-19.
        </Trans>
      </p>
      <h3>
        <Trans t={t} i18nKey="tab0-header4" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0-p4" />
      </p>
      <h4>
        <Trans t={t} i18nKey="tab0-header5" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0-list3-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list3-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list3-item3" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list3-item4" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list3-item5" />
        </li>
      </ul>
      <h4>
        <Trans t={t} i18nKey="tab0-header6" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item2" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item3" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item4" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item5" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab0-list4-item6" />
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab0-header7" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab0-p5" />
      </p>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab0-list5-item1">
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
          <Trans t={t} i18nKey="tab0-list5-item2">
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

export default TabPaneContent0;
