import recieveQueueMessages from './receiveQueueMessages.mjs';
import removeMessageFromQueue from './removeMessageFromQueue.mjs';
import { reportStatuses } from '../../services/sseClientServices.mjs';
import dotenv from 'dotenv';
import Configstore from 'configstore';
import fs from 'fs';

dotenv.config();

const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const { StatusSQSUrl } = config.all;

//conditional kept so development. Not required to run deploy script.
const StatusQueueUrl = StatusSQSUrl || process.env.STATUS_QUEUE_URL;

const pollStatusQueue = async(eventType) => {
  console.log('Polling Status Queue...');
  let retryCounter = 0;
  let statusStrings = [];

  while(retryCounter < 3) {
    try {
      const Messages = await recieveQueueMessages(StatusQueueUrl);

      if(Messages) {
        const receiptHandles = Messages.map(({ ReceiptHandle }) => ReceiptHandle);
        statusStrings = statusStrings.concat(Messages.map(({ Body }) => Body));

        const promises = receiptHandles.map(handle => removeMessageFromQueue(StatusQueueUrl, handle));
        await Promise.allSettled(promises);
        //send status array to client services for SSE.
      } else {
        retryCounter += 1;
      }

    } catch(err) {
      console.log(err);
    }
  }

  console.log('Polling has ended.');
  reportStatuses({eventType, statusStrings});
};

export default pollStatusQueue;