import { CreateEventSourceMappingCommand } from '@aws-sdk/client-lambda';
import lambdaClient from '../clients/lambdaClient.mjs';

const createEventSourceMapping = async ({ functionName, eventSourceArn }) => {
  try {
    const eventSourceMappingCommand = new CreateEventSourceMappingCommand({
      FunctionName: functionName,
      EventSourceArn: eventSourceArn,
      BatchSize: 1
    });
    const eventSourceMappingCommandResponse = await lambdaClient.send(eventSourceMappingCommand);
    return eventSourceMappingCommandResponse.UUID;
  } catch (error) {
    console.log(error);
  }
};

export default createEventSourceMapping;