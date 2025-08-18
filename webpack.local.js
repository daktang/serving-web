// webpack.local.js
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

// ✅ 핵심: /coreproxy 경로 정규화
const rewriteCore = (p) => {
  // 중복 coreproxy 접두사 제거
  p = p.replace(/\/coreproxy(\/+coreproxy)+/g, '/coreproxy');
  // 마지막 버전(vN)을 찾아서 /api/vN/ 이하만 보존
  const versions = p.match(/\/v\d+\//g);
  if (versions && versions.length) {
    const lastV = versions[versions.length - 1].slice(1, -1); // 'v3'
    const tail = p.split(new RegExp(`/${lastV}/`)).pop();      // 'authenticate' 등
    return `/api/${lastV}/${tail}`;
  }
  // 버전 없으면 /api/로 치환
  return p.replace(/^\/coreproxy\/+/, '/api/');
};

// ✅ /extproxy도 동일 전략(마지막 vN만 유지)
const rewriteExt = (p) => {
  p = p.replace(/\/extproxy(\/+extproxy)+/g, '/extproxy');
  const versions = p.match(/\/v\d+\//g);
  if (versions && versions.length) {
    const lastV = versions[versions.length - 1].slice(1, -1);
    const tail = p.split(new RegExp(`/${lastV}/`)).pop();
    return `/ext-dit/api/${lastV}/${tail}`;
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
      // 🔧 여기만 보면 됨
      '/coreproxy': { ...commonPortalProxy, pathRewrite: rewriteCore },
      '/extproxy':  { ...commonPortalProxy, pathRewrite: rewriteExt },

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

      '/socket.io':  { ...commonPortalProxy, ws: true },

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
