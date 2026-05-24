# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Build TypeScript
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Production image with LibreOffice
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-slim AS runner

# Install LibreOffice headless + minimal font support
# --no-install-recommends keeps the image lean (~400 MB total)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      libreoffice-writer \
      libreoffice-impress \
      libreoffice-calc \
      fonts-liberation \
      fonts-dejavu-core \
      fontconfig \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Rebuild font cache
RUN fc-cache -fv

WORKDIR /app

# Copy only production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Non-root user for security
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home sounez

# Temp directory owned by app user
RUN mkdir -p /tmp/sounez && chown sounez:nodejs /tmp/sounez

USER sounez

ENV NODE_ENV=production \
    PORT=3001 \
    TEMP_DIR=/tmp/sounez

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]
