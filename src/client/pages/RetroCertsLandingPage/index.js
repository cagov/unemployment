import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function RetroCertsLandingPage(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  const history = useHistory();

  if (!userData.weeksToCertify) {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      return <Redirect to="/retroactive-certification" />;
    }

    fetch("/retroactive-certification/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({authToken})
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data);
      if (data.status !== "OK") {
        sessionStorage.removeItem("authToken");
      }
    })
    .catch(error => console.error(error));

    return <div>Loading...</div>;
  }

  // Removes the users session token which logs the user out.
  function logout() {
    sessionStorage.removeItem("authToken");
    setUserData({status: "not-logged-in"});
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
  userData: PropTypes.object,
  setUserData: PropTypes.func
};

export default RetroCertsLandingPage;
