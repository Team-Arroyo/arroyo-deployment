import { SendMessageCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const sendMessageToQueue = async({ messageBodyTemplate, additionalParams, QueueUrl }) => {
  const MessageBody = JSON.stringify({...messageBodyTemplate, ...additionalParams});
  
  const messageParams = {
    MessageBody,
    QueueUrl
  };

  console.log('messageParams', messageParams);

  try {
    const command = new SendMessageCommand(messageParams);
    const response = await sqsClient.send(command);
    return response;
  } catch(error) {
    console.log('Error sending messages to sqs queue.', error);
  }
};

export default sendMessageToQueue;