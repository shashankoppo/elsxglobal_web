# ═══════════════════════════════════════════════════════════════════════════
# ELSxGlobal - Production-Ready Multi-Stage Docker v2
# Next.js 13 + Static Export + Nginx
# ═══════════════════════════════════════════════════════════════════════════

# ──────────────────────────────────────────────────────────────────────────
# STAGE 1: Dependencies
# ──────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# ──────────────────────────────────────────────────────────────────────────
# STAGE 2: Builder
# ──────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
ARG NEXT_PUBLIC_ODOO_URL
ARG NEXT_PUBLIC_ODOO_DB

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=$NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
ENV NEXT_PUBLIC_ODOO_URL=$NEXT_PUBLIC_ODOO_URL
ENV NEXT_PUBLIC_ODOO_DB=$NEXT_PUBLIC_ODOO_DB

# Build the application
RUN npm run build

# ──────────────────────────────────────────────────────────────────────────
# STAGE 3: Production Runner (Nginx)
# ──────────────────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/dist ./

# Create health check endpoint
RUN echo '{"status":"healthy","service":"elsxglobal"}' > /usr/share/nginx/html/health

# Add security headers and optimizations
RUN echo 'server_tokens off;' >> /etc/nginx/nginx.conf && \
    sed -i 's/worker_processes  auto;/worker_processes  auto;\nworker_rlimit_nofile 65535;/' /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
