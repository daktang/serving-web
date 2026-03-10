acl acl_test_wild_sni ssl_fc_sni -m end .test.user.domain.net

use_backend test_user_alpha_be if acl_test_wild_host

use_backend user_alpha_be if acl_user_alpha !{ ssl_fc_sni webide.user.domain.net } !{ ssl_fc_sni test.user.domain.net } !acl_test_wild_host
