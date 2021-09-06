#!/bin/bash

scripts=/var/scripts
repo=${1}
deployment=${2}
type=${3}

source ${scripts}/${repo}/env/${type}/.env

echo "installing ${repo} as ${deployment}"
cd ${LOCATION}/${deployment}
pwd

echo "yarn install"
yarn install
echo "copy .env"
cp ${scripts}/${repo}/dotenv/${type}/${deployment} .env
echo "yarn webpack:prod"
yarn webpack:prod

echo "completed"
