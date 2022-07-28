import attachSingleRolePolicy from './attachSingleRolePolicy.mjs';

const attachMultipleRolePolicies = async ({ policyARNArray, roleName }) => {

    try {
      for (let index = 0; index < policyARNArray.length; index++) {
        await attachSingleRolePolicy({ roleName, policyArn: policyARNArray[index]});
      }
      return true;
    } catch (error) {
      console.log('Error', error);
    }
};

export default attachMultipleRolePolicies;