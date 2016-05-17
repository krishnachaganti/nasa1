FROM strues/alpine-base
MAINTAINER Steven Truesdell <steven@strues.io>

RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk add --no-cache boost-dev mongodb \
  && mkdir -p /data/db \
  && rm -rf /var/cache/apk/*

EXPOSE 27017
VOLUME ['/data/db']

ENTRYPOINT ["usr/bin/mongod"]
