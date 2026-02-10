user@server:~/yun-workbench/lang/python/uv-playground$ apt-cache policy libpam-modules
libpam-modules:
  Installed: 1.3.1-5ubuntu4.7
  Candidate: 1.4.0-11ubuntu2.6
  Version table:
     1.4.0-11ubuntu2.6 500
        500 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy-updates/main amd64 Packages
     1.4.0-11ubuntu2 500
        500 http://repo.mirror.net/artifactory/debian-remote/ubuntu jammy/main amd64 Packages
 *** 1.3.1-5ubuntu4.7 100
        100 /var/lib/dpkg/status
user@server:~/yun-workbench/lang/python/uv-playground$ sudo apt install -y libpam-modules=1.4.0-11ubuntu2.6 --allow-downgrades --allow-change-held-packages
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 gir1.2-freedesktop : Depends: gir1.2-glib-2.0 (= 1.72.0-1) but 1.64.1-1~ubuntu20.04.1 is to be installed
 mutter : Depends: libmutter-6-0 (>= 3.29.4) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
user@server:~/yun-workbench/lang/python/uv-playground$ sudo apt purge -y mutter gir1.2-freedesktop
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 gir1.2-atspi-2.0 : Depends: gir1.2-freedesktop but it is not going to be installed
 gir1.2-gtk-3.0 : Depends: gir1.2-freedesktop (>= 1.39.0) but it is not going to be installed
 gir1.2-gtk-4.0 : Depends: gir1.2-freedesktop (>= 1.39.0) but it is not going to be installed
 gir1.2-mutter-10 : Depends: gir1.2-freedesktop (>= 0.9.12) but it is not going to be installed
 gir1.2-pango-1.0 : Depends: gir1.2-freedesktop (>= 0.9.5) but it is not going to be installed
 gir1.2-rsvg-2.0 : Depends: gir1.2-freedesktop (>= 0.10.8) but it is not going to be installed
 gnome-shell : Depends: gir1.2-freedesktop but it is not going to be installed
               Recommends: power-profiles-daemon but it is not going to be installed
 libpam-modules : PreDepends: libpam-modules-bin (= 1.3.1-5ubuntu4.7) but 1.4.0-11ubuntu2.6 is to be installed
                  Recommends: update-motd but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
