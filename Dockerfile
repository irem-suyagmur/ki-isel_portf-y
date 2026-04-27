# ──────────────────────────────────────────────
# Stage 1: Build (no npm needed for plain HTML)
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all static assets
COPY index.html ./
COPY style.css ./
COPY script.js ./
COPY assets/ ./assets/
COPY nginx.conf ./

# Optional: run html-minifier for smaller payload
RUN npm install -g html-minifier-terser@7 --silent 2>/dev/null || true
RUN html-minifier-terser \
      --collapse-whitespace \
      --remove-comments \
      --minify-css true \
      --minify-js true \
      index.html -o index.min.html 2>/dev/null \
    && mv index.min.html index.html || true

# ──────────────────────────────────────────────
# Stage 2: Serve with nginx (~30 MB final image)
# ──────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/style.css  /usr/share/nginx/html/
COPY --from=builder /app/script.js  /usr/share/nginx/html/
COPY --from=builder /app/assets/    /usr/share/nginx/html/assets/

# Custom nginx config (health + gzip + security headers)
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Create 404 page
RUN echo '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>404 · İrem Yıldız</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"></head><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:1rem;background:var(--clr-bg);color:var(--clr-text)"><h1 style="font-size:6rem;margin:0;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">404</h1><p style="font-size:1.25rem;color:#94a3b8">Sayfa bulunamadı</p><a href="/" style="color:#6366f1;text-decoration:underline">Ana sayfaya dön</a></body></html>' \
    > /usr/share/nginx/html/404.html

# Health check endpoint served by nginx
RUN echo '{"status":"ok","service":"portfolio","version":"1.0.0"}' \
    > /usr/share/nginx/html/health.json

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
