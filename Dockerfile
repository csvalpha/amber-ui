FROM danlynn/ember-cli:6.7.0@sha256:ec57f9088f77b6b26a9606b7460de6f139afc78838c43897354500bdff9d69f5 AS base

ARG DEPLOY_TARGET='production'
ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .


FROM base AS builder

RUN DEPLOY_TARGET=$DEPLOY_TARGET BUILD_HASH=$BUILD_HASH ember build --environment=production


FROM nginx:1.24.0-alpine@sha256:77e5d4a6ad906c5d3793764085706577fa705b1dc6f244ea0241c4b5e2155385
LABEL maintainer="C.S.V. Alpha <ict@csvalpha.nl>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=builder /opt/app/dist /usr/share/nginx/html
