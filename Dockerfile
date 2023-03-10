FROM node:latest

WORKDIR /app

COPY tsconfig*.json ./
COPY package*json ./

RUN npm install

COPY . .

CMD ["npm","run","start:dev"]