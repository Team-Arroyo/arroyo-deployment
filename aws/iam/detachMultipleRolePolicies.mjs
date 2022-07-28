import detachSingleRolePolicy from './detachSingleRolePolicy.mjs';

const detachMultipleRolePolicies = async ({ policyARNArray, roleName }) => {

    try {
      for (let index = 0; index < policyARNArray.length; index++) {
        await detachSingleRolePolicy({ roleName, policyArn: policyARNArray[index]});
      }
      return true;
    } catch (error) {
      console.log('Error', error);
    }
};

export default detachMultipleRolePolicies;

// TODO change all err variables to error