FROM node:16.14-alpine
COPY src/ /opt/polling-service/src
COPY package.json /opt/polling-service/
COPY package-lock.json /opt/polling-service/
COPY tsconfig.json /opt/polling-service/

WORKDIR /opt/polling-service
RUN npm install

CMD [ "npm", "run", "start" ]