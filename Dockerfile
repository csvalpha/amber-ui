FROM madnificent/ember:3.0.1 as ember
MAINTAINER C.S.V. Alpha <ict@csvalpha.nl>

ARG DEPLOY_TARGET='production'

# Install NPM Token
ARG FA5_TOKEN
COPY .buildkite/build_npmrc.sh /app/.buildkite/build_npmrc.sh
RUN /app/.buildkite/build_npmrc.sh

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --ignore-engines

COPY . /app
RUN DEPLOY_TARGET=$DEPLOY_TARGET ember build --environment=production

FROM nginx:1.15.5-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=ember /app/dist /usr/share/nginx/html
