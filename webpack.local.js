// 로컬(http://localhost:3000) → 개발 포털 프록시
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL    = 'http://localhost:3000';

// 30x Location이 portal로 향하면 localhost로 고정(리다이렉트도 프록시 경유 유지)
function rewriteLocationToLocal(proxyRes) {
  const loc = proxyRes.headers['location'];
  if (!loc) return;
  try {
    const u = new URL(loc);
    if (u.hostname === PORTAL) {
      proxyRes.headers['location'] = `${LOCAL}${u.pathname}${u.search}${u.hash}`;
    }
  } catch (_) {}
}

// ── 핵심: /coreproxy 정규화 (과거 해결본 재적용) ──────────────────────────
// 예) /coreproxy/v2/coreproxy/v3/authenticate → /api/v3/authenticate
function coreRewriter(path) {
  let p = path;

  // 0) authenticate 특수 케이스: 흔히 중복 프리픽스가 들어오는 엔드포인트를 먼저 정리
  if (/^\/coreproxy\/.+\/authenticate(\b|\/|\?)/.test(p)) {
    // 가장 마지막 vN만 유지
    const vers = [...p.matchAll(/\/v(\d+)\//g)];
    if (vers.length > 0) {
      const last = vers[vers.length - 1][1];
      const idx  = p.lastIndexOf(`/v${last}/`);
      const tail = p.slice(idx + (`/v${last}/`).length); // authenticate...
      return `/api/v${last}/${tail}`;
    }
    // 버전이 없으면 v3 가정 불가 → /api/ 로만 보냄
    return p.replace(/^\/coreproxy\/+/, '/api/');
  }

  // 1) 모든 /coreproxy 토큰 제거
  p = p.replace(/\/coreproxy(\/|$)/g, '/');

  // 2) 슬래시 정리
  p = p.replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = '/' + p;

  // 3) 마지막 버전 vN만 채택 → /api/vN/<tail>
  const vers = [...p.matchAll(/\/v(\d+)\//g)];
  if (vers.length > 0) {
    const last = vers[vers.length - 1][1]; // 숫자만
    const marker = `/v${last}/`;
    const idx = p.lastIndexOf(marker);
    const tail = p.slice(idx + marker.length);
    return `/api/v${last}/${tail}`;
  }

  // 4) 버전이 없으면 /api/ 접두, /api/api 중복 방지
  if (p.startsWith('/api/')) return p.replace(/\/api(\/api)+\//, '/api/');
  return '/api' + (p.startsWith('/') ? '' : '/') + p.replace(/^\/+/, '');
}

// /extproxy → /ext-dit/api (간단 매핑)
function extRewriter(path) {
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
      // 상대 경로 직접 호출 (그대로 패스스루)
      '/api':         { ...common },
      '/ext-dit':     { ...common },
      '/models':      { ...common },
      '/serving':     { ...common },
      '/authservice': { ...common },
      '/socket.io':   { ...common, ws: true },

      // B 스타일 프리픽스 (여기가 핵심)
      // http-proxy-middleware 버전 차 대비: pathRewrite와 rewrite 둘 다 지정
      '/coreproxy': { 
        ...common, 
        pathRewrite: coreRewriter,
        rewrite: coreRewriter
      },
      '/extproxy':  { 
        ...common, 
        pathRewrite: extRewriter,
        rewrite: extRewriter
      },

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
