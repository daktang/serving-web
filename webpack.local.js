// 로컬(http://localhost:3000) → 개발 포털 프록시 (필요 최소 + 리다이렉트 고정)
const base = require('./webpack.dev.js');

const PORTAL    = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW  = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL_ORIGIN = 'http://localhost:3000';

// 업스트림 301/302 Location이 portal로 가리키면 localhost로 바꿔서 계속 프록시 타게 함
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

// /coreproxy 경로 정규화:
// - /coreproxy 중복 제거
// - 마지막 vN만 유지 → /api/vN/...
// - 버전이 없으면 /api/ + 나머지
// - /api/api 중복 제거
function rewriteCore(path) {
  let p = path;

  // 모든 /coreproxy/ 제거
  p = p.replace(/\/coreproxy\/+/g, '/');

  // 슬래시 정규화
  p = p.replace(/\/+/g, '/');
  if (p[0] !== '/') p = '/' + p;

  // 마지막 /v\d+/ 기준으로 tail 계산
  const vers = p.match(/\/v\d+\//g);
  if (vers && vers.length) {
    const last = vers[vers.length - 1].slice(1, -1); // e.g., 'v3'
    const idx = p.lastIndexOf('/' + last + '/');
    const tail = p.slice(idx + last.length + 2);      // after '/vN/'
    return `/api/${last}/${tail}`;
  }

  // 버전이 없으면 /api/ 접두
  if (p.startsWith('/api/')) {
    return p.replace(/\/api(\/api)+\//, '/api/');
  }
  return '/api/' + p.replace(/^\/+/, '');
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
      '/api':       { ...common },                  // → https://portal.../api/**
      '/ext-dit':   { ...common },                  // → https://portal.../ext-dit/**
      '/models':    { ...common },
      '/serving':   { ...common },
      '/authservice': { ...common },
      '/socket.io': { ...common, ws: true },

      // B 스타일 프리픽스
      '/coreproxy': { ...common, pathRewrite: rewriteCore },
      '/extproxy':  { ...common, pathRewrite: { '^/extproxy': '/ext-dit/api' } },

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
