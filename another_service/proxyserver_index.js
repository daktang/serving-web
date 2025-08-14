const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
// Create Express Server
const app = express();

// Configuration
const PORT = 5000;
const HOST = "localhost";
const CORE_API_SERVICE_URL =
  "https://portal.aiserving.dev.aip.domain.net/api/v2/";
const EXT_API_SERVICE_URL =
  "https://portal.aiserving.dev.aip.domain.net/ext-dit/api/v1/";
const KUBEFLOW_API_SERVICE_URL =
  "https://kubeflow.aiserving.dev.aip.domain.net/";

// Logging
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, POST, OPTIONS, PUT, DELETE, GET, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Proxy endpoints
app.use(
  "/coreproxy",
  createProxyMiddleware({
    target: CORE_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/coreproxy/`]: "/",
    },
    secure: false,
  })
);

app.use(
  "/extproxy",
  createProxyMiddleware({
    target: EXT_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/extproxy/`]: "/",
    },
    secure: false,
  })
);

app.use(
  "/kubeflowproxy",
  createProxyMiddleware({
    target: KUBEFLOW_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/kubeflowproxy/`]: "/",
    },
    secure: false,
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
console.log("Server started");

