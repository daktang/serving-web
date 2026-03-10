------                                                                                                                                                                                                                                         
 > [builder 3/7] RUN corepack enable && corepack prepare pnpm@latest --activate:                                                                                                                                                               
0.464 Internal Error: Error when performing the request to https://registry.npmjs.org/pnpm; for troubleshooting help, see https://github.com/nodejs/corepack#troubleshooting                                                                   
0.464     at fetch (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22089:11)                                                                                                                                                       
0.464     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)                                                                                                                                                        
0.464     at async fetchAsJson (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22103:20)                                                                                                                                           
0.464     at async fetchAvailableTags (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22042:20)
0.464     at async fetchAvailableTags2 (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22214:14)
0.464     at async Engine.resolveDescriptor (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:23033:20)
0.464     at async PrepareCommand.execute (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:23617:24)
0.464     at async PrepareCommand.validateAndExecute (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:20278:22)
0.464     at async _Cli.run (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:21215:18)
0.464     at async Object.runMain (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:23704:19)
------

 1 warning found (use docker --debug to expand):
 - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "VITE_LITELLM_API_KEY") (line 20)
Dockerfile:7
--------------------
   5 |     
   6 |     # Install pnpm
   7 | >>> RUN corepack enable && corepack prepare pnpm@latest --activate
   8 |     
   9 |     # Copy dependency files
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c corepack enable && corepack prepare pnpm@latest --activate" did not complete successfully: exit code: 1



---
# ---- Stage 1: Build ----
FROM domain.net/docker.io/library/node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build args for environment variables
ARG VITE_LITELLM_BASE_URL
ARG VITE_LITELLM_API_KEY

# Build the application
RUN pnpm run build

# ---- Stage 2: Serve ----
FROM domain.net/docker.io/library/nginx:1.25-alpine AS production

# Copy custom nginx config (port 8080 fixed)
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
