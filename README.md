acl acl_test_wild_host hdr(host) -m reg -i ^[^\.]+\.test\.user\.domain\.net
use_backend test_user_alpha_be if acl_test_wild_host
!acl_test_wild_host   # 마지막 fallback 조건에 추가
