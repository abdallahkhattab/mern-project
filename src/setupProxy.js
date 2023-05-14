const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.tomtom.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the '/api' prefix from the request path
      },
    })
  );
};
