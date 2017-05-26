FROM nginx:1.13.0-alpine

RUN apk add --update bash

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./listen.conf /etc/nginx/

RUN mkdir /dist
COPY ./public/index.html /dist/index.html
COPY ./dist/bundle.js /dist/bundle.js

COPY ./static/sw.js /dist/sw.js
COPY ./static/fonts /dist/fonts
COPY ./static/images /dist/images
COPY ./static/sounds /dist/sounds

CMD /bin/bash -c "echo \"listen $PORT;\" > /etc/nginx/listen.conf && nginx -g 'daemon off;'"