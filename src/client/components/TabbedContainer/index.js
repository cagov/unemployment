import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useTranslation } from "react-i18next";

function TabbedContainer() {
  const { t } = useTranslation();

  // We write these out instead of generating them
  // so we can find them easily when searching for keys in translation.json
  const tabTitleKeys = [
    "tab0Title",
    "tab1Title",
    "tab2Title",
    "tab3Title",
    "tab4Title",
    "tab5Title",
    "tab6Title",
  ];

  const [activeKey, setActiveKey] = useState(0);

  const renderNextButton = (index) => {
    // Don't display the next button on the final tab
    if (index < tabTitleKeys.length - 1) {
      return (
        <Button
          variant="secondary"
          href={"#" + tabTitleKeys[index + 1]}
          // TODO(kalvin): fix this very slight performance issue
          onClick={() => setActiveKey(activeKey + 1)}
        >
          {t("buttonNextPrefix") + t(tabTitleKeys[index + 1])}
        </Button>
      );
    }
  };

  return (
    <Container>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="0"
        activeKey={activeKey}
      >
        <Row className="tabbed-container">
          <Col sm={4} className="TabbedContainer">
            <Nav variant="pills" className="flex-column">
              {tabTitleKeys.map((value, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link
                      eventKey={index}
                      href={"#" + value}
                      onClick={() => setActiveKey(index)}
                    >
                      {t(value)}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {tabTitleKeys.map((value, index) => {
                return (
                  <Tab.Pane eventKey={index} key={index}>
                    <h2>{t(value)}</h2>
                    {renderNextButton(index)}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default TabbedContainer;
