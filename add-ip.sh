#!/bin/bash

SG_ID='sg-05e2452adb3981e96'
IP=$1

# Add IP to SG
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 3306 \
  --cidr $IP

echo "$1 Added";
