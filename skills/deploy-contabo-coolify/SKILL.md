---
name: deploy-contabo-coolify
description: Use when setting up or deploying an Astro standalone Node website on a Contabo VPS with self-hosted Coolify.
---

# Host an Astro website on Contabo and Coolify

Reuse the existing VPS and Coolify installation when available. The website runs in one Node container; Coolify handles the public proxy and HTTPS. Honor the user's authorization for server changes.

## Prepare the server

For a new VPS, use Ubuntu 24.04 LTS and SSH key access. Coolify needs at least 2 CPU cores, 2 GB RAM and 10 GB disk; allow additional capacity for builds and retained images.

Use the Contabo firewall to allow public TCP 80 and 443. Restrict SSH to the addresses needed by the operators and Coolify, keeping the current session open while checking access. Restrict direct dashboard ports 8000, 6001 and 6002 to operators while setting up Coolify. Docker-published ports can bypass ordinary UFW rules.

On a fresh server without Coolify, connect by SSH with root or sudo access and run:

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh -o /tmp/coolify-install.sh
sudo bash /tmp/coolify-install.sh
```

Create the first administrator immediately. Configure an HTTPS domain for the Coolify dashboard, verify it works, then close public access to the direct dashboard ports. Back up `/data/coolify/source/.env` privately. Validate the selected server in Coolify.

## Deploy the website

1. Connect the repository through Coolify's GitHub integration. Select the branch, server and project environment.
2. Select the Dockerfile build pack, repository root as the build context, `/Dockerfile` as its path and exposed port `4321`. Use runtime `HOST=0.0.0.0` and `PORT=4321`. The image includes a health check. The base template needs no volumes or application credentials.
3. Set public `SITE_URL` to the final origin and make it available during the build. Enable source commit availability during the build in Advanced → Build so Coolify supplies `SOURCE_COMMIT` (older versions call this Include Source Commit in Build). These are public Docker build arguments; keep private credentials in runtime variables or explicitly configured build secrets.
4. Point the domain's A record at the VPS IPv4 address. Add an AAAA record only if IPv6 works on that server. In Coolify, set the application domain with HTTPS and destination port, for example `https://example.com:4321`. Visitors use public port 443; Coolify forwards requests to container port 4321 and obtains the certificate.
5. Deploy. Check the home page, static assets, a missing route returning 404, `/healthz` returning `ok` and `/build.json` matching the deployed Git commit. Check HTTPS and important browser flows. Enable indexing only when the website is ready. Enable automatic deployments if that is the project's normal workflow.

Retain the previous image and working configuration. If a deployment fails, redeploy the previous commit or image and verify its marker and routes. Record the server, domain, commit and checks in the project task without credentials. Keep an existing CDN only when the project already uses one.
