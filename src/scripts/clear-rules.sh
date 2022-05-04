#!/bin/bash
SG_ID='sg-05e2452adb3981e96'

# Clear Security group rules
for i in $(aws ec2 describe-security-group-rules --filter Name="group-id",Values="$SG_ID" | jq '.SecurityGroupRules[].SecurityGroupRuleId' -r);
do
  aws ec2 revoke-security-group-ingress --group-id $SG_ID --security-group-rule-ids $i;
done

# /api-add-ip-security-group-aws/src/scripts/clear-rules.sh