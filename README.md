sudo apt install update-manager-core -y
Reading package lists... Done
Building dependency tree       
Reading state information... Done
update-manager-core is already the newest version (1:20.04.10.23).
The following packages were automatically installed and are no longer required:
  linux-headers-4.15.0-118 linux-headers-4.15.0-118-generic linux-image-4.15.0-118-generic linux-modules-4.15.0-118-generic
  linux-modules-extra-4.15.0-118-generic
Use 'sudo apt autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 4 not upgraded.
1 not fully installed or removed.
After this operation, 0 B of additional disk space will be used.
Setting up update-notifier-common (3.192.30.19) ...
Traceback (most recent call last):
  File "/usr/lib/update-notifier/package-data-downloader", line 24, in <module>
    import debian.deb822
ModuleNotFoundError: No module named 'debian'
Error in sys.excepthook:
Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/apport_python_hook.py", line 72, in apport_excepthook
    from apport.fileutils import likely_packaged, get_recent_crashes
  File "/usr/lib/python3/dist-packages/apport/__init__.py", line 5, in <module>
    from apport.report import Report
  File "/usr/lib/python3/dist-packages/apport/report.py", line 32, in <module>
    import apport.fileutils
  File "/usr/lib/python3/dist-packages/apport/fileutils.py", line 12, in <module>
    import os, glob, subprocess, os.path, time, pwd, sys, requests_unixsocket
ModuleNotFoundError: No module named 'requests_unixsocket'

Original exception was:
Traceback (most recent call last):
  File "/usr/lib/update-notifier/package-data-downloader", line 24, in <module>
    import debian.deb822
ModuleNotFoundError: No module named 'debian'
dpkg: error processing package update-notifier-common (--configure):
 installed update-notifier-common package post-installation script subprocess returned error exit status 1
Errors were encountered while processing:
 update-notifier-common
E: Sub-process /usr/bin/dpkg returned an error code (1)









sudo apt --fix-broken install -y
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  linux-headers-4.15.0-118 linux-headers-4.15.0-118-generic linux-image-4.15.0-118-generic linux-modules-4.15.0-118-generic
  linux-modules-extra-4.15.0-118-generic
Use 'sudo apt autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 4 not upgraded.
1 not fully installed or removed.
After this operation, 0 B of additional disk space will be used.
Setting up update-notifier-common (3.192.30.19) ...
Traceback (most recent call last):
  File "/usr/lib/update-notifier/package-data-downloader", line 24, in <module>
    import debian.deb822
ModuleNotFoundError: No module named 'debian'
Error in sys.excepthook:
Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/apport_python_hook.py", line 72, in apport_excepthook
    from apport.fileutils import likely_packaged, get_recent_crashes
  File "/usr/lib/python3/dist-packages/apport/__init__.py", line 5, in <module>
    from apport.report import Report
  File "/usr/lib/python3/dist-packages/apport/report.py", line 32, in <module>
    import apport.fileutils
  File "/usr/lib/python3/dist-packages/apport/fileutils.py", line 12, in <module>
    import os, glob, subprocess, os.path, time, pwd, sys, requests_unixsocket
ModuleNotFoundError: No module named 'requests_unixsocket'

Original exception was:
Traceback (most recent call last):
  File "/usr/lib/update-notifier/package-data-downloader", line 24, in <module>
    import debian.deb822
ModuleNotFoundError: No module named 'debian'
dpkg: error processing package update-notifier-common (--configure):
 installed update-notifier-common package post-installation script subprocess returned error exit status 1
Errors were encountered while processing:
 update-notifier-common
E: Sub-process /usr/bin/dpkg returned an error code (1)
