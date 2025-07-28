# Use Node LTS
FROM node:24-alpine

WORKDIR /usr/src/app

# install expo-cli globally & deps
COPY package*.json ./
RUN npm install -g expo-cli \
 && npm ci

# copy your entire Expo app
COPY . .

# make sure we listen on all interfaces
EXPOSE 19006

# start the web build on 0.0.0.0 so Docker can publish it
CMD ["expo", "start", "--web", "--host", "0.0.0.0"]
