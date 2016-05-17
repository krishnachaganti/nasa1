FROM mhart/alpine-node:6.1.0
MAINTAINER Steven Truesdell <steven@strues.io>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
# Bundle app source
COPY . /usr/src/app

#install deps, build, remove initial sources, dev deps
RUN npm i -q && \
    npm run compile && \
    npm prune -q --production

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
