FROM node:alpine

WORKDIR /grpcServer

COPY /serverApp .

RUN npm i

WORKDIR /grpcServer/src

CMD ["node", "server.js"]