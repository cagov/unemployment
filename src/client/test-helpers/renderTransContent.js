import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";

function renderTransContent(Component, props = {}) {
  const wrapper = mount(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <Component {...props} />
      </I18nextProvider>
    </MemoryRouter>
  );

  // Filter out the very verbose I18nextProvider component wrapper
  return wrapper.find(Component);
}

module.exports = renderTransContent;
