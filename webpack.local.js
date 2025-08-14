const base = require('./webpack.dev.js');

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,

    client: {
      logging: 'verbose',
    },

    proxy: {
      '/api': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
        pathRewrite: {
          '^/api/v2/api/(.*)': '/api/v2/$1'
        },
      },

      '/ext-dit': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },

      '/authservice': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },

      '/models': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
      '/serving': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },

      '/kubeflowproxy': {
        target: 'https://kubeflow.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/kubeflowproxy': '/' },
        cookieDomainRewrite: 'localhost',
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