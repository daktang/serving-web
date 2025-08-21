// 로컬 개발 프론트(http://localhost:3000)에서 요청을 받으면
// → 개발 포털(https://portal.aiserving.dev.aip.domain.net)로 프록시해 주는 설정.
// authenticate/리다이렉트/중복 coreproxy 정규화까지 포함.
// ※ 이 파일은 "롤백본 그대로"이며, 동작을 설명하는 주석만 추가함.

const base = require('./webpack.dev.js');

// 개발 환경의 실제 외부 호스트들
const PORTAL   = 'portal.aiserving.dev.aip.domain.net';
const KUBEFLOW = 'kubeflow.aiserving.dev.aip.domain.net';

// 로컬 프론트 호스트 (리다이렉트 Location을 로컬로 고정시키는 데 사용)
const LOCAL    = 'http://localhost:3000';

/**
 * 30x 리다이렉트가 포털로 날아갈 때, Location 헤더를 로컬로 바꿔치기.
 * - 예: Location: https://portal.../path → http://localhost:3000/path
 * - 이렇게 해야 리다이렉트 중에도 계속 프록시를 타므로 CORS가 생기지 않음.
 */
function rewriteLocationToLocal(proxyRes) {
  const loc = proxyRes.headers['location'];
  if (!loc) return;
  try {
    const u = new URL(loc);
    if (u.hostname === PORTAL) {
      proxyRes.headers['location'] = `${LOCAL}${u.pathname}${u.search}${u.hash}`;
    }
  } catch (_) {
    // URL 파싱 실패 시 무시
  }
}

/**
 * coreRewriter: /coreproxy 경로를 포털에 보낼 때 정규화한다.
 * - 중복된 /coreproxy 토큰 제거
 * - vN(버전)이 여러 번 붙어도 "마지막 vN"만 유지
 * - 최종 목적지는 /api/v{마지막}/<tail> 형태가 되도록 재작성
 *
 * 예)
 *   /coreproxy/v2/coreproxy/v3/authenticate  →  /api/v3/authenticate
 *   /coreproxy/v3/resource-summary           →  /api/v3/resource-summary
 *
 * 주의)
 *   authenticate는 특수 케이스로 먼저 처리해 주고,
 *   그 외는 공통 정규화 규칙이 적용된다.
 */
function coreRewriter(path) {
  let p = path;

  // 0) authenticate 특수 케이스: 마지막 vN만 유지해서 /api/vN/authenticate 로 보냄
  if (/^\/coreproxy\/.+\/authenticate(\b|\/|\?)/.test(p)) {
    const vers = [...p.matchAll(/\/v(\d+)\//g)];
    if (vers.length > 0) {
      const last = vers[vers.length - 1][1];          // 마지막 버전 번호 (숫자)
      const idx  = p.lastIndexOf(`/v${last}/`);
      const tail = p.slice(idx + (`/v${last}/`).length);
      return `/api/v${last}/${tail}`;                 // 최종: /api/v{last}/authenticate
    }
    // 버전 표시가 전혀 없다면 /coreproxy 접두만 /api로 치환
    return p.replace(/^\/coreproxy\/+/, '/api/');
  }

  // 1) 모든 /coreproxy 토큰 제거 (중복 제거)
  p = p.replace(/\/coreproxy(\/|$)/g, '/');

  // 2) 슬래시 정리 (// → /)
  p = p.replace(/\/{2,}/g, '/');
  if (!p.startsWith('/')) p = '/' + p;

  // 3) 버전이 하나 이상 있다면 "마지막 vN" 기준으로 /api/vN/<tail> 로 재작성
  const vers = [...p.matchAll(/\/v(\d+)\//g)];
  if (vers.length > 0) {
    const last = vers[vers.length - 1][1];
    const marker = `/v${last}/`;
    const idx = p.lastIndexOf(marker);
    const tail = p.slice(idx + marker.length);
    return `/api/v${last}/${tail}`;
  }

  // 4) 버전이 전혀 없으면 /api/ 접두만 추가 (/api/api 중복 방지)
  if (p.startsWith('/api/')) return p.replace(/\/api(\/api)+\//, '/api/');
  return '/api' + (p.startsWith('/') ? '' : '/') + p.replace(/^\/+/, '');
}

/**
 * extRewriter: /extproxy → /ext-dit/api 로 단순 매핑
 * - 프론트는 /extproxy 로 호출해도 되고, 프록시가 /ext-dit/api 로 바꿔서 포털에 전달
 */
function extRewriter(path) {
  return path.replace(/^\/extproxy/, '/ext-dit/api');
}

// 공통 프록시 옵션: 포털로 TLS 프록시, Host 헤더/쿠키 도메인 재작성, 리다이렉트 로컬 고정 등
const common = {
  target: `https://${PORTAL}`,              // 포털로 프록시
  changeOrigin: true,                       // Host 헤더를 target 기반으로 변경 (CORS 회피에 유리)
  secure: false,                            // 사설 인증서 등일 경우 허용
  headers: { Host: PORTAL },                // 명시적으로 Host 지정
  cookieDomainRewrite: { [PORTAL]: '' },    // Set-Cookie의 Domain=portal... → 빈 값(현재 오리진)으로 재작성
  onProxyRes: rewriteLocationToLocal,       // 30x 리다이렉트 Location을 로컬로 고정
  logLevel: 'debug',
};

module.exports = {
  ...base,
  devServer: {
    ...base.devServer,
    host: 'localhost',
    port: 3000,
    client: { logging: 'verbose' },         // 개발 중 프록시 로그 보기 좋게

    // 프록시 라우팅 테이블
    proxy: {
      // 1) /api, /ext-dit, /models, /serving, /authservice, /socket.io 는 그대로 포털로 패스스루
      '/api':         { ...common },
      '/ext-dit':     { ...common },
      '/models':      { ...common },
      '/serving':     { ...common },
      '/authservice': { ...common },
      '/socket.io':   { ...common, ws: true },  // 웹소켓

      // 2) /coreproxy: "중복 coreproxy 제거 + 마지막 vN 유지" 정규화 (핵심)
      //    http-proxy-middleware 버전 호환 위해 pathRewrite + rewrite 모두 지정
      '/coreproxy': {
        ...common,
        pathRewrite: coreRewriter,
        rewrite: coreRewriter,
      },

      // 3) /extproxy: /ext-dit/api 로 단순 매핑
      '/extproxy':  {
        ...common,
        pathRewrite: extRewriter,
        rewrite: extRewriter,
      },

      // 4) Kubeflow 대시보드 등 프록시
      '/kubeflowproxy': {
        target: `https://${KUBEFLOW}`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/kubeflowproxy': '/' },
        cookieDomainRewrite: { [KUBEFLOW]: '' },
        logLevel: 'debug',
      },

      // 5) 캐치올 프록시: portal 도메인으로 직접 요청하는 경우 대비
      '**': {
        target: `https://${PORTAL}`,
        changeOrigin: true,
        secure: false,
        headers: { Host: PORTAL },
        cookieDomainRewrite: { [PORTAL]: '' },
        onProxyRes: rewriteLocationToLocal,
        context: function(pathname, req) {
          console.log(`[PROXY DEBUG] Checking request: ${pathname}, Host: ${req.headers.host}, Referer: ${req.headers.referer}`);
          const requestHost = req.headers.host;
          const refererHost = req.headers.referer ? new URL(req.headers.referer).hostname : null;
          const shouldProxy = requestHost === PORTAL || refererHost === PORTAL;
          console.log(`[PROXY DEBUG] Should proxy: ${shouldProxy}`);
          return shouldProxy;
        },
        pathRewrite: function (path, req) {
          console.log(`[PROXY DEBUG] Original path: ${path}`);
          const portalRegex = new RegExp(`^https?:\/\/${PORTAL}`);
          const rewrittenPath = path.replace(portalRegex, '');
          console.log(`[PROXY DEBUG] Rewritten path: ${rewrittenPath}`);
          return rewrittenPath;
        },
        logLevel: 'debug',
      },
    },
  },
};
