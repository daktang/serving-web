// webpack.local.js
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const AUTH     = 'auth.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL    = 'localhost:3000';

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

// ✅ coreproxy 정규화 (authenticate는 그대로, extproxy 혼입만 특수 처리)
const rewriteCore = (p) => {
  // coreproxy 중복 제거
  p = p.replace(/\/coreproxy(\/+coreproxy)+/g, '/coreproxy');

  // coreproxy 안에 extproxy가 섞여 들어온 케이스 → ext-dit로 강제
  // 예: /coreproxy/v2/extproxy/dit/user-consent → /ext-dit/api/v1/dit/user-consent
  const m = p.match(/\/extproxy\/(?:(api\/v\d+\/|v\d+\/))?(.+)/);
  if (m) {
    const ver = m[1]
      ? (m[1].startsWith('api/') ? m[1] : `api/${m[1]}`) // v3 → api/v3/
      : 'api/v1/';                                       // 버전 없으면 v1
    const tail = m[2];
    return `/ext-dit/${ver}${tail}`;
  }

  // 일반 코어 API: /coreproxy → /api , 마지막 vN만 유지
  p = p.replace(/^\/coreproxy\/+/, '/api/').replace(/\/api(\/api)+\//, '/api/');
  const vs = p.match(/\/v\d+\//g);
  if (vs && vs.length) {
    const last = vs[vs.length - 1].slice(1, -1);           // 'v3'
    const tail = p.split(new RegExp(`/${last}/`)).pop();    // 'authenticate' 등
    return `/api/${last}/${tail}`;
  }
  return p; // 버전 없으면 /api/ 그대로
};

// extproxy 정규화 (마지막 vN 유지)
const rewriteExt  = (p) => {
  p = p.replace(/\/extproxy(\/+extproxy)+/g, '/extproxy');
  const vs = p.match(/\/v\d+\//g);
  if (vs && vs.length) {
    const last = vs[vs.length - 1].slice(1, -1);
    const tail = p.split(new RegExp(`/${last}/`)).pop();
    return `/ext-dit/api/${last}/${tail}`;
  }
  return p.replace(/^\/extproxy\/+/, '/ext-dit/api/');
};

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
      // 프리픽스
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
      '/authservice': {
        ...commonPortalProxy,
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },

      // socket.io
      '/socket.io':  { ...commonPortalProxy, ws: true },

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
