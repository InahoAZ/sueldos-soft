FROM node:16

WORKDIR /usr/src/app

#Instalamos las dependencias
COPY package*.json ./

RUN npm install

RUN npm install nodemon -g --quiet

COPY . .

CMD ["nodemon", "server.js"]

