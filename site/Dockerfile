# syntax=docker/dockerfile:1
# The image can be built from the repository root or from site/ (Coolify's "Base Directory"): the first stage
# keeps whichever folder holds package.json, so both ways of starting the build work.
FROM node:24.19.0-slim AS source
WORKDIR /ctx
COPY . .
RUN mkdir /src && if [ -f site/package.json ]; then cp -a site/. /src/; else cp -a . /src/; fi

FROM node:24.19.0-slim AS npm
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY --from=source /src/package.json /src/package-lock.json ./
# The build server's connection to the npm registry can drop (ECONNRESET), which can also leave a package half installed.
# npm retries each download, and the whole install is repeated up to three times; an install only counts once the native
# Markdown binding Astro needs actually loads.
ENV npm_config_fetch_retries=5 npm_config_fetch_retry_mintimeout=20000 npm_config_fetch_retry_maxtimeout=120000 \
    npm_config_fetch_timeout=300000 npm_config_maxsockets=4 npm_config_audit=false npm_config_fund=false
RUN --mount=type=secret,id=build_ca \
    if [ -f /run/secrets/build_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/build_ca; fi; \
    for attempt in 1 2 3; do npm install --global npm@11.9.0 --ignore-scripts && exit 0; sleep 15; done; exit 1

# The runtime needs only the production packages. They get their own install: removing the ~1000 development packages
# afterwards (npm prune) took 9 minutes on the Contabo server's disk, a few seconds on a fast one.
FROM npm AS prod-deps
RUN --mount=type=secret,id=build_ca --mount=type=cache,target=/root/.npm \
    if [ -f /run/secrets/build_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/build_ca; fi; \
    for attempt in 1 2 3; do \
      npm ci --omit=dev --ignore-scripts && node --input-type=module -e "await import('satteri')" && exit 0; \
      echo "npm install attempt $attempt failed" >&2; rm -rf node_modules; sleep 15; \
    done; exit 1

FROM npm AS build
RUN --mount=type=secret,id=build_ca --mount=type=cache,target=/root/.npm \
    if [ -f /run/secrets/build_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/build_ca; fi; \
    for attempt in 1 2 3; do \
      npm ci --ignore-scripts && node --input-type=module -e "await import('satteri')" && exit 0; \
      echo "npm install attempt $attempt failed" >&2; rm -rf node_modules; sleep 15; \
    done; exit 1
COPY --from=source /src/astro.config.mjs /src/tsconfig.json /src/postcss.config.mjs /src/tailwind.config.mjs ./
COPY --from=source /src/src ./src
COPY --from=source /src/content ./content
COPY --from=source /src/tina ./tina
COPY --from=source /src/public ./public
ARG SITE_URL=
ARG SOURCE_COMMIT=local
# The page editor (/admin) is built only when both Tina Cloud keys are set; without them the site builds without it.
# --skip-cloud-checks keeps a Tina Cloud problem from failing the deploy.
ARG TINA_CLIENT_ID=
ARG TINA_TOKEN=
ARG GITHUB_BRANCH=main
# Canonical links, the sitemap, robots.txt and the structured data all use this address, so a missing or localhost value must stop the build.
RUN case "$SITE_URL" in https://*) ;; *) echo "SITE_URL build argument must be the public https address, for example https://islandlifecustompools.com" >&2; exit 1;; esac
RUN if [ -n "$TINA_CLIENT_ID" ] && [ -n "$TINA_TOKEN" ]; then npx tinacms build --skip-cloud-checks; fi \
    && npm run build

FROM node:24.19.0-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "./dist/server/entry.mjs"]
