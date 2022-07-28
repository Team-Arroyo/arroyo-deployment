import { ListEventSourceMappingsCommand } from '@aws-sdk/client-lambda';
import lambdaClient from '../clients/lambdaClient.mjs';

const listEventSourceMappings = async ({ eventSourceArn, functionName }) => {
  try {
    const listEventSourceMappingCommand = new ListEventSourceMappingsCommand({ 
      EventSourceArn: eventSourceArn, 
      FunctionName: functionName
    });
    const listEventSourceMappingCommandResponse = await lambdaClient.send(listEventSourceMappingCommand);
    return listEventSourceMappingCommandResponse;
  } catch (error) {
    console.log(error);
  }
}

export default listEventSourceMappings;