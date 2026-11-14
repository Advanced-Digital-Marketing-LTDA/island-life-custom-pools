# syntax=docker/dockerfile:1
# The image can be built from the repository root or from site/ (Coolify's "Base Directory"): the first stage
# keeps whichever folder holds package.json, so both ways of starting the build work.
FROM node:24.19.0-slim AS source
WORKDIR /ctx
COPY . .
RUN mkdir /src && if [ -f site/package.json ]; then cp -a site/. /src/; else cp -a . /src/; fi

FROM node:24.19.0-slim AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY --from=source /src/package.json /src/package-lock.json ./
RUN --mount=type=secret,id=build_ca \
    if [ -f /run/secrets/build_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/build_ca; fi; \
    npm install --global npm@11.9.0 --ignore-scripts && npm ci --ignore-scripts
COPY --from=source /src/astro.config.mjs /src/tsconfig.json /src/postcss.config.mjs /src/tailwind.config.mjs ./
COPY --from=source /src/src ./src
COPY --from=source /src/content ./content
COPY --from=source /src/tina ./tina
COPY --from=source /src/public ./public
ARG SITE_URL=http://localhost:4321
ARG SOURCE_COMMIT=local
# The page editor (/admin) is built only when both Tina Cloud keys are set; without them the site builds without it.
# --skip-cloud-checks keeps a Tina Cloud problem from failing the deploy.
ARG TINA_CLIENT_ID=
ARG TINA_TOKEN=
ARG GITHUB_BRANCH=main
RUN if [ -n "$TINA_CLIENT_ID" ] && [ -n "$TINA_TOKEN" ]; then npx tinacms build --skip-cloud-checks; fi \
    && npm run build && npm prune --omit=dev --ignore-scripts

FROM node:24.19.0-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "./dist/server/entry.mjs"]
