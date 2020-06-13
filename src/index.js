// Set process.env from local .env file - this should come as early in file as possible
require("dotenv/config");
const http = require("http");
const { init } = require("./app");

/**
 * Start the HTTP server for our web application
 */
function startServer() {
  const app = init();
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;

  server.listen(port, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // eslint-disable-next-line no-console
    console.log("Server started", {
      app: "Benefits Screener",
      cdn_endpoint_name: process.env.CDN_ENDPOINT_NAME,
      port,
    });
  });
}

startServer();
