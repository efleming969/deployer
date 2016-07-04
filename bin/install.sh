#!/bin/bash

echo 'this script does not do anything currently.  follow the steps manually'

# apt update
# apt upgrade

# install and setup nginx with tls certificates
########################################################################################
# apt install letsencrypt
# letsencrypt certonly
# apt install nginx
#
# configure nginx to new letsencrypt certificate
# listen 443 ssl default_server;
# listen [::]:443 ssl default_server;

# ssl_certificate /etc/letsencrypt/live/sudogs.com/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/sudogs.com/privkey.pem;

# node js and deployer
########################################################################################
# curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
# apt install -y build-essential docker.io nodejs
# git clone https://github.com/efleming969/deployer.git
# systemctl enable /home/erick/deployer/bin/deployer.service

