FROM node:12-alpine

COPY ./ /app
WORKDIR /app

RUN npm install \
    && npm run build:client \
    && npm run build:server

CMD ["npm", "run", "prod"]
EXPOSE 3000
