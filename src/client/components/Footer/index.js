import Container from "react-bootstrap/Container";
import IcomoonReact from "icomoon-react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import iconSet from "../../../../public/icons.json";

class Footer extends React.PureComponent {
  render() {
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
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={20}
                icon="facebook"
              />{" "}
            </Nav.Link>
            <Nav.Link href="https://twitter.com/CA_EDD">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={20}
                icon="twitter"
              />{" "}
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/company/californiaedd/">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={20}
                icon="linkedin2"
              />{" "}
            </Nav.Link>
            <Nav.Link href="https://www.instagram.com/ca_edd/">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={20}
                icon="instagram"
              />{" "}
            </Nav.Link>
            <Nav.Link href="https://www.youtube.com/user/CaliforniaEDDD">
              <IcomoonReact
                iconSet={iconSet}
                color="#ffffff"
                size={20}
                icon="youtube"
              />{" "}
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="bg-light">
          <Container>Copyright © 2020 State of California</Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
