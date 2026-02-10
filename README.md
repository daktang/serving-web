user@server:~/yun-workbench/lang/python/uv-playground$ dpkg -l | grep libpam
ii  libpam-cap:amd64                       1:2.44-1ubuntu0.22.04.2             amd64        POSIX 1003.1e capabilities (PAM module)
ii  libpam-fprintd:amd64                   1.90.9-1~ubuntu20.04.1              amd64        PAM module for fingerprint authentication through fprintd
ii  libpam-gnome-keyring:amd64             3.36.0-1ubuntu1                     amd64        PAM module to unlock the GNOME keyring upon login
ii  libpam-modules:amd64                   1.3.1-5ubuntu4.7                    amd64        Pluggable Authentication Modules for PAM
ii  libpam-modules-bin                     1.4.0-11ubuntu2.6                   amd64        Pluggable Authentication Modules for PAM - helper binaries
ii  libpam-pwquality:amd64                 1.4.4-1build2                       amd64        PAM module to check password strength
ii  libpam-runtime                         1.4.0-11ubuntu2.6                   all          Runtime support for the PAM library
ii  libpam-systemd:amd64                   249.11-0ubuntu3.17                  amd64        system and service manager - PAM module
ii  libpam0g:amd64                         1.4.0-11ubuntu2.6                   amd64        Pluggable Authentication Modules library
user@server:~/yun-workbench/lang/python/uv-playground$ grep -r jammy /etc/apt/
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy main restricted
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates main restricted
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy universe
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates universe
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy multiverse
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates multiverse
/etc/apt/sources.list.bak:# deb http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports main restricted universe multiverse
