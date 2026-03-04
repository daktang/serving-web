kubectl create namespace mlflow --dry-run=client -o yaml | kubectl apply -f -

kubectl -n mlflow create secret generic regcred \
  --type=kubernetes.io/dockerconfigjson \
  --from-file=.dockerconfigjson=$HOME/.docker/config.json
