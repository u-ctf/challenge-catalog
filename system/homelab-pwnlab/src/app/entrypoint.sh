#!/bin/sh

# always restart node.js, we don't want any downtime to occur!
while true; do
  node app.js
done
