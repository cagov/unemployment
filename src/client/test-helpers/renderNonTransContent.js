import React from "react";
import { shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";
import shallowUntilTarget from "./shallowUntilTarget";

function renderNonTransContent(Component, componentName, props = {}) {
  const providersWrapper = shallow(
    <I18nextProvider i18n={i18n}>
      <Component {...props} />
    </I18nextProvider>
  );

  const wrapper = shallowUntilTarget(providersWrapper, componentName);

  return wrapper;
}

module.exports = renderNonTransContent;
