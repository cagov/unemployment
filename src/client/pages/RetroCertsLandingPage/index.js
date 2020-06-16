import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import React from "react";
import { userDataPropType } from "../../commonPropTypes";
import { useTranslation } from "react-i18next";
import { fromIndexToPathString } from "../../../utils/retroCertsWeeks";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YesNoQuestion from "../../components/YesNoQuestion";

function RetroCertsLandingPage(props) {
  const userData = props.userData;

  const { t } = useTranslation();

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>Hello</h1>
          <p>Weeks to certify: {userData.weeksToCertify.join(", ")}</p>
          <Row>
            <div className="col-md-4">
              <Button
                variant="outline-secondary"
                className="text-dark bg-light"
                href="/retroactive-certification/what-to-expect"
              >
                {t("retrocerts-weeks.button-back")}
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                variant="secondary"
                href={
                  "/retroactive-certification/certify/" +
                  fromIndexToPathString(userData.weeksToCertify[0])
                }
              >
                {t("retrocerts-weeks.button-certify-week-1")}
              </Button>
            </div>
          </Row>

          {[1, 2, 3].map((index) => (
            <YesNoQuestion
              key={index}
              questionNumber={index}
              questionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque."
              helpText="Aliquam fermentum, tortor in pulvinar."
              inputName={`YesNo${index}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsLandingPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsLandingPage;
