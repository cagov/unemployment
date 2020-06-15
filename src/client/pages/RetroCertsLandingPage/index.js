import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import React from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import mockedFormData from "../../../data/mockedFormData";

function RetroCertsLandingPage(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  const history = useHistory();

  const handleSubmit = () => {
    fetch(AUTH_STRINGS.apiPath.save, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mockedFormData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        if (data.authToken) {
          // Session storage is destroyed when the tab is closed! That"s a bit weird.
          // If we want to allow the user to use multiple tabs, we could sync the
          // value across tabs:
          // https://medium.com/@marciomariani/sharing-sessionstorage-between-tabs-5b6f42c6348c
          sessionStorage.setItem(AUTH_STRINGS.authToken, data.authToken);
          history.push("/retroactive-certification/what-to-expect");
        } else {
          sessionStorage.removeItem(AUTH_STRINGS.authToken);
        }
      })
      .catch((error) => console.error(error));
  };

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
