import { IAMClient } from '@aws-sdk/client-iam';

const iamClient = new IAMClient({ 
  region: process.env.AWS_REGION
});

export default iamClient;