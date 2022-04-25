#!/bin/bash

SG_ID='sg-05e2452adb3981e96'
IP=$1

# Add IP to SG
aws ec2 authorize-security-group-ingress \
  --region us-east-1 \
  --group-id $SG_ID \
  --protocol tcp \
  --port 3306 \
  --cidr $IP/32 > /dev/null

echo "IP $IP added to SG $SG_ID"