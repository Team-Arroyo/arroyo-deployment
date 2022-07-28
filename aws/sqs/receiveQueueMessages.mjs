import sqsClient from '../clients/sqsClient.mjs';
import { ReceiveMessageCommand } from '@aws-sdk/client-sqs';

const recieveQueueMessages = async(QueueUrl) => {
  const params =  { 
    QueueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 10
  };
  
  const command = new ReceiveMessageCommand(params);
  const { Messages } = await sqsClient.send(command);
  return Messages;
};

export default recieveQueueMessages;