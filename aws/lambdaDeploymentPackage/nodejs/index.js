const { getAllLogs, queryForLogs } = require("./services/logFetchService");
const { postToLogstash } = require("./services/logstashService");
const sendMessageToQueue = require("./lib/sqsClient");

exports.handler = async (event) => {
    const { messageId, body } = event.Records[0];
    const { Bucket, Key, logstashEndpoint, Expression } = JSON.parse(body);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
    
    
    console.log("Bucket", Bucket);
    console.log("Key", Key);
    console.log("logstashHost", logstashEndpoint);
    console.log(`Expression: ${Expression}`)
   
    try {
        let logsJson = [];
        
        if(Expression) {
            logsJson = await queryForLogs(Bucket, Key, Expression)
        } else {
            logsJson = await getAllLogs(Bucket, Key);
        }
        
        await postToLogstash(logstashEndpoint, logsJson)
        
        await sendMessageToQueue({
            objectKey: Key,
            status: 'complete'
        });
        
    } catch(err) {
        console.log("Failed rehydrate job", err);
        console.log("Reporting back to SQS\n");
        
        let { message, name } = err;
        
        message = message.includes('timeout') ? 'Logstash unreachable' : message;
        
        await sendMessageToQueue({
           objectKey: Key,
           status: 'fail',
           name,
           message
        });
    }
    
    
    return response;
};
