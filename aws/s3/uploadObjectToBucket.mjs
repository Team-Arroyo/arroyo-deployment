import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../clients/s3Client.mjs'; 
import fs from 'fs';
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME } from '../constants/lambdaDeploymentPackage.mjs';
import { CONTENT_TYPE_APPLICATION_ZIP, ACL_PRIVATE, ERROR, OPEN, LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME } from '../constants/general.mjs';

const uploadObjectToBucket = async({ fileName, bucketName }) => {
  /*
    You may run into issues with the location of the .zip file.
    I had the best success keeping the deploy .zip in the root directory of the codebase.
    I haven't confirmed, but I think 'fs' looks in the root directory for matching file names.
  */
  try {
    const fileStream = fs.createReadStream(fileName); 
    fileStream.on(ERROR, function(error) {
      if (error) { 
        throw error;
      }
    });

    fileStream.on(OPEN, async() => {
      try {
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: DEPLOYMENT_PACKAGE_ARCHIVE_NAME,
          ContentType: CONTENT_TYPE_APPLICATION_ZIP,
          ACL: ACL_PRIVATE,
          Body: fileStream
        });

        const response = await s3Client.send(command);
        return response;
      } catch(error) {
        console.log(error);
      }
    })

 } catch(error) {
  console.log(error);
 }
}

export default uploadObjectToBucket;