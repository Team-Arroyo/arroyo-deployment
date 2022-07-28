import { REHYDRATION_QUEUE_NAME } from '../../constants/general.mjs';
import createQueue from '../../sqs/createQueue.mjs';
import getQueueArn from '../../sqs/getQueueArn.mjs';
import pause from '../../../utils/pause.js';
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployRehydrateSQS = async ({ uuid, rehydrateSQSDLQArn }) => {
  try {
    const rehydrateSQSName = `${REHYDRATION_QUEUE_NAME}-${uuid}`;

    const rehydrateSQSUrl = await createQueue({
      QueueName: rehydrateSQSName,
      Attributes: {
        MessageRetentionPeriod: '86400',
        RedrivePolicy: JSON.stringify({
          deadLetterTargetArn: rehydrateSQSDLQArn,
          maxReceiveCount: 1
        })
      }
    });

    await pause(5000);
    config.set('RehydrateSQSUrl', rehydrateSQSUrl);
    
    const rehydrateSQSArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: rehydrateSQSUrl });
    config.set('RehydrateSQSArn', rehydrateSQSArn);
    return rehydrateSQSArn;
  } catch (error) {
    throw new Error(error);
  }
}
export default deployRehydrateSQS;