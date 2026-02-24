
load("/data1/user/tilt-extensions/helm_remote/Tiltfile", "helm_remote")
load("/data1/user/tilt-extensions/helm_resource/Tiltfile", "helm_resource")

project = os.getenv("PROJECT_NAME")
image_registry = os.getenv("IMAGE_REGISTRY")
image_repository = os.getenv("IMAGE_REPOSITORY")
image_full = image_registry + "/" + image_repository + "/" + project

git_sha = local("git rev-parse --short HEAD").strip()

# Docker Build
# -----------------------------
docker_build(
    image_full, # image full
    ".",        # build context    
    dockerfile="Dockerfile",
    tag=git_sha,
    push=False,  # local only
)

# Helm Deploy
# -----------------------------
helm_release(
    name=project,
    namespace=os.getenv("KUBERNETES_DEPLOY_NAMESPACE", "default"),
    chart="deployments/helm",    
    values=["deployments/helm/values.yaml"],
    set={
        # IMAGE
        "image.repository": image_full,
        "image.tag": git_sha,
        "image.pullPolicy": os.getenv("IMAGE_PULL_POLICY", "IfNotPresent"),

        # CONTAINER
        "containers.ports.containerPort": os.getenv("SERVICE_TARGET_PORT", "8000"),
        
        # SERVICE
        "service.targetPort": os.getenv("SERVICE_TARGET_PORT", "8000"),
        
        # SERVICE ACCOUNT
        "serviceAccount.name": os.getenv("KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME", ""),

        # INGRESS
        "ingress.enabled": os.getenv("INGRESS_ENABLED", "true"),
        "ingress.className": os.getenv("INGRESS_CLASSNAME", "istio"),
        "ingress.hosts[0].host": os.getenv("INGRESS_HOSTNAME", ""),
        "ingress.hosts[0].paths[0].path": "/",
        "ingress.hosts[0].paths[0].pathType": "Prefix",
        },
)

# kind load docker-image {image_full}
# -----------------------------
k8s_kind()


  RESOURCE NAME                                                                                                 CONTAINER •  UPDATE STATUS  •    AS OF                                        CONTAINER •  UPDATE STATUS  •    AS OF •    AS OF 
▼ ✖ (Tiltfile) ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ N/A             •  <1m ago ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ N/A             •  <1m ago •  <5s ago 
    HISTORY: EDITED FILES Tiltfile                                                                                          Error    (0.0s) •  <1m ago                                                    Error    (0.0s) •  <1m ago •  <5s ago 
             EDITED FILES Tiltfile                                                                                          Error    (0.0s) •  <1m ago                                                    Error    (0.0s) •  <1m ago • <15s ago 
    ERROR:                                                                                                                                                                                                                                      
       1 File Changed: [Tiltfile]                                                                                                                                                                                                               
       Loading Tiltfile at: /data1/user/yun-workbench/web-framework/fastapi/uv-fastapi-starter-kit/Tiltfile                                                                                                                                
       ERROR: /data1/user/yun-workbench/web-framework/fastapi/uv-fastapi-starter-kit/Tiltfile:23:1: undefined: helm_release (did you mean         g literal                                                                                
       helm_remote?)                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                
 1: ALL LOGS │ 2: build log │ 3: runtime log │                                                                            X: expand | t: trigger update                                                 X: expand | t: trigger updategger update
Cloning into '/data1/user/.local/share/tilt-dev/tilt_modules/github.com/tilt-dev/tilt-extensions'...                                             ↑                                                                             ↑          ↑
fatal: repository 'https://repo.samsungds.net/artifactory/github/tilt-dev/tilt-extensions/' not found                                                                                                                                           
ERROR: extensionrepo default: download error: waiting 5m20s before retrying. Original error: exit status 128                                           al                                                                                       
                                                                                                                                                       s                                                                                        
1 File Changed: [Tiltfile]                                                                                                                                                                                                                      
Loading Tiltfile at: /data1/user/yun-workbench/web-framework/fastapi/uv-fastapi-starter-kit/Tiltfile                                                                                                                                       
ERROR: /data1/user/yun-workbench/web-framework/fastapi/uv-fastapi-starter-kit/Tiltfile:23:1: undefined: helm_release (did you mean helm_remote?) 
