import iamClient from '../clients/iamClient.mjs';
import { DetachRolePolicyCommand } from '@aws-sdk/client-iam';

const detachSingleRolePolicy = async ({ roleName, policyArn }) => {
    try {
      const data = await iamClient.send(new DetachRolePolicyCommand({
        PolicyArn: policyArn,
        RoleName: roleName
      }));
      return data;
    } catch (error) {
     throw new Error(error);
    }
};

export default detachSingleRolePolicy;

