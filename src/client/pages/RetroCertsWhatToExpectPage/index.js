import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import React from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useTranslation, Trans } from "react-i18next";

function RetroCertsWhatToExpectPage(props) {
  const { t } = useTranslation();

  const userData = props.userData;
  const setUserData = props.setUserData;

  if (!userData.weeksToCertify) {
    const authToken = sessionStorage.getItem(AUTH_STRINGS.authToken);
    if (!authToken) {
      return <Redirect to="/retroactive-certification" push />;
    }

    fetch(AUTH_STRINGS.apiPath.data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        if (data.status !== AUTH_STRINGS.statusCode.ok) {
          sessionStorage.removeItem(AUTH_STRINGS.authToken);
        }
      })
      .catch((error) => console.error(error));

    return <div>Loading...</div>;
  }

  return (
    <div id="overflow-wrapper" className="what-to-expect">
      <Header />
      <main>
        <div className="container p-4">
          <h1>{t("retrocerts-what-to-expect.title")}</h1>
          <p className="green-highlight">
            <span className="white-checkmark">✔</span>
            <Trans
              t={t}
              i18nKey="retrocerts-what-to-expect.subheader"
              values={{ name: userData.lastName }}
            />
          </p>

          <h2>{t("retrocerts-what-to-expect.header1")}</h2>
          <p>{t("retrocerts-what-to-expect.p1a")}</p>
          <ul>
            <li>{t("retrocerts-what-to-expect.list-item1")}</li>
            <li>{t("retrocerts-what-to-expect.list-item2")}</li>
            <li>{t("retrocerts-what-to-expect.list-item3")}</li>
            <li>{t("retrocerts-what-to-expect.list-item4")}</li>
            <li>{t("retrocerts-what-to-expect.list-item5")}</li>
            <li>{t("retrocerts-what-to-expect.list-item6")}</li>
          </ul>
          <p>{t("retrocerts-what-to-expect.p1b")}</p>
          <h2>{t("retrocerts-what-to-expect.header2")}</h2>
          <p>{t("retrocerts-what-to-expect.p2")}</p>

          <Button
            variant="secondary"
            as={Link}
            to="/retroactive-certification/landing"
          >
            {t("retrocerts-what-to-expect.button-start-certification")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsWhatToExpectPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
};

export default RetroCertsWhatToExpectPage;
