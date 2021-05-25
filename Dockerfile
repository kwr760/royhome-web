FROM node:12.18.4-alpine

WORKDIR /var/app/royhome-web
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .

RUN mkdir -p /var/log/royhome/docker
RUN chmod 777 /var/log/royhome/docker

CMD yarn run docker
