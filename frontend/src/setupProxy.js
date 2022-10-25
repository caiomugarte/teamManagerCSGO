const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://localhost:3001",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/meme", createProxyMiddleware(proxy));
  app.use("/liquipedia", createProxyMiddleware(proxy));
};
