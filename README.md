location /phoenix-traces/ {
    proxy_pass http://phoenix.test.user.domain.net/;
    proxy_http_version 1.1;
    proxy_set_header Host phoenix.test.user.domain.net;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
