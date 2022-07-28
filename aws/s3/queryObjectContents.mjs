import { SelectObjectContentCommand } from '@aws-sdk/client-s3';
import s3Client from '../aws/clients/s3Client.mjs';

const queryObjectContents = async({ Key, Expression })=> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ExpressionType: 'SQL',
    Expression,
    InputSerialization: {
      JSON: {
        Type: 'LINES'
      }
    },
    OutputSerialization: {
      JSON: {
        RecordDelimiter: '\n'
      }
    }
  }

  try {
    const data = await s3Client.send(new SelectObjectContentCommand(params))
    return data;
  } catch(error) {
    throw error;
  }
}

export default queryObjectContents;