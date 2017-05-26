FROM nginx:1.13.0-alpine

RUN apk add --update bash

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./listen.conf /etc/nginx/

RUN mkdir /dist
COPY ./static/index.html /dist/index.html
COPY ./dist/buildle.js /dist/buildle.js

COPY ./static/sw.js /dist/service_worker.js
COPY ./static/fonts /dist/fonts
COPY ./static/imgs /dist/imgs

CMD /bin/bash -c "echo \"listen $PORT;\" > /etc/nginx/listen.conf && nginx -g 'daemon off;'"