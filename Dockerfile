FROM node:9.5-alpine

EXPOSE 8000

RUN apk update && \
    apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing vips-tools vips-dev fftw-dev gcc g++ make libc6-compat && \
    apk add git && \
    apk add python && \
    apk add bash && \
    rm -rf /var/cache/apk/*

RUN npm install --global gatsby --no-optional gatsby@1.9

RUN mkdir -p /site
WORKDIR /site
VOLUME /site

RUN echo 'alias ll="ls -lah"' >> ~/.bashrc
