k logs -n llm-chat-service llm-chat-service-c988858c4-rjktk -f
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2026/03/10 12:14:20 [notice] 1#1: using the "epoll" event method
2026/03/10 12:14:20 [notice] 1#1: nginx/1.25.5
2026/03/10 12:14:20 [notice] 1#1: built by gcc 13.2.1 20231014 (Alpine 13.2.1_git20231014) 
2026/03/10 12:14:20 [notice] 1#1: OS: Linux 6.8.0-90-generic
2026/03/10 12:14:20 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2026/03/10 12:14:20 [notice] 1#1: start worker processes
2026/03/10 12:14:20 [notice] 1#1: start worker process 36
2026/03/10 12:14:20 [notice] 1#1: start worker process 37
2026/03/10 12:14:20 [notice] 1#1: start worker process 38
2026/03/10 12:14:20 [notice] 1#1: start worker process 39
2026/03/10 12:14:20 [notice] 1#1: start worker process 40
2026/03/10 12:14:20 [notice] 1#1: start worker process 41
2026/03/10 12:14:20 [notice] 1#1: start worker process 42
2026/03/10 12:14:20 [notice] 1#1: start worker process 43
10.244.0.1 - - [10/Mar/2026:12:14:29 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET / HTTP/1.1" 200 527 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/index-DS2HzGnp.js HTTP/1.1" 200 99349 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/ui-vendor-1c08MJWV.js HTTP/1.1" 200 87070 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/utils-vendor-DWXVyHoh.js HTTP/1.1" 200 9471 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/index-DnZstddW.css HTTP/1.1" 200 13616 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/query-vendor-uLOdczjQ.js HTTP/1.1" 200 9942 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:35 +0000] "GET /assets/router-vendor-BrGaHd-L.js HTTP/1.1" 200 8509 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.1 - - [10/Mar/2026:12:14:39 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET / HTTP/1.1" 200 527 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/index-DS2HzGnp.js HTTP/1.1" 200 99349 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/ui-vendor-1c08MJWV.js HTTP/1.1" 200 87070 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/query-vendor-uLOdczjQ.js HTTP/1.1" 200 9942 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/utils-vendor-DWXVyHoh.js HTTP/1.1" 200 9471 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/router-vendor-BrGaHd-L.js HTTP/1.1" 200 8509 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:41 +0000] "GET /assets/index-DnZstddW.css HTTP/1.1" 200 13616 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.1 - - [10/Mar/2026:12:14:49 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.1 - - [10/Mar/2026:12:14:49 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"




10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET / HTTP/1.1" 200 527 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/index-DS2HzGnp.js HTTP/1.1" 200 99349 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/utils-vendor-DWXVyHoh.js HTTP/1.1" 200 9471 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/query-vendor-uLOdczjQ.js HTTP/1.1" 200 9942 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/ui-vendor-1c08MJWV.js HTTP/1.1" 200 87070 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/router-vendor-BrGaHd-L.js HTTP/1.1" 200 8509 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:54 +0000] "GET /assets/index-DnZstddW.css HTTP/1.1" 200 13616 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET / HTTP/1.1" 200 527 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/index-DS2HzGnp.js HTTP/1.1" 200 99349 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/utils-vendor-DWXVyHoh.js HTTP/1.1" 200 9471 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/ui-vendor-1c08MJWV.js HTTP/1.1" 200 87070 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/query-vendor-uLOdczjQ.js HTTP/1.1" 200 9942 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/router-vendor-BrGaHd-L.js HTTP/1.1" 200 8509 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:14:55 +0000] "GET /assets/index-DnZstddW.css HTTP/1.1" 200 13616 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.1 - - [10/Mar/2026:12:14:59 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.1 - - [10/Mar/2026:12:15:09 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET / HTTP/1.1" 200 527 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/index-DS2HzGnp.js HTTP/1.1" 200 99349 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/ui-vendor-1c08MJWV.js HTTP/1.1" 200 87070 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/utils-vendor-DWXVyHoh.js HTTP/1.1" 200 9471 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/query-vendor-uLOdczjQ.js HTTP/1.1" 200 9942 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/router-vendor-BrGaHd-L.js HTTP/1.1" 200 8509 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.6 - - [10/Mar/2026:12:15:14 +0000] "GET /assets/index-DnZstddW.css HTTP/1.1" 200 13616 "https://llm-chat-service.test.user.domain.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.1 - - [10/Mar/2026:12:15:19 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.1 - - [10/Mar/2026:12:15:19 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
10.244.0.6 - - [10/Mar/2026:12:15:26 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:148.0) Gecko/20100101 Firefox/148.0" "12.23.119.142,10.244.0.6"
10.244.0.1 - - [10/Mar/2026:12:15:29 +0000] "GET / HTTP/1.1" 200 1195 "-" "kube-probe/1.31" "-"
