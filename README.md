location /v1/traces {
    proxy_pass https://phoenix.test.user.domain.net/v1/traces;
    proxy_http_version 1.1;

    proxy_set_header Host phoenix.test.user.domain.net;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
