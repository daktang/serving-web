apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: mlflow-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts:
        - mlflow.test.user.domain.net


apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: mlflow
spec:
  hosts:
    - mlflow.test.user.domain.net
  gateways:
    - mlflow-gateway
  http:
    - match:
        - uri:
            prefix: /
      route:
        - destination:
            host: mlflow
            port:
              number: 80
