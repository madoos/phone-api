#!/usr/bin/env bash -e

docker stop mongo-instance
docker rm mongo-instance
rm -rf ~/.bin/mongo/_mongo-data