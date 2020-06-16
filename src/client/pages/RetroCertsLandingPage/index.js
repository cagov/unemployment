import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import React from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import routes from "../../../data/routes";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import mockedFormData from "../../../data/mockedFormData";
import YesNoQuestion from "../../components/YesNoQuestion";

function RetroCertsLandingPage(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  const history = useHistory();

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
        setUserData(data);
        history.push(routes.retroCertsConfirmation.path);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>Hello</h1>
          <p>Weeks to certify: {userData.weeksToCertify.join(", ")}</p>
          <p>
            <Button onClick={handleSubmit}>Submit</Button>
          </p>
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
  setUserData: setUserDataPropType,
};

export default RetroCertsLandingPage;
