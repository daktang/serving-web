helm upgrade --install mlflow . -n mlflow --create-namespace
Release "mlflow" does not exist. Installing it now.
Error: values don't meet the specifications of the schema(s) in the following chart(s):
mlflow:
- autoscaling.metrics.0: Must validate one and only one schema (oneOf)
- autoscaling.metrics.0.type: autoscaling.metrics.0.type does not match: "Resource"
- autoscaling.metrics.0.type: autoscaling.metrics.0.type must be one of the following: "Resource", "Pods", "Object", "External"
