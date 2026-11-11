# syntax=docker/dockerfile:1
FROM node:24.19.0-slim AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN --mount=type=secret,id=build_ca \
    if [ -f /run/secrets/build_ca ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/build_ca; fi; \
    npm install --global npm@11.9.0 --ignore-scripts && npm ci --ignore-scripts
COPY astro.config.mjs tsconfig.json ./
COPY src ./src
COPY public ./public
ARG SITE_URL=http://localhost:4321
ARG SOURCE_COMMIT=local
RUN npm run build && npm prune --omit=dev --ignore-scripts

FROM node:24.19.0-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY LICENSE ./LICENSE
USER node
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "./dist/server/entry.mjs"]
