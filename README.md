# RoyHome Web Server

## Purpose

A react SSR web server using react redux and material-ui.

## Running

Use these steps to start locally as a build.

### docker

To run the web site locally, the easiest way is with docker.  This avoids the issues you will face with setting up
the server /etc/hosts, nginx and the handling of the https certificates.  Actually https is not used with this
docker installation.

```shell
docker-compose up
```
### compiling and running

#### development
```shell
yarn start webpack:dev
yarn start run:dev
```

#### production

Follow the commands for dev, except replace `dev` with `prod`.

## Encryption

### travis encryption

Travis supports one encrypted file for a repository.  If more than one files needs to be encrypted
tar the files together and encrypt the tar file. 

In order to be able to copy files to the linode production server we need a secure login.  This is done by the 
key file.  I'm placing the file in the tar and encrypting it so that key file is not available to github.  Keeping 
this file in github will only allow travis access to the contents of the tar file.

```shell
tar cvf secrets.tar private-key .env
cp secrets.tar <project>/.travis
travis encrypt-file secrets.tar
rm <project>/.travis/secrets.tar
```

## Certificate - https

### letsencrypt

letsencrypt provides free https certificates.  I'm using a script which runs periodically to renew the certificate.

#### create
```shell
sudo certbot certonly --manual -d royk.us -d www.royk.us -d royhome.net -d www.royhome.net -d api.royk.us -d api.royhome.net
```
#### renewal
```shell
sudo -H certbot renew --standalone
```

## Reverse Proxy

### hosts file
For development, the url needs to redirected to the localhost
```shell
127.0.0.1 localhost royk.us api.royk.us
```

This keeps the request from being directed to the production and the request is processed on the local machine.

Since I have two url, I can develop with `royk.us`, while still see the released production version on `royhome.net`.

### nginx

I am using ngnix to direct my request to the correct server.  `<royk.us|royhome.net>` goes to the web server, for production I run a 
blue/green environment mainly to limit the downtime when releasing.  The downtime currently is the time to bounce
the ngnix server, very quick.  `api.<royk.us|royhome.net>` directs the requests to the API server.

## Production

I am using the linux systemd to start the web server as a service, so that reboot will handle the restart of the web
server.

I used `pm2` for a while, I had no complaints. I stopped using it as it adds a layer without benefit to me.  My linode
server is very small and has only one cpu.  I believe the benefits of the `pm2` is creating a cluster, and handling 
server crashes.  When I need to upgrade my server to something with more cpus, I think I start using `pm2` again.

When I need more than one instance of the web server, I need to understand how to create a load balancer.  Easy 
solution and expensive, AWS.  I wonder if `pm2` will be able to load balancer, or probably `nginx`.


