/**
 * We want to shallow render our components in order to unit test
 * them, however we also often need to wrap them with higher order
 * components for things like Redux and i18n. This helper will render
 * all “wrapper” (or higher order) components until reaching our
 * target component
 * @param {*} enzymeShallowWrapper
 * @param {string} targetComponentName - Name of the React component we're looking for
 * @returns {*} Enzyme shallow wrapper
 * @see https://airbnb.io/enzyme/docs/api/shallow.html
 * @see https://hacks.mozilla.org/2018/04/testing-strategies-for-react-and-redux/
 */
function shallowUntilTarget(enzymeShallowWrapper, targetComponentName) {
  const nextShallowWrapper = enzymeShallowWrapper.dive();

  if (nextShallowWrapper.name() === targetComponentName) {
    return nextShallowWrapper.shallow();
  }
  return shallowUntilTarget(nextShallowWrapper, targetComponentName);
}

module.exports = shallowUntilTarget;
