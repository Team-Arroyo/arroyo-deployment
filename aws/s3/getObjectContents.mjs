import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../clients/s3Client.mjs';

const getObjectContents = async(Key) => {
  try {
    const data = await s3Client.send(new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key
    }))
    return data
  } catch(error) {
    throw error;
  }
}

export default getObjectContents;