import { DeleteFunctionCommand } from '@aws-sdk/client-lambda';
import LambdaClient from '../clients/lambdaClient.mjs';

const deleteLambda = async ({ lambdaName }) => {
  try {
    const command = new DeleteFunctionCommand({ FunctionName: lambdaName });
    const response = await LambdaClient.send(command);

    return response;
  } catch (error) {
   throw new Error(error);
  }
};

export default deleteLambda;