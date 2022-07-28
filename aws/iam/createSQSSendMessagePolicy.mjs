import iamClient from "../clients/iamClient.mjs";
import { CreatePolicyCommand } from '@aws-sdk/client-iam';

const createSQSSEndMessagePolicy = async ({ SQSArn, uuid }) => {
  const SQSSendMessagePolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sqs:SendMessage",
        Resource: SQSArn,
      }
    ],
  };

  const createPolicyParams = {
    PolicyDocument: JSON.stringify(SQSSendMessagePolicy),
    PolicyName: `SQS-SendMessage-${uuid}`,
  };
      try {
      const data = await iamClient.send(new CreatePolicyCommand(createPolicyParams));
      return data;
    } catch (error) {
      console.log("Error", error);
    }
}

export default createSQSSEndMessagePolicy;
