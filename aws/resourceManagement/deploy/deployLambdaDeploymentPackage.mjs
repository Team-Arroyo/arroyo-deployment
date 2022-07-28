import pause from "../../../utils/pause.js";
import createS3Bucket from "../../s3/createS3Bucket.mjs";
import uploadObjectToBucket from "../../s3/uploadObjectToBucket.mjs";
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME } from '../../constants/lambdaDeploymentPackage.mjs'

const deployLambdaDeploymentPackage = async ({ lambdaS3BucketName }) => {
  try {
    await createS3Bucket(lambdaS3BucketName);
    config.set('lambdaS3BucketName', lambdaS3BucketName);
    await pause(10000);
    await uploadObjectToBucket({ 
      fileName: DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
      bucketName: lambdaS3BucketName
    });

  } catch (error) {
    throw new Error(error);
  }
}

export default deployLambdaDeploymentPackage;