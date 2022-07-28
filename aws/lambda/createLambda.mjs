import { CreateFunctionCommand } from '@aws-sdk/client-lambda';
import LambdaClient from '../clients/lambdaClient.mjs';

const createLambda = async (lambdaParams) => {
  try {
    const command = new CreateFunctionCommand(lambdaParams);
    const response = await LambdaClient.send(command);

    return response;
  } catch (error) {
   throw new Error(error);
  }
};

export default createLambda;