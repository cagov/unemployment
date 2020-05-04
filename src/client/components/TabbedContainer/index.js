import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
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

  // The default "uncontrolled" React Bootstrap tab container automatically
  // manages active tab state and keypresses, but we must do that manually
  // because we need to update the active tab when the user clicks on
  // navigation outside of the sidebar tabs (internal links, the Next buttons)
  const initialTabIndex = 0;
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const activeNavItem = useRef(null);

  // Follows accessibility specs: https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
  const handleKeyDown = (event, tabIndex) => {
    let targetTabIndex;
    switch (event.key) {
      // WAI-ARIA: "If the tabs in a tab list are arranged vertically",
      // navigate with the up and down keys
      case "ArrowUp":
        targetTabIndex = tabIndex - 1;
        break;
      case "ArrowDown":
        targetTabIndex = tabIndex + 1;
        break;
      default:
        return;
    }
    if (targetTabIndex < 0 || targetTabIndex > tabSlugs.length - 1) return;

    event.preventDefault();
    setActiveTabIndex(targetTabIndex);

    // WAI-ARIA: "It is recommended that tabs activate automatically when
    // they receive focus as long as their associated tab panels are displayed
    // without noticeable latency."
    history.push(prefix + tabSlugs[targetTabIndex]);
  };

  const tabbedContainer = useRef(null);
  const prefix = "/guide/";
  const initialPageLoad = useRef(true);
  const history = useHistory();

  // Scroll to the top of the sidebar when a tab content pane loads
  function ScrollToTopOnMount() {
    useEffect(() => {
      // Don't scroll down to the top of the sidebar on initial page load
      if (initialPageLoad.current) {
        initialPageLoad.current = false;
        return;
      }

      // we use smoothscroll-polyfill for Edge/IE
      window.scroll({
        top: tabbedContainer.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }, []);

    return null;
  }

  function getTabTitle(tabIndex) {
    return t("tabTitles." + tabIndex);
  }

  function getTabLink(tabIndex) {
    return (
      <Link
        to={prefix + tabSlugs[tabIndex]}
        onClick={() => setActiveTabIndex(tabIndex)}
      >
        {getTabTitle(tabIndex)}
      </Link>
    );
  }

  const renderNextButton = (tabIndex) => {
    // Don't render a next button on the final tab
    if (tabIndex >= tabSlugs.length - 1) return;

    const nextTabIndex = tabIndex + 1;
    return (
      <Button
        variant="secondary"
        as={Link}
        to={prefix + tabSlugs[nextTabIndex]}
        onClick={() => setActiveTabIndex(nextTabIndex)}
      >
        {t("buttonNextPrefix") + getTabTitle(nextTabIndex)}
      </Button>
    );
  };

  return (
    <Container ref={tabbedContainer}>
      <Tab.Container id="left-tabs" activeKey={activeTabIndex}>
        <Row className="tabbed-container">
          <Col sm={4} className="TabbedContainer">
            <Nav variant="pills" className="flex-column sidebar-sticky">
              {tabSlugs.map((value, index) => {
                return (
                  <Nav.Item key={index} ref={activeNavItem}>
                    <Nav.Link
                      as={Link}
                      eventKey={index}
                      to={prefix + value}
                      onClick={() => setActiveTabIndex(index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                    >
                      {getTabTitle(index)}
                    </Nav.Link>{" "}
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Switch>
                {tabSlugs.map((value, index) => {
                  const TabPaneContentTagName = tabPaneContent[index];
                  return (
                    <Route path={prefix + value} key={index}>
                      <ScrollToTopOnMount />
                      <h2>{getTabTitle(index)}</h2>
                      <TabPaneContentTagName getTabLink={getTabLink} />
                      {renderNextButton(index)}
                    </Route>
                  );
                })}
                <Redirect from="/" to={prefix + tabSlugs[initialTabIndex]} />
              </Switch>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default TabbedContainer;
