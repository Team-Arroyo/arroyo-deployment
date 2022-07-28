import s3Client from '../clients/s3Client.mjs'; 
import { CreateBucketCommand } from '@aws-sdk/client-s3';

const createS3Bucket = async (bucketName) => {
  try {
    const data = await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
    return data;
  } catch (error) {
   throw new Error(error);
  }
};

export default createS3Bucket;