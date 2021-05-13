#!/bin/bash

scripts=/var/scripts
repo=${1}
deployment=${2}
type=${3}

source ${scripts}/${repo}/env/${type}

echo "installing ${repo} as ${deployment}"
echo cd ${LOCATION}/${deployment}
cd ${LOCATION}/${deployment}
pwd

echo "yarn install"
yarn install
pwd
echo "copy .env"
cp ${scripts}/${repo}/dotenv/${type}/${deployment} .env

echo "setup the nginx"
rm /etc/nginx/sites-enabled/nginx.http.conf
ln -s /etc/nginx/sites-available/nginx.http.conf /etc/nginx/sites-enabled/nginx.http.conf
rm /etc/nginx/sites-enabled/nginx.https.conf
ln -s /etc/nginx/sites-available/nginx.https.${deployment}.conf /etc/nginx/sites-enabled/nginx.https.conf

