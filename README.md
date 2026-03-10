apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
    meta.helm.sh/release-name: mlflow
    meta.helm.sh/release-namespace: mlflow
  creationTimestamp: "2026-03-10T02:42:13Z"
  generation: 1
  labels:
    app: mlflow
    app.kubernetes.io/instance: mlflow
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/name: mlflow
    app.kubernetes.io/version: 3.7.0
    helm.sh/chart: mlflow-1.8.1
    version: 3.7.0
  name: mlflow
  namespace: mlflow
  resourceVersion: "172207"
  uid: b8dbf5c2-5f2f-4867-a535-ce69acf1a9ce
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: mlflow
      app.kubernetes.io/instance: mlflow
      app.kubernetes.io/name: mlflow
  strategy:
    rollingUpdate:
      maxSurge: 100%
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      annotations:
        checksum/config: 7080f3fe01b1de53a0bd5703e53e253002a8df6083dacc6d1db4371464a2603b
      creationTimestamp: null
      labels:
        app: mlflow
        app.kubernetes.io/instance: mlflow
        app.kubernetes.io/name: mlflow
    spec:
      containers:
      - args:
        - server
        - --host=0.0.0.0
        - --port=5000
        - --backend-store-uri=postgresql+psycopg2://
        - --default-artifact-root=./mlruns
        - --gunicorn-opts='--log-level=info'
        command:
        - mlflow
        env:
        - name: MLFLOW_VERSION
          value: 3.7.0
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              key: password
              name: mlflow-postgresql
              optional: true
        envFrom:
        - configMapRef:
            name: mlflow-env-configmap
        - secretRef:
            name: mlflow-env-secret
        - secretRef:
            name: mlflow-flask-server-secret-key
        image: cr.aip.domain.net/docker.io/burakince/mlflow:3.7.0
        imagePullPolicy: IfNotPresent
        livenessProbe:
          failureThreshold: 5
          httpGet:
            path: /health
            port: mlflow
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 30
          successThreshold: 1
          timeoutSeconds: 3
        name: mlflow
        ports:
        - containerPort: 5000
          name: mlflow
          protocol: TCP
        readinessProbe:
          failureThreshold: 5
          httpGet:
            path: /health
            port: mlflow
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 30
          successThreshold: 1
          timeoutSeconds: 3
        resources: {}
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          readOnlyRootFilesystem: false
          runAsGroup: 1001
          runAsNonRoot: true
          runAsUser: 1001
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      initContainers:
      - args:
        - /opt/mlflow/migrations.py
        command:
        - python
        env:
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              key: password
              name: mlflow-postgresql
              optional: true
        envFrom:
        - configMapRef:
            name: mlflow-env-configmap
        - secretRef:
            name: mlflow-env-secret
        - secretRef:
            name: mlflow-flask-server-secret-key
        image: cr.aip.domain.net/docker.io/burakince/mlflow:3.7.0
        imagePullPolicy: IfNotPresent
        name: mlflow-db-migration
        resources: {}
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          readOnlyRootFilesystem: false
          runAsGroup: 1001
          runAsNonRoot: true
          runAsUser: 1001
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /opt/mlflow/migrations.py
          name: migrations-config
          readOnly: true
          subPath: migrations.py
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext:
        fsGroup: 1001
        fsGroupChangePolicy: OnRootMismatch
      serviceAccount: mlflow
      serviceAccountName: mlflow
      terminationGracePeriodSeconds: 30
      volumes:
      - configMap:
          defaultMode: 420
          name: mlflow-migrations
        name: migrations-config
status:
  availableReplicas: 1
  conditions:
  - lastTransitionTime: "2026-03-10T02:42:44Z"
    lastUpdateTime: "2026-03-10T02:42:44Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  - lastTransitionTime: "2026-03-10T02:42:13Z"
    lastUpdateTime: "2026-03-10T02:42:44Z"
    message: ReplicaSet "mlflow-66b5df9448" has successfully progressed.
    reason: NewReplicaSetAvailable
    status: "True"
    type: Progressing
  observedGeneration: 1
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
