const TOP = { x: 0, y: 0 };
const BEHAVIOR = { smooth: "smooth", auto: "auto" };

function autoScroll(options) {
  const defaults = {
    x: 0,
    y: 0,
    behavior: BEHAVIOR.auto,
  };
  const opts = Object.assign(defaults, options);
  window.scroll({
    top: opts.y,
    left: opts.x,
    behavior: opts.behavior,
  });
}

module.exports = {
  TOP,
  BEHAVIOR,
  autoScroll,
};
