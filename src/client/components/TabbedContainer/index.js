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
import logEvent from "../../utils.js";
import { useTranslation } from "react-i18next";

function TabbedContainer() {
  const { t } = useTranslation();

  // The number and order of items here need to correspond to
  // tabTitles in translation.json
  const tabSlugs = [
    "benefits",
    "before-you-apply",
    "how-to-apply",
    "after-you-submit",
    "receive-benefits",
    "more-resources",
  ];

  // This mapping is needed because React doesn't allow strings as component names
  // TODO(kalvin): find a less hacky way of getting content into these tab panes
  const tabPaneContent = [
    TabPaneContent0,
    TabPaneContent1,
    TabPaneContent2,
    TabPaneContent3,
    TabPaneContent4,
    TabPaneContent5,
  ];

  const tabbedContainer = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const initialPageLoad = useRef(true);

  // Scroll to the top of the sidebar when activeTab changes
  // and log tab change to Google Analytics
  useEffect(() => {
    // Don't scroll down to the top of the sidebar on initial page load
    if (initialPageLoad.current) {
      initialPageLoad.current = false;
      return;
    }

    const sidebarOffset = tabbedContainer.current.offsetTop;

    // we use smoothscroll-polyfill for Edge/IE
    window.scroll({
      top: sidebarOffset,
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  function loadTab(tabIndex) {
    setActiveTab(tabIndex);
    logEvent(getTabHashFragment(activeTab));

    return null;
  }

  function getTabTitle(tabIndex) {
    return t("tabTitles." + tabIndex);
  }

  function getTabHashFragment(tabIndex) {
    return `#${tabSlugs[tabIndex]}`;
  }

  const renderNextButton = (tabIndex) => {
    // Don't display the next button on the final tab
    if (tabIndex < tabSlugs.length - 1) {
      const nextTabIndex = tabIndex + 1;
      return (
        <Button
          variant="secondary"
          href={getTabHashFragment(nextTabIndex)}
          onClick={() => loadTab(nextTabIndex)}
        >
          {t("buttonNextPrefix") + getTabTitle(nextTabIndex)}
        </Button>
      );
    }
  };

  return (
    <Container ref={tabbedContainer}>
      <Tab.Container id="left-tabs" defaultActiveKey="0" activeKey={activeTab}>
        <Row className="tabbed-container">
          <Col sm={4} className="TabbedContainer">
            <Nav variant="pills" className="flex-column sidebar-sticky">
              {tabSlugs.map((value, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link
                      eventKey={index}
                      href={getTabHashFragment(index)}
                      onClick={() => loadTab(index)}
                    >
                      {getTabTitle(index)}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {tabSlugs.map((value, index) => {
                const TabPaneContentTagName = tabPaneContent[index];
                return (
                  <Tab.Pane eventKey={index} key={index}>
                    <h2>{getTabTitle(index)}</h2>
                    <TabPaneContentTagName
                      getTabTitle={getTabTitle}
                      loadTab={loadTab}
                      tabSlugs={tabSlugs}
                    />
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
