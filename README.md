grep -R pam_tally2 /etc/pam.d
/etc/pam.d/common-auth:auth    required                        pam_tally2.so onerr=fail deny=5 unlock_time=1800
/etc/pam.d/unity.backup/common-auth.unity.20250624.104155.3445941-ac.uninstall:auth    required                        pam_tally2.so onerr=fail deny=100 unlock_time=1800
/etc/pam.d/unity.backup/common-auth.unity.20250624.110359.3562165-ac.uninstall:auth    required                        pam_tally2.so onerr=fail deny=100 unlock_time=1800
/etc/pam.d/unity.backup/common-auth.unity.20221206.105253.18809-ac.install:auth    required                        pam_tally2.so onerr=fail deny=4 unlock_time=1800
/etc/pam.d/unity.backup/common-auth.unity.20250624.110400.3562165-ac.install:auth    required                        pam_tally2.so onerr=fail deny=100 unlock_time=1800
/etc/pam.d/unity.backup/common-auth.unity.20221206.105253.18809-ac.uninstall:auth    required                        pam_tally2.so onerr=fail deny=4 unlock_time=1800
