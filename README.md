helm install mlflow . -n mlflow --create-namespace
Error: INSTALLATION FAILED: values don't meet the specifications of the schema(s) in the following chart(s):
mlflow:
- (root): Must validate "then" as "if" was valid
- postgresql.enabled: postgresql.enabled does not match: false
- (root): Must validate "then" as "if" was valid
- backendStore.postgres.enabled: backendStore.postgres.enabled does not match: false
- (root): Must validate all the schemas (allOf)
