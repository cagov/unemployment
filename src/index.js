const http = require("http");
const { init } = require("./app");

/**
 * Start the HTTP server for our web application
 */
function startServer() {
  const app = init();
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;

  server.listen(port, error => {
    if (error) {
      console.log(error);
    }

    console.log("Server started", {
      app: "Benefits Screener",
      cdn_endpoint_name: process.env.CDN_ENDPOINT_NAME,
      port
    });
  });
}

startServer();
