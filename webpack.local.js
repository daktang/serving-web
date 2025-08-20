// webpack.local.js — 로컬(http://localhost:3000) → 개발 포털 프록시
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL    = 'http://localhost:3000';

// 30x Location이 portal로 향하면 localhost로 고정(리다이렉트도 프록시 경유)
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

// /coreproxy 정규화: 중복 coreproxy 제거, 마지막 vN 유지 → /api/vN/..., 버전 없으면 /api/ 접두
function rewriteCore(path) {
  let p = path.replace(/\/coreproxy(\/|$)/g, '/').replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = '/' + p;
  const vers = [...p.matchAll(/\/v(\d+)\//g)];
  if (vers.length > 0) {
    const last = vers[vers.length - 1][1]; // 숫자
    const marker = `/v${last}/`;
    const idx = p.lastIndexOf(marker);
    const tail = p.slice(idx + marker.length);
    return `/api/v${last}/${tail}`;
  }
  if (p.startsWith('/api/')) return p.replace(/\/api(\/api)+\//, '/api/');
  return '/api' + (p.startsWith('/') ? '' : '/') + p.replace(/^\/+/, '');
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
      '/api':         { ...common },
      '/ext-dit':     { ...common },
      '/models':      { ...common },
      '/serving':     { ...common },
      '/authservice': { ...common },
      '/socket.io':   { ...common, ws: true },

      // B 스타일 프리픽스
      '/coreproxy':   { ...common, pathRewrite: rewriteCore },
      '/extproxy':    { ...common, pathRewrite: { '^/extproxy': '/ext-dit/api' } },

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
