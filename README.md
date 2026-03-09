acl acl_user_alpha hdr(host) -m reg -i ^[^\.]+\.user\.domain\.net
use_backend webide_user_alpha_be if acl_user_alpha { ssl_fc_sni webide.user.domain.net }
use_backend test_user_alpha_be if acl_user_alpha { ssl_fc_sni test.user.domain.net }
use_backend user_alpha_be if acl_user_alpha !{ ssl_fc_sni webide.user.domain.net } !{ ssl_fc_sni test.user.domain.net }

backend webide_user_alpha_be
    mode http

    option httpchk

    http-check send meth GET uri /healthz
    http-check expect status 200

    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Forwarded-Proto https if { ssl_fc }

    server server test_ip:4180 check fall 3 rise 2

backend test_user_alpha_be
    mode http

    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Forwarded-Proto https if { ssl_fc }

    server server test_ip:8080 check fall 3 rise 2

backend user_alpha_be
    mode http

    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Forwarded-Proto https if { ssl_fc }

    #server server test_ip:80 check fall 3 rise 2
