import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Navbar className="justify-content-between" variant="custom" bg="dark">
        <Nav>
          <Nav.Link href="#back-to-top">Back to Top</Nav.Link>
          <Nav.Link href="https://edd.ca.gov/about_edd/">About EDD</Nav.Link>
          <Nav.Link href="https://edd.ca.gov/about_edd/contact_edd.htm">
            Contact EDD
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/about_edd/conditions_of_use.htm">
            Conditions of Use
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/about_edd/privacy_policy.htm">
            Privacy Policy
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/about_edd/accessibility.htm">
            Accessibility
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/sitemap.htm">Site Map</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="https://www.facebook.com/californiaedd/">
            <img
              src="images/facebook.svg"
              width="15"
              height="15"
              alt={t("iconAltText.facebook")}
            />{" "}
          </Nav.Link>
          <Nav.Link href="https://twitter.com/CA_EDD">
            <img
              src="images/twitter.svg"
              width="15"
              height="15"
              alt={t("iconAltText.twitter")}
            />{" "}
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/company/californiaedd/">
            <img
              src="images/linkedin.svg"
              width="15"
              height="15"
              alt={t("iconAltText.linkedIn")}
            />{" "}
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/ca_edd/">
            <img
              src="images/instagram.svg"
              width="15"
              height="15"
              alt={t("iconAltText.instagram")}
            />{" "}
          </Nav.Link>
          <Nav.Link href="https://www.youtube.com/user/CaliforniaEDDD">
            <img
              src="images/youtube.svg"
              width="15"
              height="15"
              alt={t("iconAltText.youtube")}
            />{" "}
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="bg-light secondary-footer">
        <Container>Copyright © 2020 State of California</Container>
      </div>
    </footer>
  );
}

export default Footer;
