<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="icon" type="image/png" id="fevicon" href="images/icons/favicon.png" sizes="32x32">

  <script src="config.js"></script>
  <script src="//code.jquery.com/jquery-1.4.2.min.js"></script>
  <script src="//cdn.socket.io/4.4.1/socket.io.min.js"></script>

  <!-- dev 전용: 포털 절대 URL을 항상 로컬 프록시로 강제 -->
  <script>
  (function () {
    // 실제 포털 호스트(정상 케이스)
    var HOST = 'portal.aiserving.dev.aip.domain.net';
    // 앱에서 쓰는 프리픽스들
    var PREFIXES = ['/api', '/ext-dit/api', '/coreproxy', '/models', '/serving', '/authservice'];

    // 1) 문자열 치환으로 가장 먼저 강제 변환
    function hardRewrite(u) {
      if (typeof u !== 'string') return u;
      // 정상: https?://portal.../(net/)?<prefix> → /<prefix>
      // 오탈자 케이스(호스트 뒤에 /net/ 끼어든 경우)도 함께 흡수
      var re = /^https?:\/\/portal\.aiserving\.dev\.aip\.domain\.net\/(?:net\/)?(?=(api|ext-dit\/api|coreproxy|models|serving|authservice)\/)/i;
      var nu = u.replace(re, '/');
      return nu;
    }

    function pathStartsWith(path, prefix) {
      if (!path || !prefix) return false;
      if (!prefix.endsWith('/')) prefix += '/';
      return path === prefix.slice(0, -1) || path.indexOf(prefix) === 0;
    }

    // 2) URL 파싱 기반 보정 (문자열 치환으로 못 잡은 경우 보완)
    function toLocal(u) {
      if (typeof u !== 'string') return u;
      var first = hardRewrite(u);
      if (first !== u) return first;
      try {
        var x = new URL(u, window.location.href); // 절대/상대 모두 파싱
        // host가 이상하게 '...domain' 이고 path가 '/net/...' 로 시작해도 보정
        if (x.hostname === 'portal.aiserving.dev.aip.domain' && x.pathname.indexOf('/net/') === 0) {
          var p = x.pathname.replace(/^\/net\//, '/');
          return p + x.search + x.hash;
        }
        // 정상 host면 prefix 매칭 시 상대경로로 강제
        if (x.hostname === HOST) {
          for (var i = 0; i < PREFIXES.length; i++) {
            if (pathStartsWith(x.pathname, PREFIXES[i])) {
              return x.pathname + x.search + x.hash;
            }
          }
        }
      } catch (e) {}
      return u;
    }

    // fetch
    if (window.fetch) {
      var _fetch = window.fetch;
      window.fetch = function (input, init) {
        if (typeof input === 'string') {
          input = hardRewrite(input);
          input = toLocal(input);
        } else if (input && input.url) {
          var nu = toLocal(input.url);
          if (nu !== input.url) input = new Request(nu, input);
        }
        init = init || {};
        if (init.credentials == null) init.credentials = 'include';
        return _fetch(input, init);
      };
    }

    // XHR
    if (window.XMLHttpRequest) {
      var _open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (method, url) {
        arguments[1] = toLocal(hardRewrite(url));
        return _open.apply(this, arguments);
      };
      var _send = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function (body) {
        try { if (this.withCredentials == null) this.withCredentials = true; } catch(e){}
        return _send.apply(this, arguments);
      };
    }

    // jQuery 1.4.2
    if (window.jQuery && jQuery.ajax) {
      var _ajax = jQuery.ajax;
      jQuery.ajax = function (opt) {
        if (typeof opt === 'string') opt = { url: opt };
        opt = opt || {};
        if (opt.url) opt.url = toLocal(hardRewrite(opt.url));
        opt.xhrFields = opt.xhrFields || {};
        if (opt.xhrFields.withCredentials == null) opt.xhrFields.withCredentials = true;
        return _ajax.call(jQuery, opt);
      };
    }

    // axios (있으면)
    function hookAxios() {
      if (!window.axios || !window.axios.interceptors || !window.axios.interceptors.request) return;
      window.axios.interceptors.request.use(function (config) {
        if (config && config.url) {
          var s = hardRewrite(config.url);
          var nu = toLocal(s);
          if (nu !== config.url) config.url = nu;
        }
        if (!config.withCredentials) config.withCredentials = true;
        return config;
      });
    }
    hookAxios();
    window.addEventListener('load', hookAxios);
  })();
  </script>

  <script>document.title = window.config.applicationTitle || window.config.applicationName;</script>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root" class="grip-resizable"></div>
</body>
</html>
