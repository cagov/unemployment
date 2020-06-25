const TOP = { x: 0, y: 0 };

function autoScroll(options) {
  window.scrollTo(options.x, options.y);
}

module.exports = {
  TOP,
  autoScroll,
};
