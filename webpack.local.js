// 로컬(http://localhost:3000) → 개발 포털 프록시
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const AUTH     = 'auth.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL    = 'localhost:3000';

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

// /coreproxy → /api (중복/버전/혼입 보정)
const rewriteCore = (p) => {
  p = p.replace(/\/coreproxy(\/+coreproxy)+/g, '/coreproxy');
  const m = p.match(/\/extproxy\/(?:(api\/v\d+\/|v\d+\/))?(.+)/);
  if (m) {
    const ver  = m[1] ? (m[1].startsWith('api/') ? m[1] : `api/${m[1]}`) : 'api/v1/';
    const tail = m[2];
    return `/ext-dit/${ver}${tail}`;
  }
  p = p.replace(/^\/coreproxy\/+/, '/api/').replace(/\/api(\/api)+\//, '/api/');
  const vs = p.match(/\/v\d+\//g);
  if (vs && vs.length) {
    const last = vs[vs.length - 1].slice(1, -1);
    const tail = p.split(new RegExp(`/${last}/`)).pop();
    return `/api/${last}/${tail}`;
  }
  return p;
};
// /extproxy → /ext-dit/api
const rewriteExt = (p) => {
  p = p.replace(/\/extproxy(\/+extproxy)+/g, '/extproxy');
  const vs = p.match(/\/v\d+\//g);
  if (vs && vs.length) {
    const last = vs[vs.length - 1].slice(1, -1);
    const tail = p.split(new RegExp(`/${last}/`)).pop();
    return `/ext-dit/api/${last}/${tail}`;
  }
  return p.replace(/^\/extproxy\/+/, '/ext-dit/api/');
};
// /api, /ext-dit 직접 경로 패스스루
const rewriteApi    = (p) => p.replace(/^\/api\/+/, '/api/');
const rewriteExtDit = (p) => p.replace(/^\/ext-dit\/+/, '/ext-dit/');

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
    port: 3000,
    client: { logging: 'verbose', webSocketURL: { protocol: 'ws', hostname: 'localhost', port: '3000', pathname: '/ws' } },
    proxy: {
      '/coreproxy': { ...commonPortalProxy, pathRewrite: rewriteCore },
      '/extproxy':  { ...commonPortalProxy, pathRewrite: rewriteExt },

      '/api':       { ...commonPortalProxy, pathRewrite: rewriteApi },
      '/ext-dit':   { ...commonPortalProxy, pathRewrite: rewriteExtDit },

      '/models':  { ...commonPortalProxy },
      '/serving': { ...commonPortalProxy },

      '/authproxy': {
        ...commonPortalProxy,
        pathRewrite: { '^/authproxy': '/authservice' },
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },
      '/authservice': {
        ...commonPortalProxy,
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },

      '/socket.io': { ...commonPortalProxy, ws: true },

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
