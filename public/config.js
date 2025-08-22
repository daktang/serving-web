// 런타임 구성 값 (window.config)에 주입된다.
// 앱은 여기 값을 읽어서 각 서비스 엔드포인트를 결정한다.
window.config = {
  // 공통 메타
  namespace: 'aiserving-system',
  rootContext: '',
  metadata: { name: 'FrontendConfigmap' },

  // 게이트웨이 프리픽스 (브라우저는 반드시 localhost:3000 상대 경로로 호출)
  apiGateway: {
    base_url_V2: '/coreproxy/',      // 코어 API 계열의 프리픽스(프론트 기준). devServer가 포털로 프록시 + 정규화
    dit_ext_base_url_V1: '/extproxy/',// 외부 DIT 확장 API 프리픽스(프론트 기준). 프록시에서 /ext-dit/api 로 매핑
    modelWebBackendUrl: '/models',    // 모델 백엔드 라우트 프리픽스 (프론트 기준)
    // 추가: 메뉴 관련 API도 coreproxy를 통하도록 명시적 설정
    menuApiUrl: '/coreproxy/v2/'      // 메뉴 관련 API 프리픽스
  },

  // 레거시 호환(내부에서 참조할 수 있음). 동일하게 /coreproxy 사용.
  coreApiUrl: '/coreproxy/v2/',

  // 로그아웃 후 복귀 경로
  // - Keycloak의 OIDC 로그아웃 엔드포인트로 이동하고, post_logout_redirect_uri로 로컬을 준다.
  // - devServer의 Location 고정(onProxyRes) + 프론트 상대경로 정책 덕분에 CORS 없이 동작.
  kubeflowLogout:
    'https://auth.dev.aip.domain.net/auth/realms/aiplatform/protocol/openid-connect/logout'
    + '?client_id=serve&post_logout_redirect_uri='
    + encodeURIComponent('http://localhost:3000/after-logout/logout'),

  // 세션 체크 주기(초) — 토큰 갱신/세션 상태 체크 등에 사용될 수 있음
  sessionCheckInterval: 60,

  // 배포 타깃/기능 플래그류
  deploymentName: ['ASP-DIT'],
  disableActionHistory: 'true',
  defaultAffinityConfig: 'servingPool',

  // Kubeflow 접근 경로
  kubeflowURL: '/kubeflowproxy/',       // 프론트 기준 프록시 프리픽스
  kubeflowBaseUrl: 'localhost:3000/kubeflowproxy', // (주의) 프로토콜 미포함. 필요시 'http://localhost:3000/kubeflowproxy'로 바꾸면 명시적.

  // 기타 라우트
  servingExtBaseUrl: '/serving',

  // UI 표시용
  applicationName: 'AIP Serve',
  applicationSubName: '',
  applicationRelease: 'Release 2.0.0 | 2025.8.',
  applicationTitle: 'AIP Serve',

  // 빌드 정보
  buildId: 'dev-local',
  commitHash: 'local'
};
