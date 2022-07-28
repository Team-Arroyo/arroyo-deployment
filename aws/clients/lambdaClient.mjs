import { LambdaClient } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({ 
  region: process.env.AWS_REGION
});
export default lambdaClient;