#!/bin/bash

cd /home/erick/webowler

/usr/bin/git pull
/usr/bin/docker build -t gcr.io/sudogs-apps/webowler:$1 .
/home/erick/google-cloud-sdk/bin/gcloud docker push gcr.io/sudogs-apps/webowler:$1
/home/erick/google-cloud-sdk/bin/kubectl apply -f deployment.yml

exit 0

