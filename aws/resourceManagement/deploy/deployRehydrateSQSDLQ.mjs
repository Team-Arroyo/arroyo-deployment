import { REHYDRATION_DLQ } from '../../constants/general.mjs';
import createQueue from '../../sqs/createQueue.mjs';
import getQueueArn from '../../sqs/getQueueArn.mjs';
import pause from '../../../utils/pause.js';
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployRehydrateSQSDLQ = async ({ uuid }) => {
  try {
    const rehydrateSQSDLQName = `${REHYDRATION_DLQ}-${uuid}`;
    const rehydrateSQSDLQUrl = await createQueue({
      QueueName: rehydrateSQSDLQName,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    config.set('RehydrateSQSDLQUrl', rehydrateSQSDLQUrl);
    
    const queueArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: rehydrateSQSDLQUrl });
    return queueArn;
  } catch (error) {
    throw new Error(error);
  }
}
export default deployRehydrateSQSDLQ;