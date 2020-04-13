/**
 * Return a CDN URL for a static asset if a CDN endpoint is present
 * @param {string} path - Relative URL (i.e. /asset/style.css)
 * @returns {string}
 */
function getCdnPath(path) {
  if (process.env.CDN_ENDPOINT_NAME) {
    return `https://${process.env.CDN_ENDPOINT_NAME}.azureedge.net${path}`;
  }

  return path;
}

module.exports = getCdnPath;
