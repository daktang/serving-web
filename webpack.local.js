/**
 * README — 로컬 개발 프록시 매핑 요약 (복붙용 단일 파일)
 *
 * 목적: 프론트만 로컬(HTTP, http://localhost:3000)에서 동작하고,
 *       백엔드/인증/KF는 개발 환경으로 그대로 프록시. (config.js / index.html 수정 불필요)
 *
 * ── 매핑 표 ────────────────────────────────────────────────────────────────
 * | 로컬 경로                           | 업스트림(실제 타겟)                               | 비고                          |
 * |-------------------------------------|---------------------------------------------------|-------------------------------|
 * | /coreproxy/**                       | https://portal.../api/**                          | 중복/버전 정규화, 혼입 처리   |
 * | /extproxy/**                        | https://portal.../ext-dit/api/**                  | 버전 정규화                   |
 * | /api/**                             | https://portal.../api/**                          | 직접 경로 패스스루            |
 * | /ext-dit/**                         | https://portal.../ext-dit/**                      | 직접 경로 패스스루            |
 * | /authproxy/**                       | https://portal.../authservice/**                  | redirect_uri/쿠키 재작성      |
 * | /authservice/**                     | https://portal.../authservice/**                  | 동일 재작성                   |
 * | /models/**, /serving/**             | https://portal.../(동일 경로)                     | 그대로 전달                   |
 * | /socket.io/**                       | https://portal.../socket.io/**                    | WebSocket(ws: true)           |
 * | /kubeflowproxy/**                   | https://kubeflow.../**                            | ^/kubeflowproxy → /           |
 *
 * ── 정규화 핵심 ───────────────────────────────────────────────────────────
 * - /coreproxy → /api
 *   · /coreproxy 중복 제거
 *   · 경로 내 vN이 여러 번이면 **마지막 vN만 유지**  (/coreproxy/v2/.../v3/x → /api/v3/x)
 *   · 혼입 처리: /coreproxy/.../extproxy/... → **/ext-dit/api/v1/...** 로 강제 (버전 없으면 v1)
 * - /extproxy → /ext-dit/api
 *   · /extproxy/vN/... → /ext-dit/api/vN/...
 *   · 버전 없으면 /ext-dit/api/...
 *
 * ── 인증/쿠키(HTTP 모드) ─────────────────────────────────────────────────
 * - 302(Location)의 redirect_uri를 http://localhost:3000/authproxy/oidc/callback 으로 강제
 * - Location의 절대 portal URL을 로컬로 치환
 * - Set-Cookie: Domain 제거(host-only), Path=/, Secure 제거, SameSite=None→Lax
 *
 * ── 예시 ─────────────────────────────────────────────────────────────────
 * GET http://localhost:3000/api/v2/menu/side-menu/detail?role_id=2
 *  → https://portal.aiserving.dev.aip.domain.net/api/v2/menu/side-menu/detail?role_id=2
 */

const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const AUTH     = 'auth.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL    = 'localhost:3000';

// ─ helpers ─
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

// ─ path rewrites ─
// /coreproxy -> /api  (중복 coreproxy 제거, extproxy 혼입 처리, 마지막 vN 유지)
const rewriteCore = (p) => {
  p = p.replace(/\/coreproxy(\/+coreproxy)+/g, '/coreproxy');
  // 혼입: /coreproxy/.../extproxy/... → /ext-dit/api/v1/...
  const m = p.match(/\/extproxy\/(?:(api\/v\d+\/|v\d+\/))?(.+)/);
  if (m) {
    const ver  = m[1] ? (m[1].startsWith('api/') ? m[1] : `api/${m[1]}`) : 'api/v1/';
    const tail = m[2];
    return `/ext-dit/${ver}${tail}`;
  }
  // 일반: /coreproxy → /api, /api/api 중복 제거
  p = p.replace(/^\/coreproxy\/+/, '/api/').replace(/\/api(\/api)+\//, '/api/');
  const vs = p.match(/\/v\d+\//g);
  if (vs && vs.length) {
    const last = vs[vs.length - 1].slice(1, -1); // 'v3'
    const tail = p.split(new RegExp(`/${last}/`)).pop();
    return `/api/${last}/${tail}`;
  }
  return p;
};
// /extproxy -> /ext-dit/api (마지막 vN 유지)
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
// 직접 경로 패스스루(/api, /ext-dit) — CORS 회피용
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

// ─ devServer ─
module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000, // HTTP
    client: {
      logging: 'verbose',
      webSocketURL: { protocol: 'ws', hostname: 'localhost', port: '3000', pathname: '/ws' }
    },
    proxy: {
      // 프리픽스
      '/coreproxy': { ...commonPortalProxy, pathRewrite: rewriteCore },
      '/extproxy':  { ...commonPortalProxy, pathRewrite: rewriteExt },

      // 직접 경로도 허용(사이드메뉴 등에서 /api 바로 칠 때)
      '/api':       { ...commonPortalProxy, pathRewrite: rewriteApi },
      '/ext-dit':   { ...commonPortalProxy, pathRewrite: rewriteExtDit },

      // 그대로 전달
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

      // WebSocket
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
