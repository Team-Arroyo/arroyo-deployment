const { S3Client, ListObjectsCommand, GetObjectCommand, SelectObjectContentCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client();

const getObjectContents = async(Bucket, Key) => {
  try {
    const data = await s3Client.send(new GetObjectCommand({
      Bucket,
      Key
    }))
    return data
  } catch(err) {
    throw err
  }
}

const queryObjectContents = async(Bucket, Key, Expression) => {
    const params = {
      Bucket,
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
    const command = new SelectObjectContentCommand(params);
    try {
      const data = await s3Client.send(command);
      return data;
    } catch(err) {
      throw err;
    }
}

module.exports = {
    getObjectContents,
    queryObjectContents
}