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
import getWeekProgramPlan from "../../../utils/getWeekProgramPlan";
import getRetroCertQuestionKey from "../../../utils/getRetroCertQuestionKey";

import { logEvent } from "../../utils";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import YesNoQuestion from "../../components/YesNoQuestion";
import DaysSickQuestion from "../../components/DaysSickQuestion";
import EmployersQuestions from "../../components/EmployersQuestions";
import DisasterQuestion from "../../components/DisasterQuestion";
import PerjuryCheckbox from "../../components/PerjuryCheckbox";
import { autoScroll, TOP, BEHAVIOR } from "../../../utils/autoScroll";

function RetroCertsCertificationPage(props) {
  const { t } = useTranslation();
  document.title = t("retrocerts-certification.question-page-title");
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [showGenericValidationError, setShowGenericValidationError] = useState(
    false
  );

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

  // When the user transitions to a new week, reset the form.
  if (weekIndexRef.current !== weekIndex) {
    weekIndexRef.current = weekIndex;

    setValidated(false);
  }

  const weekProgramPlan = getWeekProgramPlan(userData.programPlan, weekForUser);

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

  function getQuestionKey(transKey) {
    return getRetroCertQuestionKey(transKey, weekProgramPlan);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isValid = form.checkValidity();

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    setShowGenericValidationError(!isValid);

    if (!isValid) {
      autoScroll({
        y: TOP.y,
        x: TOP.x,
        behavior: BEHAVIOR.smooth,
      });
      return;
    }

    const nextPage =
      weekForUser !== numberOfWeeks
        ? `${routes.retroCertsCertify}/${fromIndexToPathString(
            userData.weeksToCertify[weekForUser]
          )}`
        : routes.retroCertsConfirmation;
    postUserDataToServer(nextPage);
  };

  function postUserDataToServer(nextPage) {
    let body = JSON.stringify({
      formData: userData.formData,
      authToken: sessionStorage.getItem(AUTH_STRINGS.authToken),
      completed: weekForUser === numberOfWeeks,
    });
    // The server rejects < followed by non-whitespace,
    // so change the input from the form to add a space.
    body = body.replace(/</g, "< ");

    fetch(AUTH_STRINGS.apiPath.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.confirmationNumber) {
          logEvent(
            "RetroCerts",
            "CompletedCertification",
            `weeks-${numberOfWeeks}`
          );
        } else {
          logEvent(
            "RetroCerts",
            "PartialSave",
            `week-${weekForUser}-of-${numberOfWeeks}`
          );
        }
        setUserData({
          ...userData,
          confirmationNumber: data.confirmationNumber,
        });
        history.push(nextPage);
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

  const genericValidationError = (
    <div className="row col-md-12">
      <Alert variant="danger">{t("generic-validation-error-message")}</Alert>
    </div>
  );
  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page" className="questions">
        <div className="container p-4">
          <h1 ref={headingElement}>
            {t("retrocerts-certification.question-page-title")}
          </h1>
          <LanguageSelector className="mt-3 mb-4" />
          {history.location.state && history.location.state.returningUser && (
            <Alert variant="success">
              {t("retrocerts-certification.alert-found-save")}
            </Alert>
          )}
          {showGenericValidationError && validated && genericValidationError}
          <h2 className="h3 font-weight-bold mt-4">
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
              {weekForUser > 1 &&
                " " + t("retrocerts-certification.previous-saved")}
            </p>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <YesNoQuestion
              key={weekIndex + "tooSick"}
              questionNumber={1}
              questionText={t(getQuestionKey("tooSick"))}
              helpText={
                <Trans t={t} i18nKey={getQuestionKey("help-tooSick")} />
              }
              ifYes={formData.tooSick}
              onChange={(e) => handleFormDataChange(e)}
              inputName="tooSick"
            >
              <DaysSickQuestion
                numDays={formData.tooSickNumberOfDays}
                onChange={(e) => handleFormDataChange(e)}
                questionText={t(getQuestionKey("tooSickNumberOfDays"))}
                helpText={t(getQuestionKey("help-tooSickNumberOfDays"))}
              />
            </YesNoQuestion>
            {questionsTwoThroughFive.map((name, index) => (
              <YesNoQuestion
                key={weekIndex + name}
                questionNumber={index + 2}
                questionText={
                  <Trans
                    t={t}
                    i18nKey={getQuestionKey(name)}
                    values={{ weekString: toWeekString(weekIndex) }}
                  />
                }
                helpText={
                  <Trans t={t} i18nKey={getQuestionKey(`help-${name}`)} />
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
                <Trans t={t} i18nKey={getQuestionKey("workOrEarn")} />
              }
              helpText={t(getQuestionKey("help-workOrEarn"))}
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
                questionText={t(getQuestionKey("recentDisaster"))}
                helpText=""
                ifYes={formData.recentDisaster}
                onChange={(e) => handleFormDataChange(e)}
                inputName="recentDisaster"
              >
                <DisasterQuestion
                  questionText={t(getQuestionKey("disasterChoice"))}
                  choice={formData.disasterChoice}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </YesNoQuestion>
            )}
            {weekForUser === numberOfWeeks && (
              <PerjuryCheckbox
                isAnyWeekPua={userData.programPlan.includes(
                  programPlan.puaFullTime
                )}
              />
            )}
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
                  onClick={() =>
                    logEvent(
                      "RetroCerts",
                      "BackButton",
                      `weeks-for-user-${weekForUser}`
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
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

RetroCertsCertificationPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
  routeComputedMatch: PropTypes.object.isRequired,
};

export default RetroCertsCertificationPage;
