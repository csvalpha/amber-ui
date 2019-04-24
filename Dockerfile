FROM madnificent/ember:3.0.1 as ember
MAINTAINER C.S.V. Alpha <ict@csvalpha.nl>

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --ignore-engines

COPY . /app
RUN ember build --environment=production

FROM nginx:1.15.5-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
COPY --from=ember /app/dist /usr/share/nginx/html
