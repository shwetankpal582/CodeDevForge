FROM node:20-bullseye AS frontend-deps
WORKDIR /app
# Install only frontend deps (including dev) to get vite
COPY frontend/package*.json ./frontend/
RUN npm ci --prefix frontend --include=dev

FROM node:20-bullseye AS frontend-build
WORKDIR /app
COPY --from=frontend-deps /app/frontend/node_modules ./frontend/node_modules
COPY frontend ./frontend
RUN npm --prefix frontend run build

FROM node:20-bullseye AS backend
WORKDIR /app
ENV NODE_ENV=production
# Copy backend manifests and install only production deps
COPY backend/package*.json ./backend/
RUN npm ci --prefix backend --omit=dev

# Copy backend source and built frontend assets
COPY backend ./backend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5000
WORKDIR /app/backend
CMD ["npm", "start"]



