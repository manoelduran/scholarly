# Estágio de desenvolvimento
FROM node:23-alpine AS development
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# Estágio de produção
FROM node:23-alpine AS production
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod
CMD ["node", "dist/main"]
