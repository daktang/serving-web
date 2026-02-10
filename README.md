아래 내용 그대로 복사해서 전달하시면 됩니다.


---

안녕하세요.

Ubuntu 20.04 → 22.04 업그레이드를 진행하는 과정에서 PAM 모듈 변경으로 인해 인증 시스템이 손상된 상태입니다.

현재 증상:

일반 사용자 SSH 로그인은 가능

sudo / su 모두 실패

root 계정으로 콘솔 로그인도 실패

오류 메시지: "PAM authentication error: Module is unknown"


원인 분석:

Ubuntu 22.04(jammy)에서는 pam_tally2.so 모듈이 제거되었습니다.
그러나 /etc/pam.d/common-auth 파일에 아래 설정이 그대로 남아 있습니다.

auth required pam_tally2.so onerr=fail deny=5 unlock_time=1800

현재 시스템에는 pam_tally2.so 파일이 존재하지 않기 때문에,
PAM 인증 단계에서 "Module is unknown" 오류가 발생하고 있으며
이로 인해 모든 인증(sudo, su, root 로그인 포함)이 실패하고 있습니다.

현 상태에서는 root 권한 상승이 불가능하여 SSH 환경 내에서 복구할 수 없습니다.

요청 사항:

VM 콘솔(KVM 또는 Hypervisor Console) 접근을 통해 다음 작업을 부탁드립니다.

1. GRUB에서 single-user 모드로 부팅 (linux 라인에 init=/bin/bash 추가)


2. root 쉘 진입 후 파일 시스템을 read-write로 마운트 mount -o remount,rw /


3. /etc/pam.d/common-auth 파일에서 아래 라인을 제거 또는 주석 처리

auth required pam_tally2.so onerr=fail deny=5 unlock_time=1800


4. 시스템 재부팅



해당 조치 후 정상적으로 sudo 및 root 인증이 복구될 것으로 판단됩니다.

감사합니다.
