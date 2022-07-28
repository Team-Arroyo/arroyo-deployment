import { STATUS_QUEUE_NAME } from '../../constants/general.mjs';
import createQueue from '../../sqs/createQueue.mjs';
import getQueueArn from '../../sqs/getQueueArn.mjs';
import pause from '../../../utils/pause.js';
import fs from 'fs';
import Configstore from 'configstore';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const deployStatusSQS = async ({ uuid, statusSQSDLQArn }) => {
  try {
    const statusSQSName = `${STATUS_QUEUE_NAME}-${uuid}`;

    const statusSQSUrl = await createQueue({
      QueueName: statusSQSName,
      Attributes: {
        MessageRetentionPeriod: '86400',
        RedrivePolicy: JSON.stringify({
          deadLetterTargetArn: statusSQSDLQArn,
          maxReceiveCount: 1
        })
      }
    });
    await pause(5000);
    config.set('StatusSQSUrl', statusSQSUrl);

    const statusSQSArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: statusSQSUrl });
    await pause(5000);
    config.set('StatusSQSArn', statusSQSArn);
    return { statusSQSUrl, statusSQSArn};

  } catch (error) {
    throw new Error(error);
  }
}
export default deployStatusSQS;