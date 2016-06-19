#!/bin/bash

./node_modules/.bin/letsencrypt certonly \
  --standalone \
  --config-dir ~/letsencrypt/etc \
  --agree-tos \
  --domains sudogs.com \
  --email erick@sudogs.com
