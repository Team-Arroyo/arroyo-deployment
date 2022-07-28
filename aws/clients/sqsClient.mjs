import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

dotenv.config();

const sqsClient = new SQSClient({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});
export default sqsClient;