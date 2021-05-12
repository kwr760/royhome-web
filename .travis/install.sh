#!/bin/bash

scripts=/var/scripts
deployment=${1}

echo "installing royhome-web"
cp ${scripts}/
rm /etc/nginx/sites-enabled/nginx.http.conf
ln -s /etc/nginx/sites-available/nginx.http.conf /etc/nginx/sites-enabled/nginx.http.conf
rm /etc/nginx/sites-enabled/nginx.https.conf
ln -s /etc/nginx/sites-available/nginx.https.${deployment}.conf /etc/nginx/sites-enabled/nginx.https.conf
