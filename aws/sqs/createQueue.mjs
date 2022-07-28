import { CreateQueueCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const createQueue = async (queueParams) => {
  try {
    const createQueueCommand = new CreateQueueCommand(queueParams);
    const createQueueResponse = await sqsClient.send(createQueueCommand);

    return createQueueResponse.QueueUrl;
  } catch (error) {
   throw new Error(error);
  }
};

export default createQueue;