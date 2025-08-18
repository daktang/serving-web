// 로컬(http://localhost:3000) → 개발 포털 프록시 (리다이렉트 Location만 로컬로 고정)
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';
const LOCAL_ORIGIN = 'http://localhost:3000';

// 업스트림이 Location: https://portal... 으로 보내면 → http://localhost:3000/ 같은 경로로 바꿔치기
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
      // 직접 호출도 프록시 태움
      '/api':       { ...common },                 // → https://portal.../api/**
      '/ext-dit':   { ...common },                 // → https://portal.../ext-dit/**
      '/models':    { ...common },
      '/serving':   { ...common },
      '/authservice': { ...common },
      '/socket.io': { ...common, ws: true },

      // B 스타일 프리픽스도 유지
      '/coreproxy': { ...common, pathRewrite: { '^/coreproxy': '/api' } },
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
