const LambdaAssumeRolePolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
          "Service": [
            "lambda.amazonaws.com"
          ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

const AWSXRayDaemonWriteAccessARN = 'arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess';
const AmazonS3ReadOnlyAccessARN = 'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess';
const AWSLambdaSQSQueueExecutionRoleARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole';
const AWSLambdaBasicExecutionRoleARN = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';

export {
  LambdaAssumeRolePolicy,
  AWSXRayDaemonWriteAccessARN,
  AmazonS3ReadOnlyAccessARN,
  AWSLambdaSQSQueueExecutionRoleARN,
  AWSLambdaBasicExecutionRoleARN
}