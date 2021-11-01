FROM madnificent/ember:3.17.0 as ember
MAINTAINER C.S.V. Alpha <ict@csvalpha.nl>

ARG DEPLOY_TARGET='production'
ARG BUILD_HASH='unknown'

WORKDIR /opt/app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .
RUN DEPLOY_TARGET=$DEPLOY_TARGET BUILD_HASH=$BUILD_HASH ember build --environment=production

FROM nginx:1.17-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=ember /app/dist /usr/share/nginx/html
