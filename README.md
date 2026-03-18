k port-forward -n opensearch svc/data-prepper 21891:21891
Forwarding from 127.0.0.1:21891 -> 21891
Forwarding from [::1]:21891 -> 21891


Handling connection for 21891
E0318 16:18:13.102597 3349483 portforward.go:409] an error occurred forwarding 21891 -> 21891: error forwarding port 21891 to pod 932e6da4223e11131c87c2076cd59d5bda95df539f3ea6f063b1ecc68b1e0023, uid : failed to execute portforward in network namespace "/var/run/netns/cni-31c3ef98-575c-85be-ea3e-a6464528a089": failed to connect to localhost:21891 inside namespace "932e6da4223e11131c87c2076cd59d5bda95df539f3ea6f063b1ecc68b1e0023", IPv4: dial tcp4 127.0.0.1:21891: connect: connection refused IPv6 dial tcp6 [::1]:21891: connect: connection refused 
error: lost connection to pod
