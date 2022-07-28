import createQueue from '../../sqs/createQueue.mjs';
import getQueueArn from '../../sqs/getQueueArn.mjs';
import pause from '../../../utils/pause.js';
import { STATUS_DLQ } from '../../constants/general.mjs';
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployStatusSQSDLQ = async ({ uuid }) => {
  try {
    const statusSQSDLQName = `${STATUS_DLQ}-${uuid}`;
    const statusSQSDLQUrl = await createQueue({
      QueueName: statusSQSDLQName,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    config.set('StatusSQSDLQUrl', statusSQSDLQUrl);
    
    const queueArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: statusSQSDLQUrl });
    return queueArn;
  } catch (error) {
    throw new Error(error);
  }
}
export default deployStatusSQSDLQ;