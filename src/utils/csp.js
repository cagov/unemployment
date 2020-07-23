function buildPolicies() {
  const policies = {
    default: ["'self'"],
    img: ["'self'", "data:", "www.google-analytics.com", "*.doubleclick.net"],
    style: ["'self'", "fonts.googleapis.com"],
    frame: ["www.google.com"],
    font: ["fonts.googleapis.com", "fonts.gstatic.com"],
    script: [
      "'self'",
      "www.googletagmanager.com",
      "www.google-analytics.com",
      "*.google.com",
    ],
    connect: ["'self'", "*.visualstudio.com"],
    object: ["'none'"],
    scriptElem: [
      "'self'",
      "*.google.com",
      "www.googletagmanager.com",
      "www.google-analytics.com",
      "www.gstatic.com",
      "'sha256-y7pLeNIruC+hCYcWLjrAKfMTQoptl6BVn8PcBOXd+aw='", // GA inline script
    ],
  };

  if (process.env.NODE_ENV === "development") {
    policies.script.unshift(`localhost:${process.env.PORT}`);
    policies.script.push("'unsafe-eval'"); // This is needed since webpack for Dev environment is configured to use eval()
  }

  return (
    `default-src ${policies.default.join(" ")};` +
    `img-src ${policies.img.join(" ")};` +
    `style-src ${policies.style.join(" ")};` +
    `frame-src ${policies.frame.join(" ")};` +
    `font-src ${policies.font.join(" ")};` +
    `script-src ${policies.script.join(" ")};` +
    `connect-src ${policies.connect.join(" ")};` +
    `object-src ${policies.object.join(" ")};` +
    `script-src-elem ${policies.scriptElem.join(" ")}`
  );
}

module.exports = buildPolicies;
