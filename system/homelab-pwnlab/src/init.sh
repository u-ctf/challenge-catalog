#!/bin/bash

img_amount=$(docker images | wc -l)
if [ $img_amount -gt 1 ]; then
    echo "Images already loaded"
    exit 0
fi

docker load < /app.tar

mkdir -p /home/user/nas_storage
chmod a+w -R /home/user/nas_storage

cd /home/admin && docker compose up -d
