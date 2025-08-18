// webpack.local.js
const base = require('./webpack.dev.js');

const PORTAL = 'portal.aiserving.dev.aip.domain.net';
const AUTH   = 'auth.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL  = 'localhost:3000';

// helpers
function onProxyReq(req) {
  req.setHeader('X-Forwarded-Proto', 'http');
  req.setHeader('X-Forwarded-Host', LOCAL);
  req.setHeader('X-Forwarded-Port', '3000');
}
function rewriteLocationToLocal(res) {
  const loc = res.headers['location']; if (!loc) return;
  res.headers['location'] = loc
    .replace(`https://${PORTAL}/authservice`, `http://${LOCAL}/authproxy`)
    .replace(`http://${PORTAL}/authservice`,  `http://${LOCAL}/authproxy`)
    .replace(`https://${PORTAL}`,              `http://${LOCAL}`)
    .replace(`http://${PORTAL}`,               `http://${LOCAL}`);
}
function rewriteRedirectUriToLocal(res) {
  const loc = res.headers['location']; if (!loc) return;
  try {
    const u = new URL(loc);
    if (u.hostname === AUTH) {
      const ru = u.searchParams.get('redirect_uri');
      if (ru) {
        const r = new URL(ru);
        r.protocol = 'http:'; r.host = LOCAL; r.pathname = '/authproxy/oidc/callback';
        u.searchParams.set('redirect_uri', r.toString());
        res.headers['location'] = u.toString();
      }
    }
  } catch {}
}
function rewriteSetCookie(res) {
  const sc = res.headers['set-cookie']; if (!sc) return;
  const arr = Array.isArray(sc) ? sc : [sc];
  res.headers['set-cookie'] = arr.map(v =>
    v.replace(new RegExp(`Domain=${PORTAL}`, 'i'), 'Domain=')
     .replace(/Path=\/authservice/gi, 'Path=/')
     .replace(/;\s*Secure/gi, '')
     .replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
  );
}
const rewriteCore = p => p.replace(/^\/coreproxy\/api\/+/, '/api/').replace(/^\/coreproxy\/+/, '/api/');
const rewriteExt  = p => (
  /^\/extproxy\/api\/v\d+\//.test(p) ? p.replace(/^\/extproxy\/api\/v(\d+)\//, '/ext-dit/api/v$1/') :
  /^\/extproxy\/v\d+\//.test(p)     ? p.replace(/^\/extproxy\/v(\d+)\//,     '/ext-dit/api/v$1/') :
                                      p.replace(/^\/extproxy\/+/,             '/ext-dit/api/')
);

const commonPortalProxy = {
  target: `https://${PORTAL}`,
  changeOrigin: true,
  secure: false,
  headers: { Host: PORTAL },
  cookieDomainRewrite: { [PORTAL]: '' },
  onProxyReq,
  onProxyRes: rewriteLocationToLocal,
};

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000, // HTTP
    client: { logging: 'verbose', webSocketURL: { protocol: 'ws', hostname: 'localhost', port: '3000', pathname: '/ws' } },

    proxy: {
      // B 스타일 프리픽스
      '/coreproxy': { ...commonPortalProxy, pathRewrite: rewriteCore },
      '/extproxy':  { ...commonPortalProxy, pathRewrite: rewriteExt },

      // 모델/서빙
      '/models':  { ...commonPortalProxy },
      '/serving': { ...commonPortalProxy },

      // OIDC
      '/authproxy': {
        ...commonPortalProxy,
        pathRewrite: { '^/authproxy': '/authservice' },
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },
      // 혹시 /authservice 직접 호출도 커버
      '/authservice': {
        ...commonPortalProxy,
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },

      // socket.io
      '/socket.io': { ...commonPortalProxy, ws: true },

      // Kubeflow
      '/kubeflowproxy': {
        target: `https://${KUBEFLOW}`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/kubeflowproxy': '/' },
        cookieDomainRewrite: { [KUBEFLOW]: '' },
        onProxyReq,
      },
    },

    setupMiddlewares: (m, devServer) => {
      devServer.app.get('/', (_req, res) => res.redirect(302, '/dashboard'));
      return m;
    },
  },

  plugins: [ ...base.plugins ],
};
