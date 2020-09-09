#!/bin/bash

touch /var/log/nginx/access.log /var/log/nginx/error.log
ln -sf /dev/stdout /var/log/nginx/access.log
ln -sf /dev/stderr /var/log/nginx/error.log
