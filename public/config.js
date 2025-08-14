// public/config.js
window.config = {
  namespace: 'aiserving-system',
  rootContext: '',

  metadata: { name: 'FrontendConfigmap' },

  apiGateway: {
    base_url_V2: '/api/v2/',                 // -> proxy -> https://portal.aiserving.dev.aip.domain.net/api/v2/
    dit_ext_base_url_V1: '/ext-dit/api/v1/', // -> proxy -> https://portal.aiserving.dev.aip.domain.net/ext-dit/api/v1/
    modelWebBackendUrl: '/models'            // -> proxy -> https://portal.aiserving.dev.aip.domain.net/models
  },
  coreApiUrl: '/api/',                        // -> proxy -> https://portal.aiserving.dev.aip.domain.net/api/

  // 로그아웃 후 로컬로 복귀 (URL-encode된 redirect)
  kubeflowLogout:
    'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout?client_id=serve&post_logout_redirect_uri=http://localhost:3000/after-logout/logout',

  sessionCheckInterval: 60,
  deploymentName: ['ASP-DIT'],
  disableActionHistory: 'true',
  defaultAffinityConfig: 'servingPool',

  kubeflowURL: '/kubeflowproxy/',
  kubeflowBaseUrl: 'localhost:3000/kubeflowproxy',

  servingExtBaseUrl: '/serving',              // -> proxy -> https://portal.../serving

  applicationName: 'AIP Serve',
  applicationSubName: '',
  applicationRelease: 'Release 2.0.0 | 2025.8.',
  applicationTitle: 'AIP Serve',

  buildId: 'dev-local',
  commitHash: 'local'
};
