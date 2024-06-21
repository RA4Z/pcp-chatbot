const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/gemini',
    createProxyMiddleware({
      target: 'http://10.1.43.63:5000',
      changeOrigin: true,
    })
  );
};