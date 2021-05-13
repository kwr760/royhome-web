#!/bin/bash

scripts=/var/scripts
repo=${1}
deployment=${2}
type=${3}

echo "installing ${repo} as ${deployment}"
cd ${LOCATION}/${deployment}

echo "yarn install"
yarn install

echo "copy .env"
cp ${scripts}/${repo}/dotenv/${type}/${deployment} .env

echo "setup the nginx"
rm /etc/nginx/sites-enabled/nginx.http.conf
ln -s /etc/nginx/sites-available/nginx.http.conf /etc/nginx/sites-enabled/nginx.http.conf
rm /etc/nginx/sites-enabled/nginx.https.conf
ln -s /etc/nginx/sites-available/nginx.https.${deployment}.conf /etc/nginx/sites-enabled/nginx.https.conf
