import { AWSXRayDaemonWriteAccessARN,
  AmazonS3ReadOnlyAccessARN,
  AWSLambdaSQSQueueExecutionRoleARN, 
  AWSLambdaBasicExecutionRoleARN } from '../../constants/lambdaAWSPoliciesConst.mjs';

import 'dotenv/config.js';
import Configstore from 'configstore';
import fs from 'fs';
import deleteAllObjectsS3Bucket from '../../s3/deleteAllObjectsInS3Bucket.mjs';
import deleteS3Bucket from '../../s3/deleteS3Bucket.mjs';
import detachMultipleRolePolicies from '../../iam/detachMultipleRolePolicies.mjs';
import deleteRole from '../../iam/deleteRole.mjs';
import deletePolicy from '../../iam/deletePolicy.mjs';
import deleteLambda from '../../lambda/deleteLambda.mjs';
import deleteQueue from '../../sqs/deleteQueue.mjs';
import deleteEventSourceMapping from '../../lambda/deleteEventSourceMapping.mjs';
import arroyoHeader from '../../../utils/figlet.mjs';
import pause from '../../../utils/pause.js';
import ora from 'ora';
import chalk from 'chalk';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
const log = console.log;
const errorMessage = chalk.bold.red;

const destroyResources = async () => {    

  const { lambdaS3BucketName, RehydrateSQSDLQUrl, StatusSQSDLQUrl, RehydrateSQSUrl, 
    RehydrateSQSArn, StatusSQSUrl, StatusSQSArn, lambdaRoleArn,
    lambdaRoleName, lambdaName, eventSourceMappingUUID, SQSSendMessagePolicy } = config.all;
    arroyoHeader();
    await pause(2000);

    const spinner = ora({
      text: 'Getting ready to tear down Arroyo infrastructure',
      color: 'yellow'
    }).start();

    await pause(2000);
    
    spinner.stop();
    spinner.start('Removing Lambda Deployment package');
    // All objects in the S3 bucket must be removed first, only then we can remove the bucket itself
    try {
    await pause(2000);
    await deleteAllObjectsS3Bucket({Bucket: lambdaS3BucketName});
  } catch (error) {
    spinner.fail('There was an error when removing deployment package for Lambda Function. Error: ', error);
    log(errorMessage(error));
  }
  
  try {
    await pause(10000);
    await deleteS3Bucket({Bucket: lambdaS3BucketName});
    spinner.succeed('Deployment package for Lambda function has been removed');
    await pause(2000);
  } catch (error) {
    spinner.fail('There was an error when removing deployment package for Lambda function. Error: ', error);
    log(errorMessage(error));
  }
  
  // First need to detach all policies from the role and only then, 
  // we are able to remove the role itself
  try {
    await pause(1000);
    spinner.start('Removing IAM Lambda role');
    await detachMultipleRolePolicies({ 
      policyARNArray: [
        AWSXRayDaemonWriteAccessARN,
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN,
        SQSSendMessagePolicy
      ], 
      roleName: lambdaRoleName 
    });
  } catch (error) {
    spinner.fail('There was an error when removing IAM Lambda role');
    log(errorMessage(error));
  }

  try {
    await pause(2000);
    await deletePolicy({ policyArn: SQSSendMessagePolicy });
    await pause(2000);
  } catch (error) {    
    log(errorMessage(error));
  }
   
  try {
    await deleteRole({ roleName: lambdaRoleName });
    await pause(3000);
    spinner.succeed('IAM role for Lambda has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing IAM Lambda role');
    log(errorMessage(error));
  }
  
  try {
    await pause(1000);
    spinner.start('Removing Lambda Function');
    await deleteLambda({ lambdaName });
    await pause(2000);
    spinner.succeed('Lambda Function has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Lambda Function');
    log(errorMessage(error));
  }
  
  try {
    await pause(1000);
    spinner.start('Removing Rehydrate SQS Queue');
    await deleteQueue({ SQSUrl: RehydrateSQSUrl });
    await pause(2000);
    spinner.succeed('Rehydrate SQS Queue has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Rehydrate SQS Queue. Error: ', error);
    log(errorMessage(error));
  }
  
  try {
    await pause(1000);
    spinner.start('Removing Rehydrate SQS Dead Letter Queue');
    await deleteQueue({ SQSUrl: RehydrateSQSDLQUrl });
    await pause(2000);
    spinner.succeed('Rehydrate SQS Dead Letter Queue has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Rehydrate SQS Dead Letter Queue. Error: ', error);
    log(errorMessage(error));
  }
  
  try {
    await pause(2000);
    spinner.start('Removing Status SQS Queue');
    await deleteQueue({ SQSUrl: StatusSQSUrl });
    await pause(2000);
    spinner.succeed('Status SQS Queue has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Status SQS Queue. Error: ', error);
    log(errorMessage(error));
  }
  
  try {
    await pause(1000);
    spinner.start('Removing Status SQS Dead Letter Queue');
    await deleteQueue({ SQSUrl: StatusSQSDLQUrl });
    await pause(2000);
    spinner.succeed('Status SQS Dead Letter Queue has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Status SQS Dead Letter Queue. Error: ', error);
    log(errorMessage(error));
  }
  
  try {
    await pause(1000);
    spinner.start('Removing Event source mapping');
    await deleteEventSourceMapping({ UUID: eventSourceMappingUUID });
    await pause(2000);
    spinner.succeed('Event source mapping has been removed');
  } catch (error) {
    spinner.fail('There was an error when removing Event source mapping. Error: ', error);
    log(errorMessage(error));
  }
  spinner.stopAndPersist({
    text: '\nArroyo AWS infrastructure has been removed!'
  })
}

export default destroyResources;

destroyResources();
