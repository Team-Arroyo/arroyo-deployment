import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME,
         DEPLOYMENT_PACKAGE_RUNTIME,
         DEPLOYMENT_PACKAGE_HANDLER 
        } from '../../constants/lambdaDeploymentPackage.mjs';
import fs from 'fs';
import Configstore from 'configstore';
import pause from '../../../utils/pause.js';
import createLambda from '../../lambda/createLambda.mjs'
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployRehydrateLambda = async ({ lambdaS3BucketName, statusSQSUrl, lambdaRoleArn, rehydrateLambdaName }) => {
  try {
    const rehydrateLambdaParams= {
      Code: {
        S3Bucket: lambdaS3BucketName,
        S3Key: DEPLOYMENT_PACKAGE_ARCHIVE_NAME
      },
      Environment: {
        Variables: {
          STATUS_QUEUE_URL: statusSQSUrl
        }
      }
      ,
      FunctionName: rehydrateLambdaName,
      Role: lambdaRoleArn,
      Runtime: DEPLOYMENT_PACKAGE_RUNTIME,
      Handler: DEPLOYMENT_PACKAGE_HANDLER
    }
    
    await createLambda(rehydrateLambdaParams);
    await pause(5000);
    config.set('lambdaName', rehydrateLambdaName);

  } catch (error) {
    throw new Error(error);
  }
}

export default deployRehydrateLambda;