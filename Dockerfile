FROM node:5.11

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app
RUN npm install

# copy sources into working directory
COPY . /usr/src/app

# make http & https available
EXPOSE 80 443

CMD node src/server/Main.js
