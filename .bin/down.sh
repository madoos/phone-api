#!/usr/bin/env bash -e

docker-compose stop db
docker-compose rm -f db
rm -rf ./.data