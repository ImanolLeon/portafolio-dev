# Etapa 1: build
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG PUBLIC_WEB3FORMS_KEY
ENV PUBLIC_WEB3FORMS_KEY=$PUBLIC_WEB3FORMS_KEY

RUN pnpm build

# Etapa 2: servir estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]