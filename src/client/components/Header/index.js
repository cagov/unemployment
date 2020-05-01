import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="header border-bottom border-secondary">
      <Navbar className="justify-content-between" variant="custom" bg="primary">
        <Navbar.Brand href="https://ca.gov">
          <img
            src="images/Ca-Gov-Logo-Gold.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt={t("iconAltText.caGov")}
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="https://edd.ca.gov">
            <img
              src="images/home.svg"
              width="15"
              height="15"
              alt={t("iconAltText.home")}
            />{" "}
            <span>Home</span>
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/login.htm">
            <img
              src="images/key.svg"
              width="15"
              height="15"
              alt={t("iconAltText.key")}
            />{" "}
            <span>Log In</span>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar className="" collapseOnSelect expand="md" variant="light">
        <Navbar.Brand href="https://edd.ca.gov">
          <img
            src="images/edd-logo-2-Color.svg"
            height="50"
            width="150"
            className="d-inline-block align-top"
            alt={t("iconAltText.caGov")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-between">
          <Nav.Link href="https://edd.ca.gov/jobs.htm">
            <span className="text-dark">Jobs</span>
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/claims.htm">
            <span className="text-dark">Claims</span>
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/employers.htm">
            <span className="text-dark">Employers</span>
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/newsroom.htm">
            <span className="text-dark">Newsroom</span>
          </Nav.Link>
          <Nav.Link href="https://edd.ca.gov/serp.html?q=">
            <span className="text-dark">Search</span>
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
