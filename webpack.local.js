const base = require('./webpack.dev.js');

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,
    server: 'https',

    proxy: {
      '/api': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
      },

      '/ext-dit': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
      },

      '/authservice': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
      },

      '/models': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
      },
      '/serving': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
      },

      '/kubeflowproxy': {
        target: 'https://kubeflow.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/kubeflowproxy': '/' },
      },
    },

    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('/', (_req, res) => res.redirect(302, '/dashboard'));
      return middlewares;
    },
  },

  plugins: [
    ...base.plugins,
  ],
}