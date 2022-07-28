const { getObjectContents, queryObjectContents } = require("../lib/s3Client");

const streamToString = require("../utils/streamToString");
const queryStreamToString = require("../utils/queryStreamToString");

const logStringToJson = require("../utils/logStringToJson");

const getAllLogs = async(Bucket, Key) => {
    try {
        console.log(`Fetching all logs for ${Key} in ${Bucket}\n`);
        
        const data = await getObjectContents(Bucket, Key);
        const rawLogString = await streamToString(data.Body);
        const logsJson = logStringToJson(rawLogString);
        
        return logsJson;
    } catch(err) {
        console.log("Error in getAllLogs\n");
        console.log(`Bucket: ${Bucket}, Key: ${Key}\n`);
        throw err;
    }
}

const queryForLogs = async(Bucket, Key, Expression) => {
    try {
        console.log(`Query logs for ${Key} in ${Bucket}\n`);
        console.log(`Expression used: ${Expression}`);
        
        const data = await queryObjectContents(Bucket, Key, Expression);
        const rawLogString = await queryStreamToString(data.Payload);
        const logsJson = logStringToJson(rawLogString);
        
        console.log(logsJson);
        return logsJson;
    } catch(err) {
        console.log("Error in queryForLogs\n");
        console.log(`Bucket: ${Bucket}, Key: ${Key}, Expression: ${Expression}\n`);
        throw err;
    }
}

module.exports = {
    getAllLogs,
    queryForLogs
}