
helm dependency update
Getting updates for unmanaged Helm repositories...
...Unable to get an update from the "https://charts.bitnami.com/bitnami" chart repository:
        Get "https://charts.bitnami.com/bitnami/index.yaml": read tcp 10.166.236.81:34938->13.33.235.70:443: read: connection reset by peer
...Unable to get an update from the "https://charts.bitnami.com/bitnami" chart repository:
        Get "https://charts.bitnami.com/bitnami/index.yaml": read tcp 10.166.236.81:34948->13.33.235.70:443: read: connection reset by peer
Error: no cached repository for helm-manager-54d2620bbb6f1bb3f35d4c7f945bfa25077949488dcbb0a4d01c90f2c35baa59 found. (try 'helm repo update'): open /data1/syun7-kim/.cache/helm/repository/helm-manager-54d2620bbb6f1bb3f35d4c7f945bfa25077949488dcbb0a4d01c90f2c35baa59-index.yaml: no such file or directory
