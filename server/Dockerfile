FROM        node:21.6.1-alpine as builder

COPY        package.json /srv/server/
WORKDIR     /srv/server/

RUN         npm install 

COPY        .babelrc /srv/server/
COPY        .eslintrc.json /srv/server/
COPY        app.js /srv/server/
COPY        src /srv/server/src/
COPY        tests /srv/server/tests/

RUN         npm run build

FROM        node:21.6.1-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2@latest

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/server/build /srv/api/build
COPY        --from=builder /srv/server/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

CMD         ["npm", "start"]

USER        node