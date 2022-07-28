import { DeleteEventSourceMappingCommand } from '@aws-sdk/client-lambda';
import lambdaClient from '../clients/lambdaClient.mjs';

const deleteEventSourceMapping = async (UUID) => {
  try {
    const eventSourceMappingCommand = new DeleteEventSourceMappingCommand(UUID);
    const eventSourceMappingCommandResponse = await lambdaClient.send(eventSourceMappingCommand);
    return eventSourceMappingCommandResponse;
  } catch (error) {
    console.log(error);
  }
}

export default deleteEventSourceMapping;