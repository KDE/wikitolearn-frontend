FROM node:alpine

RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

ADD package.json /opt/frontend
RUN yarn

ARG CLIENT_API_HOSTNAME
ENV CLIENT_API_HOSTNAME=${CLIENT_API_HOSTNAME}
ARG CLIENT_AUTH_HOSTNAME
ENV CLIENT_AUTH_HOSTNAME=${CLIENT_AUTH_HOSTNAME}

ARG SERVER_API_HOSTNAME
ENV SERVER_API_HOSTNAME=${SERVER_API_HOSTNAME}
ARG SERVER_AUTH_HOSTNAME
ENV SERVER_AUTH_HOSTNAME=${SERVER_AUTH_HOSTNAME}

ENV RUNNING_ENV="docker"

ADD . .
RUN yarn run build

EXPOSE 8080

CMD ["npm", "run", "start"]
