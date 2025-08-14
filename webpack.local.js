const base = require('./webpack.dev.js');

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,
    server: 'https',

    proxy: {
      // ===== API (v1/v2 포함) → 개발 포털 =====
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
              // IdP 단계: redirect_uri를 로컬 콜백으로 강제
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
            // 포털 절대 경로 잔여분을 로컬로 고정
            res.headers['location'] = res.headers['location']
              .replace('https://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice')
              .replace('http://portal.aiserving.dev.aip.domain.net/authservice', 'https://localhost:3000/authservice');
          }

          // Set-Cookie: domain/Path 보정 (배열/단일 모두 처리)
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

      // ===== 모델/서빙 → 개발 포털 =====
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

      // ===== Kubeflow → 개발 쿠브플로우 =====
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

  // Dotenv 등은 불요 — base.plugins만 사용
  plugins: [
    ...base.plugins,
  ],
};
