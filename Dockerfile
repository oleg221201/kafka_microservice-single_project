FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock .env ./

RUN yarn install

COPY . .

RUN yarn run build

# ENV MS_NAME=${MS_NAME}

EXPOSE 3000

CMD npm run start