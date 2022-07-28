import iamClient from '../clients/iamClient.mjs';
import { AttachRolePolicyCommand } from '@aws-sdk/client-iam';

const attachSingleRolePolicy = async ({ roleName, policyArn }) => {
    try {
      const data = await iamClient.send(new AttachRolePolicyCommand({
        PolicyArn: policyArn,
        RoleName: roleName
      }));
      return data;
    } catch (error) {
      console.log('Error', error);
    }
};

export default attachSingleRolePolicy;