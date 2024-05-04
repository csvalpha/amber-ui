FROM danlynn/ember-cli:4.11.0@sha256:ec33e1a99bb5bd0b610f33b7e5c7cc09946a94f8d5686746939c82932257e747 AS base

ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .


FROM base AS builder


FROM builder as development

RUN DEPLOY_TARGET='development' BUILD_HASH=$BUILD_HASH ember build --environment=development


FROM builder as production

RUN DEPLOY_TARGET='production' BUILD_HASH=$BUILD_HASH ember build --environment=production

FROM nginx:1.24.0-alpine@sha256:b7db705c8986070be8aa99ec0886886ddb3c75b1e46301f54865b16db79e9e52
LABEL maintainer="C.S.V. Alpha <ict@csvalpha.nl>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /opt/app/dist /usr/share/nginx/html
