import sqsClient from '../clients/sqsClient.mjs';
import { DeleteMessageCommand } from '@aws-sdk/client-sqs';


const removeMessageFromQueue = (QueueUrl, ReceiptHandle) => {
  const params = {
    QueueUrl,
    ReceiptHandle
  };

  return new Promise((resolve, reject) => {
    const command = new DeleteMessageCommand(params);
    sqsClient.send(command).then((res) => resolve(res)).catch((err)=> reject(err));
  });
};

export default removeMessageFromQueue;