const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const sqsClient = new SQSClient();

console.log('Status Queue Url', process.env.STATUS_QUEUE_URL);
const QueueUrl = process.env.STATUS_QUEUE_URL;

const sendMessageToQueue = async (message) => {
    const MessageBody = JSON.stringify(message);
    const messageParams = {
        MessageBody,
        QueueUrl
    };
    
    try {
        const command = new SendMessageCommand(messageParams);
        const response = await sqsClient.send(command);
        console.log("Message was sent to the queue");
    } catch(err) {
        console.log("Cant connect to status queue", err);
    }
    
};

module.exports = sendMessageToQueue;