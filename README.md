curl -v https://phoenix.test.user.domain.net
* Host phoenix.test.user.domain.net:443 was resolved.
* IPv6: (none)
* IPv4: ip
*   Trying ip:443...
* Connected to phoenix.test.user.domain.net (ip) port 443
* ALPN: curl offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / X25519 / RSASSA-PSS
* ALPN: server did not agree on a protocol. Uses default.
* Server certificate:
*  subject: CN=*.airflow.domain.net; emailAddress=user@domain.net
*  start date: Dec 31 06:25:22 2025 GMT
*  expire date: Dec 30 06:25:22 2030 GMT
*  subjectAltName does not match phoenix.test.user.domain.net
* SSL: no alternative certificate subject name matches target host name 'phoenix.test.user.domain.net'
* Closing connection
* TLSv1.3 (OUT), TLS alert, close notify (256):
curl: (60) SSL: no alternative certificate subject name matches target host name 'phoenix.test.user.domain.net'
More details here: https://curl.se/docs/sslcerts.html

curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the web page mentioned above.
