#!/bin/bash

SG_ID='sg-05e2452adb3981e96'
IP=$1


# Clear Security group rules
for i in $(aws ec2 describe-security-group-rules --filter Name="group-id",Values="$SG_ID" | jq '.SecurityGroupRules[].SecurityGroupRuleId' -r);
do
  aws ec2 revoke-security-group-ingress --group-id $SG_ID --security-group-rule-ids $i;
done