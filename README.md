sudo apt install libpam-modules=1.4.0-11ubuntu2.6 libpam-runtime=1.4.0-11ubuntu2.6 libpam0g=1.4.0-11ubuntu2.6 --allow-downgrades --allow-change-held-packages
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
libpam-runtime is already the newest version (1.4.0-11ubuntu2.6).
libpam0g is already the newest version (1.4.0-11ubuntu2.6).
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 gir1.2-freedesktop : Depends: gir1.2-glib-2.0 (= 1.72.0-1) but 1.64.1-1~ubuntu20.04.1 is to be installed
 mutter : Depends: libmutter-6-0 (>= 3.29.4) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
