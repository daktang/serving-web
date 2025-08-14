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
        cookiedomainRewrite: { 'portal.aiserving.dev.aip.domain.net': '' },
        headers: { Host: 'portal.aiserving.dev.aip.domain.net' },
        onProxyReq(req) {
          req.setHeader('X-Forwarded-Proto', 'https');
          req.setHeader('X-Forwarded-Host', 'localhost:3000');
          req.setHeader('X-Forwarded-Port', '3000');
        },
        onProxyRes(res) {
          const loc = res.headers['location'];
          if (!loc) return;
          res.headers['location'] = loc
            .replace('https://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
            .replace('http://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
            .replace('https://portal.aiserving.dev.aip.domain.net', 'https://localhost:3000');
        },
      },

      '/ext-dit': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookiedomainRewrite: { 'portal.aiserving.dev.aip.domain.net': '' },
        headers: { Host: 'portal.aiserving.dev.aip.domain.net' },
        onProxyReq(req) {
          req.setHeader('X-Forwarded-Proto', 'https');
          req.setHeader('X-Forwarded-Host', 'localhost:3000');
          req.setHeader('X-Forwarded-Port', '3000');
        },
        onProxyRes(res) {
          const loc = res.headers['location'];
          if (!loc) return;
          res.headers['location'] = loc
            .replace('https://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
            .replace('http://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
            .replace('https://portal.aiserving.dev.aip.domain.net', 'https://localhost:3000');
        },
      },

      '/authservice': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookiedomainRewrite: { 'portal.aiserving.dev.aip.domain.net': '' },
        cookiePathRewrite: { '/authservice': '/', '/': '/' },

        onProxyReq(req) {
          req.setHeader('X-Forwarded-Proto', 'https');
          req.setHeader('X-Forwarded-Host', 'localhost:3000');
          req.setHeader('X-Forwarded-Port', '3000');
        },

        onProxyRes(res) {
          const loc = res.headers['location'];
          if (loc) {
            try {
              const u = new URL(loc);
              if (u.hostname === 'auth.dev.aip.domain.net') {
                const ru = u.searchParams.get('redirect_uri');
                if (ru) {
                  const ruUrl = new URL(ru);
                  ruUrl.protocol = 'https:';
                  ruUrl.host = 'localhost:3000';
                  ruUrl.pathname = '/authservice/oidc/callback';
                  u.searchParams.set('redirect_uri', ruUrl.toString());
                  res.headers['location'] = u.toString();
                }
              }
            } catch {}
            res.headers['location'] = res.headers['location']
              .replace('https://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
              .replace('http://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice');
          }

          const sc = res.headers['set-cookie'];
          if (sc) {
            const arr = Array.isArray(sc) ? sc : [sc];
            res.headers['set-cookie'] = arr.map(v =>
              v
                .replace(/domain=portal\.aiserving\.dev\.aip\.domain\.net/gi, 'domain=')
                .replace(/Path=\/authservice/gi, 'Path=/')
            );
          }
        },
      },

      '/models': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookiedomainRewrite: { 'portal.aiserving.dev.aip.domain.net': '' },
        headers: { Host: 'portal.aiserving.dev.aip.domain.net' },
      },
      '/serving': {
        target: 'https://portal.aiserving.dev.aip.domain.net',
        changeOrigin: true,
        secure: false,
        cookiedomainRewrite: { 'portal.aiserving.dev.aip.domain.net': '' },
        headers: { Host: 'portal.aiserving.dev.aip.domain.net' },
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