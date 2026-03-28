#!/bin/bash

docker build -t app -f src/app/Dockerfile src/app

docker save app -o built/app.tar

docker build -t homelab-pwnlab -f Dockerfile .
