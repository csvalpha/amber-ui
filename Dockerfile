FROM danlynn/ember-cli:5.9.0@sha256:dc58367f428559044d1381dfe4ad7eb2b97cbc9e76162e1c215f7546fa8be36e AS base

ARG DEPLOY_TARGET='production'
ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .


FROM base AS builder

RUN DEPLOY_TARGET=$DEPLOY_TARGET BUILD_HASH=$BUILD_HASH ember build --environment=production


FROM nginx:1.24.0-alpine@sha256:b7db705c8986070be8aa99ec0886886ddb3c75b1e46301f54865b16db79e9e52
LABEL maintainer="C.S.V. Alpha <ict@csvalpha.nl>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /opt/app/dist /usr/share/nginx/html
