Get:26 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates/multiverse amd64 Packages [70.1 kB]
Get:27 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates/multiverse Translation-en [15.5 kB]
Get:28 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates/multiverse amd64 c-n-f Metadata [768 B]
Get:29 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/main amd64 Packages [69.4 kB]
Get:30 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/main Translation-en [11.5 kB]
Get:31 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/main amd64 c-n-f Metadata [412 B]
Get:32 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/restricted amd64 c-n-f Metadata [116 B]
Get:33 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/universe amd64 Packages [31.7 kB]
Get:34 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/universe Translation-en [16.9 kB]
Get:35 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/universe amd64 c-n-f Metadata [672 B]
Get:36 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-backports/multiverse amd64 c-n-f Metadata [116 B]
Fetched 34.5 MB in 4s (9,020 kB/s)                              
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
440 packages can be upgraded. Run 'apt list --upgradable' to see them.
user@server:~/yun-workbench/lang/python/uv-playground$ sudo apt full-upgrade -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 gir1.2-freedesktop : Depends: gir1.2-glib-2.0 (= 1.72.0-1) but 1.64.1-1~ubuntu20.04.1 is installed
 libpam-modules : PreDepends: libpam-modules-bin (= 1.3.1-5ubuntu4.7) but 1.4.0-11ubuntu2.6 is installed
                  Recommends: update-motd but it is not installed
 mutter : Depends: libmutter-6-0 (>= 3.29.4) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
user@server:~/yun-workbench/lang/python/uv-playground$ sudo apt full-upgrade -y
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 gir1.2-freedesktop : Depends: gir1.2-glib-2.0 (= 1.72.0-1) but 1.64.1-1~ubuntu20.04.1 is installed
 libpam-modules : PreDepends: libpam-modules-bin (= 1.3.1-5ubuntu4.7) but 1.4.0-11ubuntu2.6 is installed
                  Recommends: update-motd but it is not installed
 mutter : Depends: libmutter-6-0 (>= 3.29.4) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
