#!/bin/sh
set -e

# Replace env vars in Nginx template
envsubst '${API_URL}' < /etc/nginx/conf.d/nginx.conf.template \
    > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
