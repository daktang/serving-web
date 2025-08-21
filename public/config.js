// public/config.js
window.config = {
  namespace: 'aiserving-system',
  rootContext: '',
  metadata: { name: 'FrontendConfigmap' },

  // B-스타일 프리픽스(브라우저는 localhost만 칩니다)
  apiGateway: {
    base_url_V2: '/coreproxy/',
    dit_ext_base_url_V1: '/extproxy/',
    modelWebBackendUrl: '/models'
  },
  coreApiUrl: '/coreproxy/',

  // 로그아웃 후 로컬로 복귀(HTTP)
  kubeflowLogout:
    'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout'
    + '?client_id=serve&post_logout_redirect_uri='
    + encodeURIComponent('http://localhost:3000/after-logout/logout'),

  sessionCheckInterval: 60,
  deploymentName: ['ASP-DIT'],
  disableActionHistory: 'true',
  defaultAffinityConfig: 'servingPool',

  kubeflowURL: '/kubeflowproxy/',
  kubeflowBaseUrl: 'http://localhost:3000/kubeflowproxy', // ← 프로토콜 추가

  servingExtBaseUrl: '/serving',

  applicationName: 'AIP Serve',
  applicationSubName: '',
  applicationRelease: 'Release 2.0.0 | 2025.8.',
  applicationTitle: 'AIP Serve',

  buildId: 'dev-local',
  commitHash: 'local'
};
