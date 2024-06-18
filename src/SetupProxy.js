const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.chapa.co',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/v1/transaction/initialize', // Rewrite path
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      },
    })
  );
};
