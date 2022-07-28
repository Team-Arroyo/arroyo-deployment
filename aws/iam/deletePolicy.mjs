import iamClient from '../clients/iamClient.mjs';
import { DeletePolicyCommand } from '@aws-sdk/client-iam';

const deletePolicy = async ({ policyArn }) => {
    try {
      await iamClient.send(new DeletePolicyCommand({
        PolicyArn: policyArn
    }));

    } catch (error) {
      throw new Error(error);
    }
};

export default deletePolicy;