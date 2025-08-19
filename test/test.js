// webpack.local.js — 로컬(http://localhost:3000) → 개발 포털 프록시 (미니멀)
const base = require('./webpack.dev.js');

const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';

const common = {
  target: `https://${PORTAL}`,
  changeOrigin: true,
  secure: false,
  headers: { Host: PORTAL },
  cookieDomainRewrite: { [PORTAL]: '' },
};

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,
    client: { logging: 'verbose' },

    proxy: {
      // 앱이 직접 치는 경로들
      '/api':         { ...common },                 // → https://portal.../api/**
      '/ext-dit':     { ...common },                 // → https://portal.../ext-dit/**
      '/models':      { ...common },
      '/serving':     { ...common },
      '/authservice': { ...common },                 // 세션 주입 전제, 리라이트 없음
      '/socket.io':   { ...common, ws: true },

      // B 스타일 프리픽스 유지 (상대 경로로만 호출한다는 전제)
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
