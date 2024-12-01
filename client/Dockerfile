FROM node:alpine

WORKDIR /grpcClient

COPY /clientApp .

RUN npm i

WORKDIR /grpcClient/src

CMD ["node", "client.js"]
