import { DeleteQueueCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const deleteQueue = async ({ SQSUrl }) => {
  try {
    const deleteQueueCommand = new DeleteQueueCommand({ QueueUrl: SQSUrl });
    const deleteQueueResponse = await sqsClient.send(deleteQueueCommand);
    return deleteQueueResponse;
  } catch (error) {
   throw new Error(error);
  }
};

export default deleteQueue;