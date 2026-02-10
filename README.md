cd /tmp
dpkg-deb -R libpam-modules_1.4.0-11ubuntu2.6_amd64.deb libpam-modules.work
sudo rm -f libpam-modules.work/DEBIAN/preinst
dpkg-deb -b libpam-modules.work libpam-modules_nopreinst.deb
sudo dpkg -i --force-all libpam-modules_nopreinst.deb
