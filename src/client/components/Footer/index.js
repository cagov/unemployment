import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useTranslation } from "react-i18next";

function Footer(props) {
  const { t } = useTranslation();

  const basePathName = window.location.pathname;
  const backToTopPathName = basePathName.includes("#")
    ? `${basePathName.substring(0, basePathName.indexOf("#"))}#${
        props.backToTopTag
      }`
    : `${basePathName}#${props.backToTopTag}`;

  return (
    <footer className="footer">
      <Navbar className="justify-content-between" variant="custom" bg="dark">
        <Nav className="flex-wrap">
          <Nav.Link href={backToTopPathName}>{t("footer.toTop")}</Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/about_edd/"
          >
            {t("footer.about")}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/about_edd/contact_edd.htm"
          >
            {t("footer.contact")}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/about_edd/conditions_of_use.htm"
          >
            {t("footer.conditionsOfUse")}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/about_edd/privacy_policy.htm"
          >
            {t("footer.privacyPolicy")}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/about_edd/accessibility.htm"
          >
            {t("footer.accessibility")}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/sitemap.htm"
          >
            {t("footer.siteMap")}
          </Nav.Link>
        </Nav>
        <Nav className="flex-wrap">
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/californiaedd/"
          >
            <img
              src="images/facebook.svg"
              width="15"
              height="15"
              alt={t("iconAltText.facebook")}
            />{" "}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/CA_EDD"
          >
            <img
              src="images/twitter.svg"
              width="15"
              height="15"
              alt={t("iconAltText.twitter")}
            />{" "}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/californiaedd/"
          >
            <img
              src="images/linkedin.svg"
              width="15"
              height="15"
              alt={t("iconAltText.linkedIn")}
            />{" "}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/ca_edd/"
          >
            <img
              src="images/instagram.svg"
              width="15"
              height="15"
              alt={t("iconAltText.instagram")}
            />{" "}
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/user/CaliforniaEDD"
          >
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
        <Container>{t("footer.copyright")}</Container>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  backToTopTag: PropTypes.string.isRequired,
};

export default Footer;
