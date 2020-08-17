import React from "react";
import { shallow } from "enzyme";
import { I18nextProvider, Trans } from "react-i18next";
import i18n from "./i18nForTests";
import shallowUntilTarget from "./shallowUntilTarget";

function renderNonTransContent(Component, props = {}) {
  const providersWrapper = shallow(
    <I18nextProvider i18n={i18n}>
      <Component {...props} />
    </I18nextProvider>
  );

  const wrapper = shallowUntilTarget(providersWrapper, Component.name);
  // Incorrectly using renderNonTransContent to render a component that
  // contains a Trans component results in a silent failure (the rendered
  // snapshot will contain the Trans component itself instead of the rendered
  // contents). This test makes that silent failure more obvious.
  expect(wrapper.containsMatchingElement(<Trans />)).toBe(false);

  return wrapper;
}

module.exports = renderNonTransContent;
