window.config = {
  namespace: 'aiserving-system',
  rootContext: '',

  metadata: { name: 'FrontendConfigmap' },

  apiGateway: {
    base_url_V2: '//portal.aiserving.dev.aip.domain.net/api/v2/',
    dit_ext_base_url_V1: '//portal.aiserving.dev.aip.domain.net/ext-dit/api/v1/',
    modelWebBackendUrl: '//portal.aiserving.dev.aip.domain.net/models'
  },
  coreApiUrl: '//portal.aiserving.dev.aip.domain.net/api/',

  kubeflowLogout:
    'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout?client_id=serve&post_logout_redirect_uri=http://localhost:3000/after-logout/logout',

  sessionCheckInterval: 60,
  deploymentName: ['ASP-DIT'],
  disableActionHistory: 'true',
  defaultAffinityConfig: 'servingPool',

  kubeflowURL: '/kubeflowproxy/',
  kubeflowBaseUrl: 'portal.aiserving.dev.aip.domain.net',

  servingExtBaseUrl: '//portal.aiserving.dev.aip.domain.net/serving',

  applicationName: 'AIP Serve',
  applicationSubName: '',
  applicationRelease: 'Release 2.0.0 | 2025.8.',
  applicationTitle: 'AIP Serve',

  buildId: 'dev-local',
  commitHash: 'local'
}