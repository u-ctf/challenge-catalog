#!/bin/bash

img_amount=$(docker images | wc -l)
if [ $img_amount -gt 1 ]; then
    echo "Images already loaded"
    exit 0
fi

loaded=$(docker load < /app.tar)

# Extract image ID (sha256:...)
image_id=$(echo "$loaded" | awk '{print $4}')
echo $image_id

# Tag it
docker tag "$image_id" webapp:latest

mkdir -p /home/user/nas_storage
chmod a+w -R /home/user/nas_storage

cd /home/admin && docker compose up -d
