FROM node:argon

ENV NPM_CONFIG_PRODUCTION=false
ENV NODE_ENV=production
ENV PORT=8080

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm config set ignore-scripts false
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
