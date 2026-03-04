 helm upgrade --install mlflow . -n mlflow --create-namespace
Release "mlflow" does not exist. Installing it now.
Error: values don't meet the specifications of the schema(s) in the following chart(s):
mlflow:
- (root): Must validate "then" as "if" was valid
- postgresql.enabled: postgresql.enabled does not match: false
- (root): Must validate "then" as "if" was valid
- backendStore.postgres.enabled: backendStore.postgres.enabled does not match: false
- (root): Must validate all the schemas (allOf)
