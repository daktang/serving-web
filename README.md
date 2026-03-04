grep -n "postgresql.enabled" -n values.schema.json
2276:      "description": "Ensures only one of backendStore.postgres.enabled, backendStore.mysql.enabled, postgresql.enabled can be true, or mysql.enabled can be true",
grep -n "backendStore.*postgresql.*enabled" -n values.schema.json
2276:      "description": "Ensures only one of backendStore.postgres.enabled, backendStore.mysql.enabled, postgresql.enabled can be true, or mysql.enabled can be true",
