FROM danlynn/ember-cli:3.28.2@sha256:fe88d8ecf88086b77ef9a21b5ce523c8f1ae5402df5e25632bd3390be92a75a7 AS base

ARG DEPLOY_TARGET='production'
ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .


FROM base AS builder

RUN DEPLOY_TARGET=$DEPLOY_TARGET BUILD_HASH=$BUILD_HASH ember build --environment=production


FROM nginx:1.21.6-alpine@sha256:da9c94bec1da829ebd52431a84502ec471c8e548ffb2cedbf36260fd9bd1d4d3
LABEL maintainer="C.S.V. Alpha <ict@csvalpha.nl>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /opt/app/dist /usr/share/nginx/html
