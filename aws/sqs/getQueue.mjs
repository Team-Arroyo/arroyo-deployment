import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const getQueue = async({ QueueName }) => {
  try {
    const command = new GetQueueUrlCommand({ QueueName });
    await sqsClient.send(command);
  } catch(error) {
    throw new Error(error);
  }
};

export default getQueue;