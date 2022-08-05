FROM node:16
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["npm", "start"]
