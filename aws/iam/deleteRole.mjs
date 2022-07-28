import iamClient from '../clients/iamClient.mjs';
import { DeleteRoleCommand } from '@aws-sdk/client-iam';

const deleteRole = async ({ roleName }) => {
    try {
      await iamClient.send(new DeleteRoleCommand({
        RoleName: roleName
    }));

    } catch (error) {
      console.log('Error', error);
    }
};

export default deleteRole;