import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
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
import mockedFormData from "../../../data/mockedFormData";
import routes from "../../../data/routes";
import AUTH_STRINGS from "../../../data/authStrings";
import seekWorkPlan from "../../../data/seekWorkPlan";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YesNoQuestion from "../../components/YesNoQuestion";
import DaysSickQuestion from "../../components/DaysSickQuestion";
import EmployersQuestions from "../../components/EmployersQuestions";

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

  const weekSeekWorkPlan =
    userData.seekWorkPlan[userData.weeksToCertify.indexOf(weekIndex)];

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
    if (weekSeekWorkPlan === seekWorkPlan.uiPartTime) {
      return "retrocerts-certification.questions.ui-part-time." + transKey;
    }
    if (weekSeekWorkPlan === seekWorkPlan.uiFullTime) {
      return "retrocerts-certification.questions.ui-full-time." + transKey;
    }
    if (weekSeekWorkPlan === seekWorkPlan.puaFullTime) {
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

  const questionsTwoThroughFive =
    weekSeekWorkPlan === seekWorkPlan.puaFullTime
      ? ["couldNotAcceptWork", "didYouLook", "refuseWork", "otherBenefits"]
      : ["couldNotAcceptWork", "didYouLook", "refuseWork", "schoolOrTraining"];

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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <YesNoQuestion
              key={weekIndex + "tooSick"}
              questionNumber={1}
              questionText={t(questionText("tooSick"))}
              helpText={t(questionText("help-tooSick"))}
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
                questionText={<Trans t={t} i18nKey={questionText(name)} />}
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
              questionText={t("retrocerts-certification.q-workOrEarn")}
              helpText={t("retrocerts-certification.qhelp-workOrEarn")}
              ifYes={formData.workOrEarn}
              onChange={(e) => handleFormDataChange(e)}
              inputName="workOrEarn"
            >
              <EmployersQuestions
                employers={formData.employers}
                onChange={(employers) => handleEmployersChange(employers)}
              />
            </YesNoQuestion>

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
                  {t("retrocerts-certification.button-back")}
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
