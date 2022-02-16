#!/bin/bash

read -p "Type certificate Common Name (CN), in other words website hostname, e.g. muso.dev (default: localhost): " hostname
hostname=${hostname:-localhost}
hostname_filename=${hostname//./-}

read -p "Type certificate file name (default: $hostname_filename): " filename
filename=${filename:-$hostname_filename}

openssl req -x509 -out $filename.crt -keyout $filename.key -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj "/CN=$hostname" -extensions EXT -config <( \
   printf "[dn]\nCN=$hostname\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:$hostname\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

if [ $? -eq 0 ]
then
  echo 'Done! Certificates generated to current working directory.'
else
  echo 'Fail! We could not generate certificates'
fi
