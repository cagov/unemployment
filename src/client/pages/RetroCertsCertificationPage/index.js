import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Redirect, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import {
  fromIndexToPathString,
  fromPathStringToIndex,
  toWeekString,
} from "../../../utils/retroCertsWeeks";
import routes from "../../../data/routes";
import AUTH_STRINGS from "../../../data/authStrings";
import programPlan from "../../../data/programPlan";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YesNoQuestion from "../../components/YesNoQuestion";
import DaysSickQuestion from "../../components/DaysSickQuestion";
import EmployersQuestions from "../../components/EmployersQuestions";
import DisasterQuestion from "../../components/DisasterQuestion";
import PerjuryCheckbox from "../../components/PerjuryCheckbox";

function RetroCertsCertificationPage(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [validated, setValidated] = useState(false);

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

  const formDataArray = userData.formData || [];
  const formData = formDataArray[weekForUser - 1] || { weekIndex };

  // If we're missing data from a previous week (e.g., the user pressed
  // reload), go back to the first week since we lost their previous
  // answers.
  if (weekForUser > 1 && formDataArray.length < weekForUser - 1) {
    return (
      <Redirect
        to={
          routes.retroCertsCertify +
          "/" +
          fromIndexToPathString(userData.weeksToCertify[0])
        }
      />
    );
  }

  // When the user transitions to a new week, return to the top
  // of the form and reset the form.
  if (weekIndexRef.current !== weekIndex) {
    weekIndexRef.current = weekIndex;

    setValidated(false);
    if (headingElement.current) {
      window.scroll({
        top: headingElement.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  // Most (99.99%) users have the same programPlan for all weeks in
  // weeksToCertify, in which case their programPlan is a one element array.
  // The rest have an array whose length matches the weeksToCertify length.
  const programPlanIndex =
    userData.programPlan.length === 1 ? 0 : weekForUser - 1;
  const weekProgramPlan = userData.programPlan[programPlanIndex];

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

  const handleEmployersChange = (employersArray) => {
    formDataArray[weekForUser - 1] = {
      ...formData,
      employers: employersArray,
    };
    setUserData({
      ...userData,
      formData: [...formDataArray],
    });
  };

  function questionText(transKey) {
    if (weekProgramPlan === programPlan.uiPartTime) {
      return "retrocerts-certification.questions.ui-part-time." + transKey;
    }
    if (weekProgramPlan === programPlan.uiFullTime) {
      return "retrocerts-certification.questions.ui-full-time." + transKey;
    }
    if (weekProgramPlan === programPlan.puaFullTime) {
      return "retrocerts-certification.questions.pua-full-time." + transKey;
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (!isValid) return;

    if (weekForUser !== numberOfWeeks) {
      history.push(
        routes.retroCertsCertify +
          "/" +
          fromIndexToPathString(userData.weeksToCertify[weekForUser])
      );
    } else if (weekForUser === numberOfWeeks) {
      postUserDataToServer();
    }
  };

  function postUserDataToServer() {
    fetch(AUTH_STRINGS.apiPath.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: userData.formData,
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
      .catch((error) => {
        console.error(error);
        setUserData({
          ...userData,
          saveError: true,
        });
      });
  }

  const questionsTwoThroughFive =
    weekProgramPlan === programPlan.puaFullTime
      ? ["couldNotAcceptWork", "didYouLook", "refuseWork", "otherBenefits"]
      : ["couldNotAcceptWork", "didYouLook", "refuseWork", "schoolOrTraining"];

  return (
    <div id="overflow-wrapper">
      <Header />
      <main className="pb-5">
        <div className="container p-4">
          <h1 ref={headingElement}>
            {t("retrocerts-certification.question-page-title")}
          </h1>
          <h2 className="h3 font-weight-bold mt-5">
            <Trans
              t={t}
              i18nKey="retrocerts-certification.form-header"
              values={{ weekForUser, weekString: toWeekString(weekIndex) }}
            />
          </h2>
          {numberOfWeeks > 1 && (
            <p>
              <Trans
                t={t}
                i18nKey="retrocerts-certification.p1-multiple"
                values={{ weekForUser, numberOfWeeks }}
              />
            </p>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <YesNoQuestion
              key={weekIndex + "tooSick"}
              questionNumber={1}
              questionText={t(questionText("tooSick"))}
              helpText={<Trans t={t} i18nKey={questionText("help-tooSick")} />}
              ifYes={formData.tooSick}
              onChange={(e) => handleFormDataChange(e)}
              inputName="tooSick"
            >
              <DaysSickQuestion
                numDays={formData.tooSickNumberOfDays}
                onChange={(e) => handleFormDataChange(e)}
                questionText={t(questionText("tooSickNumberOfDays"))}
                helpText={t(questionText("help-tooSickNumberOfDays"))}
              />
            </YesNoQuestion>
            {questionsTwoThroughFive.map((name, index) => (
              <YesNoQuestion
                key={weekIndex + name}
                questionNumber={index + 2}
                questionText={
                  <Trans
                    t={t}
                    i18nKey={questionText(name)}
                    values={{ weekString: toWeekString(weekIndex) }}
                  />
                }
                helpText={
                  <Trans t={t} i18nKey={questionText(`help-${name}`)} />
                }
                ifYes={formData[name]}
                onChange={(e) => handleFormDataChange(e)}
                inputName={name}
              />
            ))}
            <YesNoQuestion
              key={weekIndex + "workOrEarn"}
              questionNumber={6}
              questionText={
                <Trans t={t} i18nKey={questionText("workOrEarn")} />
              }
              helpText={t(questionText("help-workOrEarn"))}
              ifYes={formData.workOrEarn}
              onChange={(e) => handleFormDataChange(e)}
              inputName="workOrEarn"
            >
              <EmployersQuestions
                employers={formData.employers}
                onChange={(employers) => handleEmployersChange(employers)}
              />
            </YesNoQuestion>
            {weekProgramPlan === programPlan.puaFullTime && (
              <YesNoQuestion
                key={weekIndex + "recentDisaster"}
                questionNumber={7}
                questionText={t(questionText("recentDisaster"))}
                helpText=""
                ifYes={formData.recentDisaster}
                onChange={(e) => handleFormDataChange(e)}
                inputName="recentDisaster"
              >
                <DisasterQuestion
                  questionText={t(questionText("recentDisasterChoice"))}
                  choice={formData.disasterChoice}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </YesNoQuestion>
            )}
            {weekForUser === numberOfWeeks && <PerjuryCheckbox />}
            {userData.saveError && (
              <Alert variant="danger">
                {t("retrocerts-certification.save-error")}
              </Alert>
            )}
            <Form.Row>
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
                  {weekForUser === 1
                    ? t("retrocerts-certification.button-back")
                    : t("retrocerts-certification.button-back-week")}
                </Button>
              </Col>
              <Col style={{ textAlign: "end" }}>
                <Button variant="secondary" type="submit">
                  {weekForUser === numberOfWeeks &&
                    t("retrocerts-certification.button-submit")}
                  {weekForUser !== numberOfWeeks && (
                    <Trans
                      t={t}
                      i18nKey="retrocerts-certification.button-next"
                      values={{ nextWeekForUser: weekForUser + 1 }}
                    />
                  )}
                </Button>
              </Col>
            </Form.Row>
          </Form>
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
