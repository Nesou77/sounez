# ── Stage 1: Build TypeScript ─────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ── Stage 2: Production image ─────────────────────────────────────────────────
FROM node:20-slim

# Install LibreOffice (Writer + Draw) for PDF → DOCX conversion.
# Draw is required for the "preserve layout" mode (--draw flag).
# Liberation fonts are metrically identical to MS Office fonts, which prevents
# text overflow when LibreOffice renders PDFs that embed Windows fonts.
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      libreoffice-writer \
      libreoffice-draw \
      libreoffice-impress \
      fonts-liberation \
      fonts-dejavu-core \
      fontconfig \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

WORKDIR /app

# Production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts

# Compiled JS from builder stage
COPY --from=builder /app/dist ./dist

# Non-root user for security
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home sounez && \
    mkdir -p /tmp/sounez && chown sounez:nodejs /tmp/sounez

USER sounez

ENV NODE_ENV=production \
    PORT=10000 \
    TEMP_DIR=/tmp/sounez

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]
