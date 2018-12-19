#!/usr/bin/env bash -e

docker-compose up -d
npm install
npm run fixtures