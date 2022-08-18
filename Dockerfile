FROM danlynn/ember-cli:3.28.5@sha256:e51e83121cefac0ba13c2a39f60623532c99386e418f18f4d03b9f554058a6ae AS base

ARG DEPLOY_TARGET='production'
ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .


FROM base AS builder

RUN DEPLOY_TARGET=$DEPLOY_TARGET BUILD_HASH=$BUILD_HASH ember build --environment=production


FROM nginx:1.23.1-alpine@sha256:082f8c10bd47b6acc8ef15ae61ae45dd8fde0e9f389a8b5cb23c37408642bf5d
LABEL maintainer="C.S.V. Alpha <ict@csvalpha.nl>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /opt/app/dist /usr/share/nginx/html
