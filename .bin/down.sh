#!/usr/bin/env bash -e

docker-compose stop
docker-compose rm -f
rm -rf ./.data