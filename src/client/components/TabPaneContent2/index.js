import { Trans, useTranslation } from "react-i18next";
import BPOButton from "../BPOButton";
import React from "react";

function TabPaneContent2() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab2.header10" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab2.p10">
          {
            // The content of this <Trans> must match translation.json
            // otherwise the link won't render
          }
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
        </Trans>
      </p>
      <BPOButton />
      <h3 className="pt-4">
        <Trans t={t} i18nKey="tab2.header20" />
      </h3>
      <h4>
        <Trans t={t} i18nKey="tab2.header21" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab2.list1-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab2.list1-item2" />
        </li>
      </ul>
      <div className="gray-box">
        <h4>
          <Trans t={t} i18nKey="tab2.header22" />
        </h4>

        <p>
          <Trans t={t} i18nKey="tab2.p20" />
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="tab2.list2-item1" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab2.list2-item2" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab2.list2-item3" />
          </li>
        </ul>
        <div className="highlight-blockquote">
          <Trans t={t} i18nKey="tab2.blockquote10" />
        </div>
      </div>
      <h3>
        <Trans t={t} i18nKey="tab2.header30" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab2.p30" />
      </p>
    </div>
  );
}

export default TabPaneContent2;
