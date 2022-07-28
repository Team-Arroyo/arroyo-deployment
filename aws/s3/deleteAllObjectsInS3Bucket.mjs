import s3Client from '../clients/s3Client.mjs'; 
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import getObjectsListFromBucket from './getObjectListFromBucket.mjs';

const deleteAllObjectsS3Bucket = async ({ Bucket }) => {
  try {
    const response = await getObjectsListFromBucket({ Bucket });
    let objectsToDelete = [];

    if (response.Contents) {
      objectsToDelete = response.Contents
    }

    const data = await s3Client.send(new DeleteObjectsCommand({ 
      Bucket: Bucket,
      Delete: {
        Objects: response.Contents 
      }
    }));
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};

export default deleteAllObjectsS3Bucket;