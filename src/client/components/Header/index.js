import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="header border-bottom border-secondary">
      <Navbar className="justify-content-between" variant="custom" bg="primary">
        <Navbar.Brand
          target="_blank"
          rel="noopener noreferrer"
          href="https://ca.gov"
        >
          <img
            src="images/Ca-Gov-Logo-Gold.svg"
            width="30"
            height="30"
            alt={t("iconAltText.caGov")}
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov"
          >
            <img
              className="icon"
              src="images/home.svg"
              width="15"
              height="15"
              alt={t("iconAltText.home")}
            />{" "}
            <span className="text">{t("header.home")}</span>
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/login.htm"
          >
            <span>
              <img
                className="icon"
                src="images/key.svg"
                width="15"
                height="15"
                alt={t("iconAltText.key")}
              />{" "}
              <span className="text">{t("header.login")}</span>
            </span>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar collapseOnSelect expand="md" variant="light">
        <Navbar.Brand
          target="_blank"
          rel="noopener noreferrer"
          href="https://edd.ca.gov"
        >
          <img
            src="images/edd-logo-2-Color.svg"
            height="50"
            width="150"
            className="d-inline-block align-top mr-5"
            alt={t("iconAltText.caGov")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-between ml-5 mr-5 pl-5">
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/jobs.htm"
          >
            <span>{t("header.jobs")}</span>
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/claims.htm"
          >
            <span>{t("header.claims")}</span>
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/employers.htm"
          >
            <span>{t("header.employers")}</span>
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/newsroom.htm"
          >
            <span>{t("header.newsroom")}</span>
          </Nav.Link>
          <Nav.Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://edd.ca.gov/serp.html?q="
          >
            <span>{t("header.search")}</span>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
