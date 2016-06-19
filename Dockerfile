FROM node:5.11

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app
RUN npm install

# copy sources into working directory
# COPY . /usr/src/app

# make available on port 8080
EXPOSE 80

#CMD node src/server/Main.js
