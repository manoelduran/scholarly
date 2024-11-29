FROM node:23-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/task-processor apps/task-processor
COPY libs libs
# install specific dependencies recursively
RUN pnpm install -r

#  build application
RUN pnpm run build task-processor

# production image
FROM node:23-alpine AS production
ARG NODE_ENV=production
#  set node environment as argument
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod
#  copy dist folder from development to production ( it will ignore dev dependencies)
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/task-processor/main"]

