import getObjectsListFromBucket from './getObjectListFromBucket.mjs';

const getAllBucketObjectKeys = async(bucketParams) => {
  try {
    const response = await getObjectsListFromBucket(bucketParams);
    const objectKeys = response.Contents?.map(({ Key }) => Key);
    return objectKeys;
  } catch(error) {
    throw error;
  }
};

export default getAllBucketObjectKeys;