FROM node:14-alpine

WORKDIR /workspace/

COPY package.json yarn.lock /workspace/

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV=production
ARG NODE_ENV=${NODE_ENV}
ARG MONGO_USER=${MONGO_USER}
ARG MONGO_PASSWORD=${MONGO_PASSWORD}
ARG MONGO_DATABASE=${MONGO_DATABASE}

CMD ["yarn", "start:prod"]