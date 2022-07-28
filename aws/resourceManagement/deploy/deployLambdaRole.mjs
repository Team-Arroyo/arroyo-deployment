import createSQSSEndMessagePolicy from '../../iam/createSQSSendMessagePolicy.mjs';
import { REHYDRATE_LAMBDA_ROLE_NAME } from '../../constants/general.mjs';
import createRole from '../../iam/createRole.mjs';
import pause from '../../../utils/pause.js';
import attachMultipleRolePolicies from '../../iam/attachMultipleRolePolicies.mjs';
import { AWSXRayDaemonWriteAccessARN,
         AmazonS3ReadOnlyAccessARN,
         AWSLambdaSQSQueueExecutionRoleARN, 
         AWSLambdaBasicExecutionRoleARN } from '../../constants/lambdaAWSPoliciesConst.mjs';
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployLambdaRole = async ({ uuid, statusSQSArn }) => {
  try {
    const createSQSSendMessagePolicyResponce = await createSQSSEndMessagePolicy({ SQSArn: statusSQSArn, uuid});

    await pause(5000);
    config.set('SQSSendMessagePolicy', createSQSSendMessagePolicyResponce.Policy.Arn);

    const lambdaRoleName = `${REHYDRATE_LAMBDA_ROLE_NAME}-${uuid}`;
    const lambdaRoleArn = await createRole(lambdaRoleName);

    await pause(10000);
    
    config.set('lambdaRoleArn', lambdaRoleArn);
    config.set('lambdaRoleName', lambdaRoleName);
    
    await attachMultipleRolePolicies({ 
      policyARNArray: 
      [
        AWSXRayDaemonWriteAccessARN, 
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN,
        createSQSSendMessagePolicyResponce.Policy.Arn
      ], 
      roleName: lambdaRoleName 
    });

  } catch (error) {
    throw new Error(error);
  }
}

export default deployLambdaRole;