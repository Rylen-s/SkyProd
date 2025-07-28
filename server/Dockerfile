# Use an LTS Node base
FROM node:24-alpine

# where our code will live
WORKDIR /usr/src/app

# install only what's needed for production
COPY package*.json ./
RUN npm ci --only=production

# bring in our server code
COPY . .

# load .env at runtime
ENV NODE_ENV=production

# expose your Express port
EXPOSE 8080

# start the server
CMD ["node", "server.js"]
