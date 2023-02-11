#!/bin/bash

# blue/green
deployment=${1}

scripts=/usr/royhome/scripts
web=/usr/royhome/web/${deployment}

echo "installing web as ${deployment}"
cd "${web}" || exit
pwd
echo "yarn install"
yarn install
echo "copy .env"
cp "${scripts}/web/prod/dotenv.${deployment}" .env
echo "yarn webpack:prod"
yarn webpack:prod
echo "completed"
