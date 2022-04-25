#!/bin/bash

SG_ID='sg-05e2452adb3981e96'
IP=$1

aws ec2 describe-security-group-rules --filter Name="group-id",Values="$SG_ID" | jq '.SecurityGroupRules[].CidrIpv4' -r | cut -d'/' -f1 | grep -q $IP;
status=$?
[ $status -eq 0 ] && echo "$IP in the rules" || echo "$IP not in the rules"