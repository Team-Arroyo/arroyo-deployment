import { ListObjectsCommand } from '@aws-sdk/client-s3';
import s3Client from '../clients/s3Client.mjs';

import dotenv from 'dotenv';

dotenv.config();

const getBucketObjectsWithinDates = async({ startDate, endDate }) => {
  const startMs = Date.parse(startDate);
  const endMs = Date.parse(endDate);
  console.log(process.env.AWS_BUCKET_NAME);
  try {
    const response = await s3Client.send( new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET_NAME }))

    const filteredContents = response.Contents.filter(({ Key, LastModified }) => {
      const objInputDateMs = Date.parse(new Date(LastModified).toDateString());
      return (startMs <= objInputDateMs) && (objInputDateMs <= endMs)
    })

    const objectKeys = filteredContents.map(({ Key }) => Key)
    return objectKeys;
  } catch(error) {
    throw error;
  }
}

export default getBucketObjectsWithinDates;