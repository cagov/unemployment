import { Trans, useTranslation } from "react-i18next";
import BPOButton from "../BPOButton";
import React from "react";

function TabPaneContent2() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab2-header1" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab2-p1">
          {
            // The text in this <Trans> must *approximately* match translation.json
            // otherwise the link won't render.
          }
          <strong>
            The fastest way to apply for all unemployment benefits is through UI
            Online. After you have registered for a Benefit Programs Online
            account, you can get started on UI Online.
          </strong>{" "}
          You can still apply for UI by{" "}
          <a href={t("links.edd-filing-claim")}>phone, mail, or fax</a>.
        </Trans>
      </p>
      <BPOButton />
      <h3 className="pt-4">
        <Trans t={t} i18nKey="tab2-header2" />
      </h3>
      <h4>
        <Trans t={t} i18nKey="tab2-header2a" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab2-list1-item1" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab2-list1-item2" />
        </li>
      </ul>
      <div className="gray-box">
        <h4>
          <Trans t={t} i18nKey="tab2-header2b" />
        </h4>

        <p>
          <Trans t={t} i18nKey="tab2-p2" />
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="tab2-list2-item1" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab2-list2-item2" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab2-list2-item3" />
          </li>
        </ul>
        <div className="highlight-blockquote">
          <Trans t={t} i18nKey="tab2-blockquote1" />
        </div>
      </div>
      <h3>
        <Trans t={t} i18nKey="tab2-header3" />
      </h3>
      <p>
        <Trans t={t} i18nKey="tab2-p3" />
      </p>
    </div>
  );
}

export default TabPaneContent2;
