FROM node:8.1-alpine

ARG API_HOSTNAME
ENV API_HOSTNAME=${API_HOSTNAME}
ENV RUNNING_ENV="docker"

RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

COPY package.json /opt/frontend
RUN npm install

ADD . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
