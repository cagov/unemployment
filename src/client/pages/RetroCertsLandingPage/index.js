import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import AUTH_STRINGS from "../../../data/auth-strings";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsLandingPage(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  const history = useHistory();

  if (!userData.weeksToCertify) {
    const authToken = sessionStorage.getItem(AUTH_STRINGS.authToken);
    if (!authToken) {
      return <Redirect to="/retroactive-certification" push />;
    }

    fetch(AUTH_STRINGS.apiPath.data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({authToken})
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data);
      if (data.status !== AUTH_STRINGS.statusCode.ok) {
        sessionStorage.removeItem(AUTH_STRINGS.authToken);
      }
    })
    .catch(error => console.error(error));

    return <div>Loading...</div>;
  }

  // Removes the users session token which logs the user out.
  function logout() {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    setUserData({status: AUTH_STRINGS.statusCode.notLoggedIn});
    history.push("/retroactive-certification");
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>Hello</h1>
          <p>Weeks to certify: {userData.weeksToCertify.join(", ")}</p>
          <p><Button variant="link" onClick={logout}>Clear Session</Button></p>
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
