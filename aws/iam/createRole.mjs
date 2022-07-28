import iamClient from '../clients/iamClient.mjs';
import { CreateRoleCommand } from '@aws-sdk/client-iam';
import { LambdaAssumeRolePolicy } from '../constants/lambdaAWSPoliciesConst.mjs';

const createRole = async (roleName) => {
  const roleParams = {
      AssumeRolePolicyDocument: LambdaAssumeRolePolicy,
      Path: '/',
      RoleName: roleName
  };
    try {
      const data = await iamClient.send(new CreateRoleCommand(roleParams));
      return data.Role.Arn;
    } catch (error) {
     throw new Error(error);
    }
};

export default createRole;

