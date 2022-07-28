import s3Client from '../clients/s3Client.mjs';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

const getObjectsListFromBucket = async (bucketParams) => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    return data;
  } catch (error) {
   throw new Error(error);
  }
};

export default getObjectsListFromBucket;
