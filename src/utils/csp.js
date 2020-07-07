function buildPolicies(nonce) {
  const policies = {
    default: ["'self'"],
    img: ["'self'", "www.google-analytics.com", "*.doubleclick.net"],
    style: ["'self'", "fonts.googleapis.com"],
    frame: ["www.google.com"],
    font: ["fonts.googleapis.com", "fonts.gstatic.com"],
    script: [
      "www.googletagmanager.com",
      "www.google-analytics.com",
      "*.google.com",
      `'nonce-${nonce}'`,
    ],
    connect: ["'self'"],
    object: ["'none'"],
  };

  if (process.env.NODE_ENV === "development") {
    policies.script.unshift(`localhost:${process.env.PORT}`);
    policies.script.push("'unsafe-eval'"); // This is needed since webpack for Dev environment is configured to use eval()
    policies.connect.push("*.visualstudio.com");
  }

  return (
    `default-src ${policies.default.join(" ")};` +
    `img-src ${policies.img.join(" ")};` +
    `style-src ${policies.style.join(" ")};` +
    `frame-src ${policies.frame.join(" ")};` +
    `font-src ${policies.font.join(" ")};` +
    `script-src ${policies.script.join(" ")};` +
    `connect-src ${policies.connect.join(" ")};` +
    `object-src ${policies.object.join(" ")};`
  );
}

module.exports = buildPolicies;
