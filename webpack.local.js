// webpack.local.js — 과거 인증 OK 버전 복구 (coreproxy 정규화 + OIDC 리다이렉트/쿠키 처리 + 리다이렉트 고정)
const base = require('./webpack.dev.js');

const PORTAL        = 'portal.aiserving.dev.aip.domain.net';
const AUTH          = 'auth.dev.aip.domain.net';
const KUBEFLOW      = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL_ORIGIN  = 'http://localhost:3000';

// 30x Location이 portal로 향하면 localhost로 고정(리다이렉트도 프록시 경유 유지)
function rewriteLocationToLocal(proxyRes) {
  const loc = proxyRes.headers['location'];
  if (!loc) return;
  try {
    const u = new URL(loc);
    if (u.hostname === PORTAL) {
      proxyRes.headers['location'] = `${LOCAL_ORIGIN}${u.pathname}${u.search}${u.hash}`;
    }
  } catch (_) {}
}

// Keycloak redirect_uri를 로컬 콜백으로 고정 (인증 플로우 유지)
function rewriteRedirectUriToLocal(proxyRes) {
  const loc = proxyRes.headers['location'];
  if (!loc) return;
  try {
    const u = new URL(loc);
    if (u.hostname === AUTH) {
      const ru = u.searchParams.get('redirect_uri');
      if (ru) {
        const r = new URL(ru);
        r.protocol = 'http:'; r.host = 'localhost:3000'; r.pathname = '/authproxy/oidc/callback';
        u.searchParams.set('redirect_uri', r.toString());
        proxyRes.headers['location'] = u.toString();
      }
    }
  } catch (_) {}
}

// Set-Cookie를 로컬에 맞게(도메인 제거, Path=/, Secure 제거, SameSite=Lax)
function rewriteSetCookie(proxyRes) {
  const sc = proxyRes.headers['set-cookie'];
  if (!sc) return;
  const arr = Array.isArray(sc) ? sc : [sc];
  proxyRes.headers['set-cookie'] = arr.map(v =>
    v.replace(new RegExp(`Domain=${PORTAL}`, 'i'), 'Domain=')
     .replace(/Path=\/authservice/gi, 'Path=/')
     .replace(/;\s*Secure/gi, '')
     .replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
  );
}

// /coreproxy 정규화 (과거 해결본): 중복 coreproxy 제거, 마지막 vN 유지 → /api/vN/..., 버전 없으면 /api/ 접두
// 예) /coreproxy/v2/coreproxy/v3/authenticate → /api/v3/authenticate
function rewriteCore(path) {
  let p = path;

  // (1) 모든 /coreproxy 토큰 제거
  p = p.replace(/\/coreproxy(\/|$)/g, '/');

  // (2) 슬래시 정리
  p = p.replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = '/' + p;

  // (3) 마지막 버전 vN만 채택 → /api/vN/<tail>
  const vers = [...p.matchAll(/\/v(\d+)\//g)];
  if (vers.length > 0) {
    const last = vers[vers.length - 1][1]; // 숫자만
    const marker = `/v${last}/`;
    const idx = p.lastIndexOf(marker);
    const tail = p.slice(idx + marker.length);
    return `/api/v${last}/${tail}`;
  }

  // (4) 버전이 없으면 /api/ 접두, /api/api 중복 방지
  if (p.startsWith('/api/')) return p.replace(/\/api(\/api)+\//, '/api/');
  return '/api' + (p.startsWith('/') ? '' : '/') + p.replace(/^\/+/, '');
}

// /extproxy → /ext-dit/api (간단 매핑)
function rewriteExt(path) {
  return path.replace(/^\/extproxy/, '/ext-dit/api');
}

const common = {
  target: `https://${PORTAL}`,
  changeOrigin: true,
  secure: false,
  headers: { Host: PORTAL },
  cookieDomainRewrite: { [PORTAL]: '' },
  onProxyRes: rewriteLocationToLocal,
};

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,
    client: { logging: 'verbose' },
    proxy: {
      // 상대 경로 직접 호출
      '/api':         { ...common },                 // → https://portal.../api/**
      '/ext-dit':     { ...common },                 // → https://portal.../ext-dit/**
      '/models':      { ...common },
      '/serving':     { ...common },
      '/socket.io':   { ...common, ws: true },

      // 인증(과거 동작 복구)
      '/authproxy': {
        ...common,
        pathRewrite: { '^/authproxy': '/authservice' },
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },
      '/authservice': {
        ...common,
        cookiePathRewrite: { '/authservice': '/', '/': '/' },
        onProxyRes(res) { rewriteRedirectUriToLocal(res); rewriteLocationToLocal(res); rewriteSetCookie(res); },
      },

      // B 스타일 프리픽스 (핵심: coreproxy 정규화)
      '/coreproxy':   { ...common, pathRewrite: rewriteCore },
      '/extproxy':    { ...common, pathRewrite: rewriteExt },

      // Kubeflow
      '/kubeflowproxy': {
        target: `https://${KUBEFLOW}`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/kubeflowproxy': '/' },
        cookieDomainRewrite: { [KUBEFLOW]: '' },
      },
    },
  },
};
