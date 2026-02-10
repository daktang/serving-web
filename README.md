sudo apt install -y gir1.2-glib-2.0=1.72.0-1 --allow-downgrades --allow-change-held-packages
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 libpam-modules : PreDepends: libpam-modules-bin (= 1.3.1-5ubuntu4.7) but 1.4.0-11ubuntu2.6 is to be installed
                  Recommends: update-motd but it is not going to be installed
 mutter : Depends: libmutter-6-0 (>= 3.29.4) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
