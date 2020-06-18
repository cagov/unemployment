import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import {
  fromIndexToPathString,
  fromPathStringToIndex,
  toWeekString,
} from "../../../utils/retroCertsWeeks";
import mockedFormData from "../../../data/mockedFormData";
import routes from "../../../data/routes";
import AUTH_STRINGS from "../../../data/authStrings";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YesNoQuestion from "../../components/YesNoQuestion";
import DaysSickQuestion from "../../components/DaysSickQuestion";

function RetroCertsCertificationPage(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const { userData, setUserData, routeComputedMatch } = props;
  const numberOfWeeks = userData.weeksToCertify.length;
  const week = routeComputedMatch.params.week || "";
  const weekIndex = fromPathStringToIndex(week || "");
  const headingElement = useRef(null);
  const weekIndexRef = useRef(weekIndex);

  const weekForUser = userData.weeksToCertify.indexOf(weekIndex) + 1;
  if (!weekForUser) {
    // The week from the URL is not a week that the user has
    // to certify for. Send them back to the list of weeks page.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  // When the user transitions to a new week, return to the top
  // of the form.
  if (weekIndexRef.current !== weekIndex) {
    weekIndexRef.current = weekIndex;
    window.scroll({
      top: headingElement.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }

  const formDataArray = userData.formData || [];
  const formData = formDataArray[weekForUser - 1] || { weekIndex };

  const handleFormDataChange = (event) => {
    const { value, name } = event;
    formDataArray[weekForUser - 1] = {
      ...formData,
      [name]: value,
    };
    setUserData({
      ...userData,
      formData: [...formDataArray],
    });
  };

  function handleSubmit() {
    fetch(AUTH_STRINGS.apiPath.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: mockedFormData,
        authToken: sessionStorage.getItem(AUTH_STRINGS.authToken),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          ...userData,
          confirmationNumber: data.confirmationNumber,
        });

        history.push(routes.retroCertsConfirmation);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1 ref={headingElement}>{t("retrocerts-certification.title")}</h1>
          {numberOfWeeks > 1 && (
            <p>
              <Trans
                t={t}
                i18nKey="retrocerts-certification.p1-multiple"
                values={{ weekForUser, numberOfWeeks }}
              />
            </p>
          )}
          <h3>
            <Trans
              t={t}
              i18nKey="retrocerts-certification.form-header"
              values={{ weekForUser, weekString: toWeekString(weekIndex) }}
            />
          </h3>
          <Row>
            <Col>
              <YesNoQuestion
                key={weekIndex + "tooSick"}
                questionNumber={1}
                questionText={t("retrocerts-certification.q-tooSick")}
                helpText={t("retrocerts-certification.qhelp-tooSick")}
                ifYes={formData.tooSick}
                onChange={(e) => handleFormDataChange(e)}
                inputName="tooSick"
              >
                <DaysSickQuestion
                  numDays={formData.tooSickNumberOfDays}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </YesNoQuestion>
            </Col>
          </Row>
          {[
            "fullTime",
            "didYouLook",
            "refuseWork",
            "schoolOrTraining",
            "workOrEarn",
          ].map((name, index) => (
            <Row key={weekIndex + name}>
              <Col>
                <YesNoQuestion
                  questionNumber={index + 2}
                  questionText={t(`retrocerts-certification.q-${name}`)}
                  helpText={t(`retrocerts-certification.qhelp-${name}`)}
                  ifYes={formData[name]}
                  onChange={(e) => handleFormDataChange(e)}
                  inputName={name}
                />
              </Col>
            </Row>
          ))}
          <Row>
            <Col>
              <Button
                variant="outline-secondary"
                className="text-dark bg-light"
                as={Link}
                to={
                  weekForUser === 1
                    ? routes.retroCertsWeeksToCertify
                    : routes.retroCertsCertify +
                      "/" +
                      fromIndexToPathString(
                        userData.weeksToCertify[weekForUser - 2]
                      )
                }
              >
                {t("retrocerts-certification.button-back")}
              </Button>
            </Col>
            <Col style={{ textAlign: "end" }}>
              {weekForUser === numberOfWeeks && (
                <Button variant="secondary" onClick={handleSubmit}>
                  {t("retrocerts-certification.button-submit")}
                </Button>
              )}
              {weekForUser !== numberOfWeeks && (
                <Button
                  variant="secondary"
                  as={Link}
                  type="submit"
                  to={
                    routes.retroCertsCertify +
                    "/" +
                    fromIndexToPathString(userData.weeksToCertify[weekForUser])
                  }
                >
                  <Trans
                    t={t}
                    i18nKey="retrocerts-certification.button-next"
                    values={{ nextWeekForUser: weekForUser + 1 }}
                  />
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsCertificationPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
  routeComputedMatch: PropTypes.object.isRequired,
};

export default RetroCertsCertificationPage;
