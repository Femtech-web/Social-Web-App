FROM        node:21.6.1-alpine as builder

COPY        package.json /srv/client/
WORKDIR     /srv/client/

RUN         npm install 
RUN         npm run build

CMD         ["npm", "run", "start"]
