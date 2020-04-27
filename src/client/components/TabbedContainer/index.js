import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TabPaneContent0 from "../TabPaneContent0";
import TabPaneContent1 from "../TabPaneContent1";
import TabPaneContent2 from "../TabPaneContent2";
import TabPaneContent3 from "../TabPaneContent3";
import TabPaneContent4 from "../TabPaneContent4";
import TabPaneContent5 from "../TabPaneContent5";
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
  ];

  // This mapping is needed because React doesn't allow strings as component names
  // TODO(kalvin): find a less hacky way of getting content into these tab panes
  const tabPaneContent = {
    0: TabPaneContent0,
    1: TabPaneContent1,
    2: TabPaneContent2,
    3: TabPaneContent3,
    4: TabPaneContent4,
    5: TabPaneContent5,
  };

  const tabbedContainer = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const sidebarOffset = tabbedContainer.current.offsetTop;

    try {
      // smooth smooth scrolling for newer browsers
      window.scroll({
        top: sidebarOffset,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      // fallback for older browsers
      window.scrollTo(0, sidebarOffset);
    }
  }, [activeTab]);

  function loadTab(tabIndex) {
    setActiveTab(tabIndex);

    return null;
  }

  const renderNextButton = (tabIndex) => {
    // Don't display the next button on the final tab
    if (tabIndex < tabTitleKeys.length - 1) {
      return (
        <Button
          variant="secondary"
          href={"#" + tabTitleKeys[tabIndex + 1]}
          onClick={() => loadTab(tabIndex + 1)}
        >
          {t("buttonNextPrefix") + t(tabTitleKeys[tabIndex + 1])}
        </Button>
      );
    }
  };

  return (
    <Container ref={tabbedContainer}>
      <Tab.Container id="left-tabs" defaultActiveKey="0" activeKey={activeTab}>
        <Row className="tabbed-container">
          <Col sm={4} className="TabbedContainer">
            <Nav variant="pills" className="flex-column">
              {tabTitleKeys.map((value, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link
                      eventKey={index}
                      href={"#" + value}
                      onClick={() => loadTab(index)}
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
                const TabPaneContentTagName = tabPaneContent[index];
                return (
                  <Tab.Pane eventKey={index} key={index}>
                    <h2>{t(value)}</h2>
                    <TabPaneContentTagName loadTab={loadTab} />
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
