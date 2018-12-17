#!/usr/bin/env bash -e

OPT=$1
docker run --tty=true $OPT -p 27017:27017 -v ~/.bin/mongo/_mongo-data:/data/db --name mongo-instance mongo:latest