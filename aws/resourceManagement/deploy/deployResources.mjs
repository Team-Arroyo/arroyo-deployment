import { LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME, REHYDRATION_LAMBDA_NAME } from '../../constants/general.mjs';
import 'dotenv/config.js';
import Configstore from 'configstore';
import { v4 as uuidv4 } from 'uuid';
import createEventSourceMapping from '../../lambda/createEventSourceMapping.mjs';
import pause from '../../../utils/pause.js';
import deployLambdaDeploymentPackage from './deployLambdaDeploymentPackage.mjs';
import deployRehydrateSQSDLQ from './deployRehydrateSQSDLQ.mjs';
import deployStatusSQSDLQ from './deployStatusSQSDLQ.mjs';
import deployRehydrateSQS from './deployRehydrateSQS.mjs';
import deployStatusSQS from './deployStatusSQS.mjs';
import fs from 'fs';
import deployLambdaRole from './deployLambdaRole.mjs';
import deployRehydrateLambda from './deployRehydrateLambda.mjs';
import arroyoHeader from '../../../utils/figlet.mjs';
import chalk from 'chalk';
import ora from 'ora';
const log = console.log;
const errorMessage = chalk.bold.red;

const uuid = uuidv4();
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
config.clear();
config.set('uuid', uuid);

const deployResources = async () => {
  const lambdaS3BucketName = `${LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME}-${uuid}`;
  arroyoHeader();
  await pause(2000);
  const spinner = ora({
    text: 'Getting ready to deploy AWS infrastructure',
    color: 'yellow'
  }).start();

  await pause(2000);
  
  spinner.stop();
  await pause(1000);
  spinner.start('Creating Deployment package for Lambda Function');

  try {
    await deployLambdaDeploymentPackage({ lambdaS3BucketName });
    await pause(8000);
    spinner.succeed('Deployment package for Lambda Function has been created');
  } catch (error) {
    spinner.fail('There was an error when creating deployment package for Lambda function. Error: ', error);
    log(errorMessage(error));
  }

  
  let rehydrateSQSDLQArn;
  try {
    spinner.start('Creating Rehydrate SQS Dead Letter Queue');
    await pause(2000);
    rehydrateSQSDLQArn = await deployRehydrateSQSDLQ({ uuid });
    await pause(2000);
    spinner.succeed('Rehydrate SQS Dead Letter Queue has been created')
  } catch (error) {
    spinner.fail('There was an error when creating Rehydrate SQS Dead Letter Queue');
    log(errorMessage(error));
  }

  let statusSQSDLQArn;
  try {
    spinner.start('Creating Status SQS Dead Letter Queue');
    statusSQSDLQArn = await deployStatusSQSDLQ({ uuid });
    await pause(5000);
    spinner.succeed('Status SQS Dead Letter Queue has been created');
  } catch (error) {
    spinner.fail('There was an error when creating Status SQS Dead Letter Queue');
    log(errorMessage(error));
  }

  let rehydrateSQSArn;

  try {
    spinner.start('Creating Rehydrate SQS Queue');
    rehydrateSQSArn = await deployRehydrateSQS({ uuid, rehydrateSQSDLQArn });
    await pause(3000);
    spinner.succeed('Rehydrate SQS Queue has been created');
  } catch (error) {
    spinner.fail('There was an error when creating Rehydrate SQS Queue');
    log(errorMessage(error));
  }
  
  
  let statusSQSArn;
  let statusSQSUrl;
  try {
    spinner.start('Creating Status SQS Queue');
    ({ statusSQSArn, statusSQSUrl } = await deployStatusSQS({ uuid, statusSQSDLQArn }));
    await pause(3000);
    spinner.succeed('Status SQS Queue has been created');
  } catch(error) {
    spinner.fail('There was an error when creating Status SQS Queue');
    log(errorMessage(error));
  }
  
  
  try {
    spinner.start('Creating IAM role for Lambda');
    await deployLambdaRole({ uuid, statusSQSArn });
    await pause(5000);
    spinner.succeed('IAM role for Lambda has been created');
  } catch (error) {
    spinner.fail('There was an error when creating IAM role for Lambda');
    log(errorMessage(error));
  }
  
  const rehydrateLambdaName = `${REHYDRATION_LAMBDA_NAME}-${uuid}`;
  
  const lambdaRoleArn = config.get('lambdaRoleArn');
  try {
    spinner.start('Creating Lambda Function');
    await deployRehydrateLambda({ lambdaS3BucketName, statusSQSUrl, lambdaRoleArn, rehydrateLambdaName });
    await pause(8000);
    spinner.succeed('Lambda Function has been created');
  } catch(error) {
    spinner.fail('There was an error when creating Lambda Function');
    log(errorMessage(error));
  }
  
  
  try {
    spinner.start('Creating Event source mapping');
    const eventSourceMappingUUID = await createEventSourceMapping({ 
      functionName: rehydrateLambdaName, 
      eventSourceArn: rehydrateSQSArn
    });
    
    config.set('eventSourceMappingUUID', eventSourceMappingUUID);
    await pause(2000);
    spinner.succeed('Event source mapping has been created');
  } catch(error) {
    spinner.fail('There was an error when creating Event source mapping');
    log(errorMessage(error));
  }

  spinner.stopAndPersist({
    text: '\nArroyo AWS infrastructure has been deployed!',
  })
}

export default deployResources;

deployResources();
