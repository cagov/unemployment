import IcomoonReact from "icomoon-react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import iconSet from "../../../../public/icons.json";

class Header extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar className="justify-content-between" variant="dark" bg="dark">
          <Navbar.Brand href="https://ca.gov">
            <img
              src="images/Ca-Gov-Logo-Gold.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="California gov logo"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="https://edd.ca.gov">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={15}
                icon="home"
              />{" "}
              Home
            </Nav.Link>
            <Nav.Link href="https://edd.ca.gov/login.htm">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={15}
                icon="key"
              />{" "}
              Log In
            </Nav.Link>
          </Nav>
        </Navbar>
        <Navbar
          className="border-bottom border-secondary"
          collapseOnSelect
          expand="md"
        >
          <Navbar.Brand href="https://edd.ca.gov">
            <img
              src="images/edd-logo-2-Color.svg"
              height="50"
              className="d-inline-block align-top"
              alt="California gov logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav.Link href="https://edd.ca.gov/jobs.htm">Jobs</Nav.Link>
            <Nav.Link href="https://edd.ca.gov/claims.htm">Claims</Nav.Link>
            <Nav.Link href="https://edd.ca.gov/employers.htm">
              Employers
            </Nav.Link>
            <Nav.Link href="https://edd.ca.gov/newsroom.htm">Newsroom</Nav.Link>
            <Nav.Link href="https://edd.ca.gov/serp.html?q=">Search</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
